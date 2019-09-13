import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import { Grid, Image, Segment, Header, Divider, Rating, Form, Message, Button, Container, Tab } from 'semantic-ui-react'
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
            this.setState({
                product: response.data
            });
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
            this.setState({ attributeStyle: response.data})
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
            this.setState({ attributeMaterial: response.data})
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
            this.setState({ attributeStrap_Handle: response.data})
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
            this.setState({ attributeFeatures: response.data})
        })
    }

    panes = [
        {
            menuItem: 'Details',
            render: () =>
                <Tab.Pane>
                    {this.state.product.custom_attributes.map((c) => {
                        if (c.attribute_code === 'description') {
                            const regex = /(<([^>]+)>)/ig
                            const result = c.value.replace(regex, '');
                            return result;
                        }
                    })}
                </Tab.Pane>
        },
        { menuItem: 'More Information', render: () => 
            <Tab.Pane>
                <p>
                    Activity: 
                    {this.state.attributeActivity.map((ac) => {
                        {this.state.product.custom_attributes.map((ca) => {
                            if(ca.attribute_code === 'activity'){
                                //  console.log(ca.value)
                                //  console.log(ac.value)
                                if(ca.value === ac.value){
                                    console.log(ac.value)
                                   //return(<span>{ac.label}</span>)
                                }
                            }
                        })}
                    })}
                </p>
                <p>Style</p>
                <p>Material</p>
                <p>Strap/Handle</p>
                <p>Features</p>
            </Tab.Pane> 
        },
        { menuItem: 'Reviews', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]


    render() {
        console.log(this.state.product);

        if (this.state.product !== null) {
            return (
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={7}>
                                <div className="slide-container">
                                    <Zoom {...zoomOutProperties}>
                                        {
                                            this.state.product.media_gallery_entries.map((each, index) => <img key={index} style={{ width: "100%" }} src={"http://localhost/magento_test/pub/media/catalog/product/" + each.file} />)
                                        }
                                    </Zoom>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={9}>
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
