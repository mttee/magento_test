import React, { Component } from 'react'
import { Form, Icon } from 'semantic-ui-react'
//import calendar
import {
    DateTimeInput,
} from 'semantic-ui-calendar-react';
import orderCalendar from '../Css/Orders.css'
import Cookies from 'universal-cookie';

const axios = require('axios');
const cookies = new Cookies();
var moment = require('moment');

export default class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            dateTime: '',
        }
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/orders?searchCriteria=all',
            headers: { 
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
          })
            .then( (response) => {
              console.log(response.data.items);
              this.setState({
                  items: response.data.items
              })
              
            });
    }


    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    render() {
        console.log(this.state.dateTime);
        
        return (
            <Form className="orderCalendar">
                   
                    <DateTimeInput
                        inline
                        
                        marked={this.state.items.map((it)=>{
                            return(moment(it.updated_at).format("DD/MM/YYYY HH:mm"))
                        })} 
                        markColor="red !important"
                        
                        name="dateTime"
                        value= {this.state.items.map((it)=>{
                            return(moment(it.updated_at).format("DD/MM/YYYY HH:mm"))
                        })}
                        onChange={this.handleChange}
                        />
                
            </Form>
        )
    }

}
    const at = {
        background: 'yellow'
    }
