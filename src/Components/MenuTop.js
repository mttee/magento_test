import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Menu, Button, Feed } from 'semantic-ui-react'
import '../Css/MenuTop.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class MenuTop extends Component {
    constructor(props) {
        super(props)
        this.state={
            isSignOut: false
        }
    }

    signOut = () => {
        cookies.remove('mycookies')
        this.setState({
            isSignOut: true
        })
    }

    render() {
        if(this.state.isSignOut === true){
            return <Redirect to="/"/>
        }
        return (
            <Menu style={{ backgroundColor: "rgb(55, 51, 48)", borderRadius: "0", border: "0", position: "relative", margin:"0" }}>                
                <Feed className="helloAdmin">
                    <Feed.Event
                    image='https://images-na.ssl-images-amazon.com/images/I/51QsquBv8DL._SX425_.jpg'
                    content='Nguyễn Hồ Minh Trí'
                    />
                </Feed>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button primary onClick={this.signOut}>Sign Out</Button>
                    </Menu.Item>

                    <Menu.Item>
                        <Button color='red'>Help</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
