import React, { Component } from 'react'
import { Image, Modal, Button, Header, Icon, Grid, Message,Segment, Divider } from 'semantic-ui-react'

//import calendar
// import {
//     DateTimeInput,
// } from 'semantic-ui-calendar-react';
//import orderCalendar from '../Css/Orders.css'
import Cookies from 'universal-cookie';
//import moment from 'moment'
// import '../Css/main.scss' 
// const EventCalendar = require('react-event-calendar');
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const DragAndDropCalendar = withDragAndDrop(Calendar)

//Custom date of react big calendar
const mapToRBCFormat = e => Object.assign({}, e, {
    start: new Date(e.updated_at),
    end: new Date(e.updated_at)
})

const axios = require('axios');
const cookies = new Cookies();
//var moment = require('moment');
// const localizer = momentLocalizer(moment)
const localizer = momentLocalizer(moment) // or globalizeLocalizer

// const events = [
//     {
//         start: '2019-09-10',
//         end: '2019-09-10',
//         eventClasses: 'optionalEvent',
//         title: 'test event',
//         description: 'This is a test description of an event',
//     },
//     {
//         start: '2015-07-19',
//         end: '2015-07-25',
//         title: 'test event',
//         description: 'This is a test description of an event',
//         data: 'you can add what ever random data you may want to use later',
//     },
// ]



export default class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            dateTime: '',
            date: [],
            open: false,
            idOrderDetail: '',
            events: [],
            orderDetail: null
        }

        //this.moveEvent = this.moveEvent.bind(this)
        //this.newEvent = this.newEvent.bind(this)

        // this.show = this.show.bind(this)
    }

    // moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    //     const events  = this.state

    //     const idx = events.indexOf(event)
    //     let allDay = event.allDay

    //     if (!event.allDay && droppedOnAllDaySlot) {
    //       allDay = true
    //     } else if (event.allDay && !droppedOnAllDaySlot) {
    //       allDay = false
    //     }

    //     const updatedEvent = { ...event, start, end, allDay }

    //     const nextEvents = [...events]
    //     nextEvents.splice(idx, 1, updatedEvent)

    //     this.setState({
    //       items: nextEvents,
    //     })

    //     // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
    //   }

    //   resizeEvent = ({ event, start, end }) => {
    //     const events  = this.state

    //     const nextEvents = events.map(existingEvent => {
    //       return existingEvent.increment_id === event.increment_id
    //         ? { ...existingEvent, start, end }
    //         : existingEvent
    //     })

    //     this.setState({
    //       events: nextEvents,
    //     })

    //     //alert(`${event.title} was resized to ${start}-${end}`)
    //   }



    show = (dimmer, id) => {

        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/orders/' + id,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response) => {
            this.setState({
                orderDetail: response.data
            });

        })
        this.setState({ dimmer, open: true })

    }

    close = () => this.setState({ open: false })

    // getOrderDetail = () => {
    //     if(this.state.idOrderDetail !== '' && this.state.openb === true){
    //         axios({
    //             method: 'get',
    //             url: 'https://localhost/magento_test/index.php/rest/V1/orders/'+this.state.idOrderDetail,
    //             headers: {
    //                 'content-type': 'application/json',
    //                 'Authorization': 'Bearer ' + cookies.get('mycookies')
    //             },
    //         }).then((response) => {
    //             console.log(response.data);

    //         })
    //     }
    // }

    componentDidMount() {

        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/orders?searchCriteria=all',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        })
            .then((response) => {
                var arrDate = [];
                console.log(response.data.items);
                response.data.items.forEach(it => {
                    const date = (moment(it.updated_at).format("YYY,MM,DD,HH,mm,0,0"))
                    arrDate.push(date);

                });
                console.log(arrDate);

                this.setState({
                    items: response.data.items,
                    date: response.data.items,
                    events: response.data.items
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


    // handleChange = (event, { name, value }) => {
    //     if (this.state.hasOwnProperty(name)) {
    //         this.setState({ [name]:value });
    //     }
    // }
    render() {


        //console.log(this.state.orderDetail);
        const { open, dimmer } = this.state
        return (

            //<Form className="orderCalendar">

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

            <>
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Orders {this.state.orderDetail ? this.state.orderDetail.increment_id : null}</Modal.Header>
                    <Modal.Content image scrolling>

                        <Grid style={{width:"100%", margin: "auto"}}>
                            <Grid.Row >
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left'>
                                            Order
                                        </Header>

                                        <Divider clearing />
                                        <p>Order Date: <span> {this.state.orderDetail ? moment(this.state.orderDetail.updated_at).format("HH : mm DD/MM/YYY") : null} </span></p>
                                        <p>Order Status: <span> {this.state.orderDetail ? this.state.orderDetail.status: null} </span></p>
                                        <p>Purchased From: <span> {this.state.orderDetail ? this.state.orderDetail.store_name: null} </span></p>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left'>
                                            Account Information
                                        </Header>

                                        <Divider clearing />
                                        <p>Customer Name: <span> {this.state.orderDetail ? this.state.orderDetail.billing_address.firstname +''+ this.state.orderDetail.billing_address.lastname  : null} </span></p>
                                        <p>Email: <span> {this.state.orderDetail ? this.state.orderDetail.billing_address.email: null} </span></p>
                                        <p>Customer Group: <span> {this.state.orderDetail ? this.state.orderDetail.store_name: null} </span></p>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row >
                                <Grid.Column width={16}>
                                <h5>Billing Address </h5>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left'>
                                            Billing Address
                                        </Header>

                                        <Divider clearing />
                                        
                                        <p>{this.state.orderDetail ? this.state.orderDetail.billing_address.firstname +''+ this.state.orderDetail.billing_address.lastname  : null}</p>
                                        <p>{this.state.orderDetail ?this.state.orderDetail.billing_address.street[0]: null} </p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.billing_address.city +', '+ this.state.orderDetail.billing_address.region + ', '+this.state.orderDetail.billing_address.postcode: null}</p>
                                        <p>{this.state.orderDetail ?this.state.orderDetail.billing_address.country_id: null} </p>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left'>
                                            Shipping Address 
                                        </Header>

                                        <Divider clearing />
                                        <p>
                                        {this.state.orderDetail ? 
                                            this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.firstname +''+ 
                                            this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.lastname  : null}
                                        </p>
                                        <p>{this.state.orderDetail ?this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.street[0]: null} </p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.city +', '+ 
                                            this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.region + ', '+
                                            this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.postcode: null}
                                        </p>
                                        <p>{this.state.orderDetail ?this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.telephone: null} </p>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                        

                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Nope
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content="Yep, that's me"
                            onClick={this.close}
                        />
                    </Modal.Actions>
                </Modal>







                <Calendar
                    selectable
                    localizer={localizer}
                    events={this.state.date.map(mapToRBCFormat)}
                    step={15}
                    timeslots={8}
                    //onEventDrop={this.moveEvent}
                    //resizable
                    // onEventResize={this.resizeEvent}
                    //startAccessor={(event) => {return( moment(event.updated_at).format("YYYY,MM,DD"))}}
                    //endAccessor={(event) => {return( moment(event.updated_at).format("YYYY,MM,DD"))}}
                    titleAccessor={"customer_firstname"}

                    // Call function when click in date
                    // onSelectSlot={(e) => 
                    //         //this.show.bind('blurring',event.increment_id)
                    //         alert(e)

                    // }

                    onSelectEvent={
                        (event) => {
                            //return (event.increment_id)
                            this.show('blurring', event.increment_id)
                        }

                        //alert(event.increment_id)

                    }


                    // components={{
                    //     toolbar: this.show('blurring')
                    // }}
                    //onDragStart={console.log}
                    defaultView={Views.MONTH}
                    defaultDate={moment().toDate()}
                />

            </>
        )
    }

}
const at = {
    background: 'yellow'
}
