import React, { Component } from 'react'
import { Menu, Button, Feed } from 'semantic-ui-react'
import '../Css/MenuTop.css'

export default class MenuTop extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Menu style={{ backgroundColor: "rgb(55, 51, 48)", borderRadius: "0", border: "0", position: "relative" }}>                
                <Feed className="helloAdmin">
                    <Feed.Event
                    image='https://images-na.ssl-images-amazon.com/images/I/51QsquBv8DL._SX425_.jpg'
                    content='Nguyễn Hồ Minh Trí'
                    />
                </Feed>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button primary>Sign Out</Button>
                    </Menu.Item>

                    <Menu.Item>
                        <Button color='red'>Help</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
