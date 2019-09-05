import React, { Component } from 'react'
import { Icon, Menu, Image } from 'semantic-ui-react'

import '../Css/Nav.css'


export default class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeItem: 'home'
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <Menu compact icon='labeled' vertical fluid style={nav}>
                <Menu.Item
                    name='logo'
                    className="itemLogo"
                >
                    <Image src='/images/logo_1.png' size='small' className="imageDashboard" />
                    Lion Company
                </Menu.Item>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                    style={navitem}
                >
                    <Icon name='home' />
                    Home
                </Menu.Item>

                <Menu.Item
                    name='orders'
                    active={activeItem === 'orders'}
                    onClick={this.handleItemClick}
                    style={navitem}
                >
                    <Icon name='clipboard list' />
                    Orders
                </Menu.Item>

                <Menu.Item
                    name='products'
                    active={activeItem === 'products'}
                    onClick={this.handleItemClick}
                    style={navitem}
                >
                    <Icon name='gift' />
                    Products
                </Menu.Item>
            </Menu>
        )
    }
}

const nav = {
    backgroundColor: "#373330",
    borderRadius: "0px",
    height: "100vh",
    border: "0px"
}
const navitem = {
    color: "white",
    borderRadius: "0px",
    transition:"0.5s",
    border: '0px'
}
