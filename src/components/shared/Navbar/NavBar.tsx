import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useQueryClient } from 'react-query';
import { Link, useHistory } from 'react-router-dom';

import useCurrentUser from 'hooks/useCurrentUser';
import { getProfilePath } from 'utils';

export default function NavBar() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const history = useHistory();

  function onLogoutClick() {
    localStorage.removeItem('accessToken');
    queryClient.setQueryData('CURRENT_USER', null);
    history.push('/login');
  }

  return (
    <Navbar className='navbar px-5'>
      <Container fluid>
        <Navbar.Brand href='#home'>
          <img src='/assets/images/Logo.png' alt='' className='logo' />
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Link to={'/'} className='nav-link bold line-1'>
            Home
          </Link>

          {user && (
            <Link to={getProfilePath(user)} className='nav-link bold line-2'>
              Profile
            </Link>
          )}

          {user === null && (
            <Link to='/login' className='nav-link bold'>
              Login
            </Link>
          )}

          {user && (
            <button className='logout-btn line-3' onClick={onLogoutClick}>
              Logout
            </button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
