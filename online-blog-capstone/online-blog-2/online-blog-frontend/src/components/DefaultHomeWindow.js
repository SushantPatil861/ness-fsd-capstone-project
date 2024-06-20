import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import './common.css';


export default function DefaultHomeComponent() {
    const navigate = useNavigate();
    const buttonClickHandler = (event)=> {
        sessionStorage.removeItem('loggedInUser');
        navigate('/home');
    }
    return (
        <div className = "centerStyle">
            <Button onClick={buttonClickHandler} variant="outline-primary">Get Started</Button>
        </div>
      
    )
}