import React, { Component } from 'react'
import { Container, Button, Form, Grid, Segment, Divider, Message } from 'semantic-ui-react'
import Cookies from 'universal-cookie';
 
const axios = require('axios');
const cookies = new Cookies();


export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            statusMessage: false,
            contentMassage: '',
            colorMessage: '',
            loading: false
        }
    }

    
    getValueForm = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name] : value
        })
    }

    showMessage = () => {
        if(this.state.statusMessage === true){
            return(
                <Message
                    error
                    header='Không thể đăng nhập!'
                    content = {this.state.contentMassage}
                />
            )
        }
    }

    submitForm = () => {
        
        if(this.state.username === '' || this.state.password === ''){
            this.setState({
                contentMassage: "Không được để trống các trường!",
                colorMessage: 'warning',
                statusMessage: true
            })
        }else{
            this.setState({
                loading: true
            })
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },            
                url: 'https://localhost/magento_test/index.php/rest/V1/integration/admin/token/',
                data: {
                username: this.state.username,
                password: this.state.password
                }
            }).then((result) => {
                console.log(result);
                
                if(result.data !== null){
                    
                    this.setState({
                        loading: true
                    })
                    cookies.set('mycookies', result.data);
                }
                
            }).catch((error) => {
                this.setState({
                    contentMassage: "Username hoặc password không chính xác!",
                    statusMessage: true
                })
            });
        }
        
    }

    buttonSunmit = () => {
        if(this.state.loading === true){
            return(
                <Button loading primary>
                    Loading
                </Button>
            )
        }
        else{
            return (<Button content='Login' primary onClick={this.submitForm} /> )
        }
    }

    render() {
        return (
            <div>
                <Container text>
                <Segment placeholder style={form_Login}>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                  
                            <Form>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    label='Username'
                                    placeholder='Username'
                                    name = "username"
                                    onChange={this.getValueForm}
                                />
                                <Form.Input
                                    icon='lock'
                                    iconPosition='left'
                                    label='Password'
                                    type='password'
                                    name='password'
                                    onChange={this.getValueForm}
                                />
                                {/* {this.buttonSunmit()} */}
                                <Button content='Login' primary onClick={this.submitForm} /> 
                            </Form>
                            {this.showMessage()}
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Button content='Sign up' icon='signup' size='big' /> 
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Or</Divider>
                </Segment>
                </Container>
            </div>
        )
    }
}

const form_Login = {
    position: "absolute",
    height:"40%",
    top: "50%",
    left: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
}



