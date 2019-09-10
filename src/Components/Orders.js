import React, { Component } from 'react'
import { Image, Modal, Button, Header } from 'semantic-ui-react'
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
//import moment_2 from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const DragAndDropCalendar = withDragAndDrop(Calendar)



const axios = require('axios');
const cookies = new Cookies();
var moment = require('moment');
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
            idOrderDetail:''
        }

        this.moveEvent = this.moveEvent.bind(this)
        //this.newEvent = this.newEvent.bind(this)
    }

    moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
        const events  = this.state.items
        
        const idx = events.indexOf(event)
        let allDay = event.allDay
    
        if (!event.allDay && droppedOnAllDaySlot) {
          allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
          allDay = false
        }
    
        const updatedEvent = { ...event, start, end, allDay }
    
        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)
    
        this.setState({
          items: nextEvents,
        })
    
        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
      }
    
      resizeEvent = ({ event, start, end }) => {
        const events  = this.state.items
    
        const nextEvents = events.map(existingEvent => {
          return existingEvent.increment_id === event.increment_id
            ? { ...existingEvent, start, end }
            : existingEvent
        })
    
        this.setState({
          events: nextEvents,
        })
    
        //alert(`${event.title} was resized to ${start}-${end}`)
      }
    


    show = (dimmer, id) => () => {
        this.setState({ dimmer, open: true })
        alert(id);
    }
    close = () => this.setState({ open: false })

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
                    const date = (moment(it.updated_at).format("YYYY-MM-DD HH:mm"))
                    arrDate.push(date);

                });
                console.log(arrDate);

                this.setState({
                    items: response.data.items,
                    date: response.data.items
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
        console.log(this.state.date);
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
                    <Modal.Header>Orders</Modal.Header>
                    <Modal.Content image>
                        <Image
                            wrapped
                            size='medium'
                            src='/images/avatar/large/rachel.png'
                        />
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>
                                We've found the following gravatar image associated with your
                                e-mail address.
                            </p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
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

                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    events={this.state.items}
                    //onEventDrop={this.moveEvent}
                    resizable
                    onEventResize={this.resizeEvent}
                    startAccessor="updated_at"
                    endAccessor="updated_at"
                    titleAccessor={"customer_firstname"}
                    onSelectEvent={
                        (event) => {
                            var id = event.increment_id
                            alert(id)
                            this.show('blurring', id)
                        }
                    }
                    
                // components={{
                //     toolbar: this.show('blurring')
                // }}
                //onDragStart={console.log}
                //defaultView={Views.MONTH}
                />

            </>
        )
    }

}
const at = {
    background: 'yellow'
}
