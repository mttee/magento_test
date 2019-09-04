import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../Components/Login'

// const NavRoute = ({exact, path, component: Component}) => (
//     <Route exact={exact} path={path} render={(props) => (
//       <div>
//         <Menu/>
//         <Component {...props}/>
//       </div>
//     )}/>
//   )

export default class router extends Component {
    render() {
        return (
            <Router>
                {/* <NavRoute/> */}
                <Route exact path="/" component={Login}/>
            </Router>
        )
    }
}
