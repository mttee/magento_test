import React, { Component } from 'react'
import { Form, Icon } from 'semantic-ui-react'
//import calendar
// import {
//     DateTimeInput,
// } from 'semantic-ui-calendar-react';
import orderCalendar from '../Css/Orders.css'
import Cookies from 'universal-cookie';
//import moment from 'moment'
// import '../Css/main.scss' 
// const EventCalendar = require('react-event-calendar');
import BigCalendar from 'react-big-calendar'
import moment_2 from 'moment'

const localizer = BigCalendar.momentLocalizer(moment_2) // or globalizeLocalizer

const axios = require('axios');
const cookies = new Cookies();
var moment = require('moment');
// const localizer = momentLocalizer(moment)

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    },
]

export default class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            dateTime: '',
            date:[],
            
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
            var arrDate =[];
              console.log(response.data.items);
              response.data.items.forEach(it => {
                const date = (moment(it.updated_at).format("DD/MM/YYYY HH:mm"))
                arrDate.push(date);
                
              });
              console.log(arrDate);
              
              this.setState({
                  items: response.data.items,
                  date: arrDate
              })
             
            });


            // var activeClass = document.querySelectorAll(".orderCalendar .ui.table td")
            // //console.log(activeClass.classList.contains(' ui red label'))
            // //console.log(activeClass);
            // var child = document.querySelectorAll(".ui.circular.label")
            // //activeClass.forEach((ac) => {
            //     console.log(child);
            // //})

    }


    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]:value });
        }
    }
    render() {
        console.log(this.state.dateTime);
        
        return (
            // <Form className="orderCalendar">
                   
            //         <DateTimeInput
            //             inline
                        
            //             marked={this.state.items.map((it)=>{
            //                 return(moment(it.updated_at).format("DD/MM/YYYY HH:mm"))
            //             })} 
            //             markColor="red"
                        
            //             name={this.state.items.map((it)=>{
            //                 console.log(it.increment_id)
            //             })}
            //             // value= {this.state.items.map((it)=>{
            //             //     return(moment(it.updated_at).format("DD/MM/YYYY HH:mm"))
            //             // })}
            //             // value = {this.state.date.map((da)=>{
            //             //     return(da)
            //             // })}
            //             value = {this.state.dateTime}
            //             onChange={this.handleChange}
            //             />
            // </Form>


            // <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
            <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />	
        )
    }

}
    const at = {
        background: 'yellow'
    }
