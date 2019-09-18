import React, { Component } from 'react'
import { Modal, Header, Grid, Segment, Divider, Table, Dimmer, Loader } from 'semantic-ui-react'

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
            orderDetail: null,
            groupCustomer: '',
            countryCustomerBilling:'',
            countryCustomerShipping :'',
            currency: '',
            loading: true
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
            this.getGroupCustomer(response.data.customer_group_id)
            this.getCountry(response.data.billing_address.country_id).then(result => this.setState({countryCustomerBilling: result}))
            this.getCountry(response.data.extension_attributes.shipping_assignments[0].shipping.address.country_id).then(result => this.setState({countryCustomerShipping: result}))
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

    UNSAFE_componentWillMount() {

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
                response.data.items.forEach(it => {
                    const date = (moment(it.updated_at).format("YYY,MM,DD,HH,mm,0,0"))
                    arrDate.push(date);

                });
                this.setState({
                    items: response.data.items,
                    date: response.data.items,
                    events: response.data.items,
                    loading: false
                })

            });

            this.getCurrency()


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

    getGroupCustomer = (id) => {
        axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/customerGroups/'+id,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response)=>{
             this.setState({groupCustomer :response.data.code}) 
        })
    }

    getCountry = async(id) => {
        const country = await axios({
            method: 'get',
            url: 'https://localhost/magento_test/index.php/rest/V1/directory/countries/'+id,
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('mycookies')
            },
        }).then((response)=>{
            
            return(response.data.full_name_locale)
             //this.setState({countryCustomer :response.data.full_name_locale}) 
        })
        return country
    }

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
            return (
                <Segment style={{height:"100%", margin:"0"}}>
                    <Dimmer active inverted style={{backgroundColor: "lightgray"}}>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                </Segment>
            )
        }

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
                    <Modal.Header style={HeaderStyle}>Orders {this.state.orderDetail ? this.state.orderDetail.increment_id : null}</Modal.Header>
                    <Modal.Content image scrolling>

                        <Grid style={{ width: "100%", margin: "auto" }}>
                            <Grid.Row >
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left' style={segmentHeader}>
                                            Order
                                        </Header>

                                        <Divider clearing />
                                        <p>Order Date: <span style={dataShowStyle}> {this.state.orderDetail ? moment(this.state.orderDetail.updated_at).format("HH : mm - DD/MM/YYYY") : null} </span></p>
                                        <p>Order Status: <span style={dataShowStyle}> {this.state.orderDetail ? this.state.orderDetail.status : null} </span></p>
                                        <p>Purchased From: <span style={dataShowStyle}> {this.state.orderDetail ? this.state.orderDetail.store_name : null} </span></p>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left' style={segmentHeader}>
                                            Account Information
                                        </Header>

                                        <Divider clearing />
                                        <p>Customer Name: <span style={dataShowStyle}> {this.state.orderDetail ? this.state.orderDetail.billing_address.firstname + ' ' + this.state.orderDetail.billing_address.lastname : null} </span></p>
                                        <p>Email: <span style={dataShowStyle}> {this.state.orderDetail ? this.state.orderDetail.billing_address.email : null} </span></p>
                                        <p>Customer Group: <span style={dataShowStyle}> {this.state.groupCustomer} </span></p>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row >
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left' style={segmentHeader}>
                                            Billing Address
                                        </Header>

                                        <Divider clearing />

                                        <p>{this.state.orderDetail ? this.state.orderDetail.billing_address.firstname + ' ' + this.state.orderDetail.billing_address.lastname : null}</p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.billing_address.street[0] : null} </p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.billing_address.city + ', ' + this.state.orderDetail.billing_address.region + ', ' + this.state.orderDetail.billing_address.postcode : null}</p>
                                        <p>{this.state.countryCustomerBilling} </p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.billing_address.telephone : null} </p>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left' style={segmentHeader}>
                                            Shipping Address
                                        </Header>

                                        <Divider clearing />
                                        <p>
                                            {this.state.orderDetail ?
                                                this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.firstname + ' ' +
                                                this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.lastname : null}
                                        </p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.street[0] : null} </p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' +
                                            this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.region + ', ' +
                                            this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.postcode : null}
                                        </p>
                                        <p>{this.state.countryCustomerShipping} </p>
                                        <p>{this.state.orderDetail ? this.state.orderDetail.extension_attributes.shipping_assignments[0].shipping.address.telephone : null} </p>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row >
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left' style={segmentHeader}>
                                            Payment Information
                                        </Header>

                                        <Divider clearing />

                                        <p>{this.state.orderDetail ? this.state.orderDetail.payment.additional_information[0] : null}</p>
                                        <p>The order was placed using: {this.state.orderDetail ? this.state.orderDetail.order_currency_code : null}</p>

                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Segment>
                                        <Header as='h4' floated='left' style={segmentHeader}>
                                            Shipping & Handling Information
                                        </Header>

                                        <Divider clearing />

                                        <p>{this.state.orderDetail ? this.state.orderDetail.shipping_description + ' ₫' + this.state.orderDetail.shipping_invoiced + '.00' : null}</p>

                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row >
                                <Grid.Column width={16}>
                                    <Segment>
                                        <Header as='h4' floated='left' style={segmentHeader}>
                                            Items Ordered
                                        </Header>

                                        <Divider clearing />

                                        <Table celled color="blue" style={tableStyle}>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Product</Table.HeaderCell>
                                                    <Table.HeaderCell>Item Status</Table.HeaderCell>
                                                    <Table.HeaderCell>Original Price</Table.HeaderCell>
                                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                                    <Table.HeaderCell>Qty</Table.HeaderCell>
                                                    <Table.HeaderCell>Subtotal</Table.HeaderCell>
                                                    <Table.HeaderCell>Tax Amount</Table.HeaderCell>
                                                    <Table.HeaderCell>Tax Percent</Table.HeaderCell>
                                                    <Table.HeaderCell>Discount Amount</Table.HeaderCell>
                                                    <Table.HeaderCell>Row Total</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <p>{this.state.orderDetail ? this.state.orderDetail.items[0].name: null } </p>
                                                        <p>SKU: {this.state.orderDetail ? this.state.orderDetail.items[0].sku: null } </p>
                                                        <p>Size: {this.state.orderDetail ? this.state.orderDetail.items[0].sku: null } </p>
                                                        <p>Color: {this.state.orderDetail ? this.state.orderDetail.items[0].sku: null } </p>
                                                    </Table.Cell>                                                 
                                                    <Table.Cell>Cell</Table.Cell>
                                                    <Table.Cell>{this.state.orderDetail ? this.state.orderDetail.items[0].original_price + ' '+ this.state.currency: null }</Table.Cell>
                                                    <Table.Cell>{this.state.orderDetail ? this.state.orderDetail.items[0].price+ ' '+ this.state.currency: null }</Table.Cell>
                                                    <Table.Cell>
                                                        <p>Canceled: {this.state.orderDetail ? this.state.orderDetail.items[0].qty_canceled: null } </p>
                                                        <p>Invoiced: {this.state.orderDetail ? this.state.orderDetail.items[0].qty_invoiced: null } </p>
                                                        <p>Ordered: {this.state.orderDetail ? this.state.orderDetail.items[0].qty_ordered: null } </p>
                                                        <p>Refunded: {this.state.orderDetail ? this.state.orderDetail.items[0].qty_refunded: null } </p>
                                                        <p>Shipped: {this.state.orderDetail ? this.state.orderDetail.items[0].qty_shipped: null } </p>
                                                    </Table.Cell>
                                                    <Table.Cell>{this.state.orderDetail ? this.state.orderDetail.subtotal+ ' '+ this.state.currency: null }</Table.Cell>
                                                    <Table.Cell>{this.state.orderDetail ? this.state.orderDetail.items[0].tax_amount+ ' '+ this.state.currency: null }</Table.Cell>
                                                    <Table.Cell>{this.state.orderDetail ? this.state.orderDetail.items[0].tax_percent: null }%</Table.Cell>
                                                    <Table.Cell>{this.state.orderDetail ? this.state.orderDetail.items[0].discount_amount+ ' '+ this.state.currency: null }</Table.Cell>
                                                    <Table.Cell>{this.state.orderDetail ? this.state.orderDetail.items[0].row_total_incl_tax+ ' '+ this.state.currency: null }</Table.Cell> 
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>

                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>


                    </Modal.Content>
                    {/* <Modal.Actions>
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
                    </Modal.Actions> */}
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
const HeaderStyle = {
    background: "#3174ad",
    color: "white"
}
const segmentHeader = {
    color: "#3174ad"
}
const dataShowStyle = {
    color: "#3174ad",
    fontWeight: "bold"
}
const tableStyle = {
    overflowX: "scroll",
    maxWidth: "100%",
    display: "block"
}