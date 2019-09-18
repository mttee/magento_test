import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { Grid, Image, Segment, Header, Divider, Rating, Form, Message, Button, Container, Tab, Card, Icon, Dimmer, Loader, Comment } from 'semantic-ui-react'
import { Zoom } from 'react-slideshow-image';

const axios = require('axios');
const cookies = new Cookies();





export default class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            currency: null,
            showMessage: false,
            amount: 1,
            attributeActivity: [],
            attributeStyle: [],
            attributeMaterial: [],
            attributeStrap_Handle: [],
            attributeFeatures: [],
            productList: [],
            loading: true
        }
    }

    UNSAFE_componentWillMount() {
        const productCode = this.props.match.params.sku
        this.getCurrency()
        this.getActivity()
        this.getStyle()
        this.getStrap_Handle()
        this.getMaterial()
        this.getFeatures()
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/products/' + productCode,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            var arrProduct = []
            this.setState({
                product: response.data,
                loading: false
            });
            response.data.product_links.forEach(async (pr) => {
                if (pr.link_type === "upsell") {
                    const res = await this.getProductList(pr.linked_product_sku)
                    arrProduct.push(res)
                    this.setState({
                        productList: arrProduct
                    })
                }
            })
        })
    }

    getCurrency = () => {
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/directory/currency'
        }).then((response) => {
            this.setState({ currency: response.data.base_currency_symbol })
        })
    }

    getAmount = (event) => {
        const value = event.target.value
        this.setState({
            amount: value
        })

    }

    handleAddToCard = () => {
        if (this.state.amount < 1) {
            this.setState({
                showMessage: true
            })
        } else {
            this.setState({
                showMessage: false
            })
        }

    }

    getActivity = () => {
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/rest/V1/products/attributes/activity/options',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            this.setState({ attributeActivity: response.data })
        })
    }

    getStyle = () => {
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/rest/V1/products/attributes/style_bags/options',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            this.setState({ attributeStyle: response.data })
        })
    }

    getMaterial = () => {
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/rest/V1/products/attributes/material/options',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            this.setState({ attributeMaterial: response.data })
        })
    }

    getStrap_Handle = () => {
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/rest/V1/products/attributes/strap_bags/options',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            this.setState({ attributeStrap_Handle: response.data })
        })
    }

    getFeatures = () => {
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/rest/V1/products/attributes/features_bags/options',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            this.setState({ attributeFeatures: response.data })
        })
    }

    panes = [
        {
            menuItem: 'Details',
            render: () =>
                <Tab.Pane style={{ textAlign: "left" }}>
                    {this.state.product.custom_attributes.map((c) => {
                        if (c.attribute_code === 'description') {
                            const regex = /(<([^>]+)>)/ig
                            const result = c.value.replace(regex, '');
                            return result;
                        }
                        return null
                    })}
                </Tab.Pane>

        },
        {
            menuItem: 'More Information', render: () =>
                <Tab.Pane>
                    <p style={styleInfomation}>
                        Activity:
                    {this.state.attributeActivity.map((ac) => {
                            var kq;

                            this.state.product.custom_attributes.map((ca, key) => {
                                if (ca.attribute_code === 'activity') {
                                    var array = JSON.parse("[" + ca.value + "]");
                                    array.map((v, key) => {
                                        
                                        // console.log(v)
                                        // console.log(key)
                                        if (v == ac.value) {
                                            // console.log(v)
                                            kq = (<span key={key} style={styleInfomationSpan}> {ac.label}, </span>)
                                        }
                                        //return null
                                    })

                                }
                                return null
                            })

                            return kq
                        })}
                    </p>
                    <p style={styleInfomation}>Style:
                    {this.state.attributeStyle.map((ac) => {
                        var kq;

                        this.state.product.custom_attributes.map((ca, key) => {
                            if (ca.attribute_code === 'style_bags') {
                                var array = JSON.parse("[" + ca.value + "]");
                                array.map((v, key) => {
                                    // console.log(v)
                                    //console.log(v)
                                    //  console.log(key)
                                    if (v == ac.value) {
                                        //console.log(ac.label)
                                        kq = (<span key={key} style={styleInfomationSpan}> {ac.label} </span>)
                                    }
                                    return null
                                })

                            }
                            return null
                        })

                        return kq
                    })}
                    </p>
                    <p style={styleInfomation}>Material:
                {this.state.attributeMaterial.map((ac) => {
                        var kq;

                        this.state.product.custom_attributes.map((ca, key) => {
                            if (ca.attribute_code === "material") {
                                var array = JSON.parse("[" + ca.value + "]");
                                array.map((v, key) => {
                                    // console.log(v)
                                    //console.log(v)
                                    //  console.log(key)
                                    if (v == ac.value) {
                                        //console.log(ac.label)
                                        kq = (<span key={key} style={styleInfomationSpan}> {ac.label}, </span>)
                                    }
                                    return null
                                })

                            }
                            return null
                        })

                        return kq
                    })}
                    </p>
                    <p style={styleInfomation}>Strap/Handle:
                    {this.state.attributeStrap_Handle.map((ac) => {
                        var kq;

                        this.state.product.custom_attributes.map((ca, key) => {
                            if (ca.attribute_code === "strap_bags") {
                                var array = JSON.parse("[" + ca.value + "]");
                                array.map((v, key) => {
                                    // console.log(v)
                                    //console.log(v)
                                    //  console.log(key)
                                    if (v == ac.value) {
                                        //console.log(ac.label)
                                        kq = (<span key={key} style={styleInfomationSpan}> {ac.label}, </span>)
                                    }
                                    return null
                                })

                            }
                            return null
                        })

                        return kq
                    })}
                    </p>
                    <p style={styleInfomation}>Features:
                    {this.state.attributeFeatures.map((ac) => {
                        var kq;

                        this.state.product.custom_attributes.map((ca, key) => {
                            if (ca.attribute_code === "features_bags") {
                                var array = JSON.parse("[" + ca.value + "]");
                                array.map((v, key) => {
                                    // console.log(v)
                                    //console.log(v)
                                    //  console.log(key)
                                    if (v == ac.value) {
                                        //console.log(ac.label)
                                        kq = (<span key={key} style={styleInfomationSpan}> {ac.label}, </span>)
                                    }
                                    return null
                                })

                            }
                            return null
                        })

                        return kq
                    })}
                    </p>
                </Tab.Pane>
        },
        {
            menuItem: 'Reviews', render: () =>
                <Tab.Pane>
                    <Grid divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Comment.Group>
                                    <Comment style={{ textAlign: "left" }}>
                                        <Comment.Avatar as='a' src='https://cdn.theatlantic.com/assets/media/img/photo/2015/11/images-from-the-2016-sony-world-pho/s01_130921474920553591/main_900.jpg?1448476701' />
                                        <Comment.Content>
                                            <Comment.Author>Stevie Feliciano</Comment.Author>
                                            <Comment.Metadata>
                                                <div>2 days ago</div>
                                                <div>
                                                    <Icon name='star' />5 Faves
                                                </div>
                                            </Comment.Metadata>
                                            <Comment.Text>
                                                Hey guys, I hope this example comment is helping you read this
                                                documentation.
                                            </Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Form>
                                    <Form.Field>
                                        <label style={{ textAlign: "left" }}>Your Rating</label>
                                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' style={{ float: "left" }} />
                                        <br />
                                        <br />
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{ textAlign: "left" }}>Nickname</label>
                                        <input />
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{ textAlign: "left" }}>Summary</label>
                                        <input />
                                    </Form.Field>
                                    <Form.Field>
                                        <label style={{ textAlign: "left" }}>Review</label>
                                        <textarea />
                                    </Form.Field>
                                    <Button type='submit' inverted color='blue'>Submit Review &nbsp;<Icon name="send" /></Button>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Tab.Pane>
        },
    ]


    getProductList = async (sku) => {
        const data = await axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/products/' + sku,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            return (response.data)
        })
        return data
    }


    render() {

        if (this.state.loading === true) {
            return (<Segment style={{ height: "100vh", margin: "0" }}>
                <Dimmer active inverted style={{ backgroundColor: "lightgray" }}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>

            </Segment>
            )
        }

        if (this.state.product !== null) {
            return (
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={7}>
                                <div className="slide-container">
                                    <Zoom {...zoomOutProperties}>
                                        {
                                            this.state.product.media_gallery_entries.map((each, index) => <img key={index} style={{ width: "100%" }} src={"http://localhost/magento_test/pub/media/catalog/product/" + each.file}/>)
                                        }
                                    </Zoom>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={9} verticalAlign="middle">
                                <Segment color='blue'>
                                    <Header as='h2' floated='left'>
                                        {this.state.product.name}
                                        <br />
                                        <br />
                                        <Rating maxRating={5} defaultRating={3} icon='star' size='huge' style={{ float: "left" }} />
                                        <br />
                                        <span style={{ float: "left" }}>{this.state.product.price + ' ' + this.state.currency}</span>
                                    </Header>

                                    <Divider clearing />
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <Form error style={{ textAlign: "left", float: "left" }}>
                                                    <Form.Input type="number" label='Qty' min="0"
                                                        name="amount"
                                                        defaultValue="1"
                                                        style={{ width: "100px" }}
                                                        onChange={this.getAmount}
                                                    />
                                                    <Button size='big' labelPosition='left' icon='add to cart' color='blue' content="ADD TO CART" onClick={this.handleAddToCard} />
                                                    {this.state.showMessage ? <Message
                                                        error
                                                        content='Please enter a valid number in this field.'
                                                    /> : null}
                                                </Form>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Tab panes={this.panes} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Divider horizontal>
                                    <Header as='h4' floated="left">
                                        We found other products you might like!
                                    </Header>
                                </Divider>
                                <Card.Group itemsPerRow={6}>
                                    {this.state.productList.map((pr, key) => (

                                        <Card key={key} raised href={"/products/details/" + pr.sku}>
                                            <Image src={'http://localhost/magento_test/pub/media/catalog/product/' + pr.media_gallery_entries[0].file} />
                                            <Card.Content>
                                                <Card.Header style={{ fontSize: "13px" }}>{pr.name}</Card.Header>

                                            </Card.Content>
                                            <Button animated='fade' color='blue' attached='bottom'>
                                                <Button.Content visible>{pr.price + " " + this.state.currency}</Button.Content>
                                                <Button.Content hidden ><Icon name='shopping cart' /></Button.Content>
                                            </Button>
                                        </Card>
                                    ))}
                                </Card.Group>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Container>
            )
        }
        return (<></>);
    }
}



const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true
}

const styleInfomation = {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "15px",
    paddingRight: "3%"
}

const styleInfomationSpan = {
    fontSize: "14px",
    fontWeight: '500'
}
