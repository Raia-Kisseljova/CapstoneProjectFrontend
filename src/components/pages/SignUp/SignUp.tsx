import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router';

import useCurrentUser from 'hooks/useCurrentUser';
import { getProfilePath } from 'utils';

import OrganisationSignup from './OrganisationSignup';
import styles from './Signup.module.css';
import UserSignup from './UserSignup';

export default function SignUp() {
  const { user } = useCurrentUser();
  const [form, setForm] = React.useState('');

  if (user) {
    return <Redirect to={getProfilePath(user)} />;
  }

  return (
    <>
      <Container fluid className={styles.banners}>
        <Row>
          <div className={styles['org-banner']}>
            <img src='/assets/images/asorg.png' alt='' />
            <button className={styles['org-btn']} onClick={() => setForm('org')}>
              Join
            </button>
          </div>
          <div className={styles['user-banner']}>
            <img src='/assets/images/asuser.png' alt='' />
            <button className={styles['user-btn']} onClick={() => setForm('user')}>
              Join
            </button>
          </div>
        </Row>
      </Container>
      {form === '' && (
        <Container fluid className={styles.banner}>
          <Row>
            <img src='/assets/images/signupbanner.png' alt='' />
          </Row>
        </Container>
      )}

      {form === 'org' && <OrganisationSignup />}

      {form === 'user' && <UserSignup />}
    </>
  );
}
