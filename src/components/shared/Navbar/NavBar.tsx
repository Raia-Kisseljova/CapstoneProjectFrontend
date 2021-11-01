import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand href="#home"><img src="/assets/images/Logo.png" alt="" className="logo" /></Navbar.Brand>
        <Nav className="me-auto">
          <Link to={"/"} className="nav-link bold">
            Home
          </Link>
          <Link to="/users/:nickname" className="nav-link bold">
            Profile
          </Link>
          <Link to={"/login"} className="nav-link bold">Login</Link>

        </Nav>
      </Container>
    </Navbar>
  )
}