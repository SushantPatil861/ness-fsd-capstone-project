import axios from "axios";
import React from "react";
import { useRef } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Button, Badge} from 'react-bootstrap';
import './common.css';

export default function LoginComponent(props) {
    const navigate = useNavigate();
    const username = useRef('');
    const password = useRef('');
    


    const buttonClickHandler = (event)=> {
        event.preventDefault();
        const inputUsername= username.current.value
        const inputPassword= password.current.value
        axios.get('http://localhost:3001/user', {
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(
            (res)=> {
                console.log(res.data)
                const user = res.data.filter(c=> c.username==inputUsername && c.password == inputPassword)[0]
                console.log(user)
                if(user) {
                    sessionStorage.setItem("loggedInUser", inputUsername)
                    navigate('/home')
                } else {
                    sessionStorage.removeItem('loggedInUser')
                }
                
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
                    <h2 align="center">Login to your account.</h2>
                    <hr/>
                    <br/>
                    <Form.Group as={Row} className="mb-3" controlId="formUsername">
                        <Form.Label column sm={4}>Username: </Form.Label>
                        <Col>
                            <Form.Control type="text" ref={username}/>
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
                        <Button type="submit">Login</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}