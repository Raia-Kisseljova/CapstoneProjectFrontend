import { useUser } from 'providers/UserProvider';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function NavBar() {
  const { user, logout } = useUser();
  const history = useHistory();
  // console.log('NavBar rerender');
  console.log(user);

  return (
    <Navbar className="navbar px-5">
      <Container fluid={true}>
        <Navbar.Brand href="#home"><img src="/assets/images/Logo.png" alt="" className="logo" /></Navbar.Brand>
        <Nav className="me-auto">
          <Link to={"/"} className="nav-link bold">
            Home
          </Link>

          {user && (
            <Link to={`/users/${user._id}`} className="nav-link bold">
              Profile
            </Link>
          )}
          {/* 
          <Link to={`/users/:nickname`} className="nav-link bold">
            Profile
          </Link> */}

          {user == null && (
            <Link to={"/login"} className="nav-link bold">Login</Link>
          )}

          <button className="logout-btn" onClick={() => {
            logout();
            history.push('/login');
          }}>Logout</button>


        </Nav>
      </Container>
    </Navbar >
  )
}