import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Form } from 'react-bootstrap';
import './Navbar.module.css'; // Custom styles

const Navbar = () => {
  return (
    <BootstrapNavbar expand="lg" className="navbar-custom">
      <Container fluid>
        <BootstrapNavbar.Brand href="#">Smart Docs</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
        <BootstrapNavbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            
          </Nav>
          
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
