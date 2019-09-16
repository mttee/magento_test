import React, { Component } from 'react'
import { Card, Icon, Button, Segment, Dimmer, Loader } from 'semantic-ui-react'
import Cookies from 'universal-cookie';

const axios = require('axios');
const cookies = new Cookies();

export default class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            currency: null,
            loading: true
        }
    }


    componentWillMount(){
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest//V1/products?searchCriteria[pageSize]=5',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            console.log(response.data.items);
            this.setState({
                products: response.data.items,
                loading: false
            })
        })
        this.getCurrency()
    }

    //Get Curency
    getCurrency = () =>{
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/directory/currency'
        }).then((response)=>{
             this.setState({currency :response.data.base_currency_symbol}) 
        })
    }



    render() {
        if(this.state.loading === true){
            return (<Segment style={{height:"100%", margin:"0"}}>
                <Dimmer active inverted style={{backgroundColor: "lightgray"}}>
                    <Loader size='large'>Loading</Loader>
                </Dimmer>

                </Segment>
            )
        }
        return (
           
                this.state.products.map((pr, key)=>(
                    <Card color='blue' key={key} style={styleCard}
                        image={"http://localhost/magento_test/pub/media/catalog/product/"+pr.media_gallery_entries[0].file}
                        header={pr.name}
                        meta={pr.options}
                        description={ 
                                
                                pr.custom_attributes.map((c)=>{
                                    if(c.attribute_code === 'description'){
                                        const regex = /(<([^>]+)>)/ig
                                        const result = c.value.replace(regex, '');
                                        var maxLength = 140;
                                        var description = result.substring(0, maxLength) + '...';
                                        return description;
                                    }
                                })
                               
                            
                        }
                        extra={
                            <>
                                <div style={{float: "left", color:"gray"}}>
                                    Price: {pr.price+ '' + this.state.currency}
                                </div>
                                <a style={{float: "right"}} href={"/products/details/"+pr.sku}>
                                    <Button animated color='blue'>
                                        <Button.Content visible>Details</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>  
                                </a>
                            </>
                        }
                    />
                ))
            
        )
    }
}

const styleCard = {
    float:"left",
    textAlign:"left",
    margin: "1%"
}
