import axios from "axios";
import React from "react";
import { useRef } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import {Button, Badge} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './common.css';


export default function SignUpComponent() {
    
    const navigate = useNavigate();
    const username = useRef('');
    const firstName = useRef('');
    const lastName = useRef('');
    const emailId = useRef('');
    const password = useRef('');
    const buttonClickHandler = (event)=> {
        event.preventDefault()
        const data = {
            username: username.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailId: emailId.current.value,
            password: password.current.value
        }
        console.log(data)
        axios.post("http://localhost:3001/user", data, 
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(
                (res)=> {
                    console.log(res.status)
                    sessionStorage.setItem('loggedInUser', username)
                    navigate('/home')
                }
            )
            .catch(
                (err)=>console.log(err)
            )
            
    }
    return (
        <div style={{margin : "1rem"}}>
            <div className="bodyStyle"></div>
            <div className="contentStyle">
                <Form onSubmit={buttonClickHandler}>   
                    <h2 align="center">Let’s create your account.</h2>
                    <hr/>
                    <br/>
                    <Form.Group as={Row} className="mb-3" controlId="formUsername">
                        <Form.Label column sm={4}>Username: </Form.Label>
                        <Col>
                            <Form.Control type="text" ref={username}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formFirstname">
                        <Form.Label column sm={4}>First Name: </Form.Label>
                        <Col>
                            <Form.Control type="text" ref={firstName}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formLastname">
                        <Form.Label column sm={4}>Last Name: </Form.Label>
                        <Col>
                            <Form.Control type="text" ref={lastName}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formEmail">
                        <Form.Label column sm={4}>Email: </Form.Label>
                        <Col>
                            <Form.Control type="text" ref={emailId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPassword">
                        <Form.Label column sm={4}>Password: </Form.Label>
                        <Col>
                            <Form.Control type="password" ref={password}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formRememberMe">
                        <Col sm={{ offset: 4 }}>
                        <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ offset: 5 }}>
                        <Button type="submit">Continue</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}