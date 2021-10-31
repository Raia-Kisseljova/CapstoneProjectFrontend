import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function NavBar() {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand href="#home"><img src="assets/images/Logo.png" alt="" className="logo" /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home" className="bold">Home</Nav.Link>
          <Nav.Link href="#home" className="bold">Adopt</Nav.Link>
          <Nav.Link href="#features" className="bold">Login</Nav.Link>
          <Nav.Link href="#pricing" className="bold">Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}