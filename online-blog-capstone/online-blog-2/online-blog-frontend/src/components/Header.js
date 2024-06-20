import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function HeaderComponent() {
    
    return(
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Nav className="justify-content-center">
            <Nav.Item><Nav.Link as={Link} to="/home">Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#features">Features</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#pricing">Pricing</Nav.Link></Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
}
