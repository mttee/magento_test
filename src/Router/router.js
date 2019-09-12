import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Grid } from 'semantic-ui-react'
import Login from '../Components/Login';
import Nav from '../Components/Nav'
import MenuTop from '../Components/MenuTop'
import Dashboard from '../Components/Dashboard';
import Orders from '../Components/Orders'
import Cookies from 'universal-cookie';
import Products from '../Components/Products';

const cookies = new Cookies();

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          cookies.get('mycookies') ? (
            <>
                <Grid columns='equal' >
                    <Grid.Column width={2} style={{height: "100%", paddingRight: "0"}} >
                        <Nav />
                    </Grid.Column>
                    <Grid.Column width={14} style={{paddingLeft: "0"}}>
                        <MenuTop/>
                        <Component {...props} />
                    </Grid.Column>
                </Grid>
            <Component {...props} />
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

// const NavRoute = ({ exact, path, component: Component }) => (
//     <Route exact={exact} path={path} render={(props) => (
//         <div>
//             <Grid columns='equal' >
//                 <Grid.Column style={{height: "100%", paddingRight: "0"}} >
//                     <Nav />
//                 </Grid.Column>
//                 <Grid.Column width={14} style={{paddingLeft: "0"}}>
//                     <MenuTop/>
//                     <Component {...props} />
//                 </Grid.Column>
//             </Grid>
//         </div>
//     )} />
// )

export default class router extends Component {
    render() {

        return (
            <>
                <PrivateRoute path='/dashboard' component={Dashboard}/>
                <PrivateRoute path='/orders' component={Orders}/>
                <PrivateRoute path='/products' component={Products}/>
                {/* <NavRoute path="/dashboard" component={Dashboard} /> */}
                <Route exact path="/" component={Login} />
            </>
        )
    }
}
