import { AxiosError } from 'axios';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { axios } from 'api';
import Loader from 'components/shared/Loaders/Loader';
import useCurrentUser from 'hooks/useCurrentUser';
import { TUser } from 'types';

import styles from './UserProfile.module.css';

export default function UserProfile() {
  const { username } = useParams() as { username: string };

  const userQuery = useQuery<TUser, AxiosError>(['USER_DETAIL', username], () =>
    axios.get(`user/by_name/${username}`).then(res => res.data)
  );

  if (userQuery.isLoading) {
    return <Loader />;
  }

  if (userQuery.isError) {
    userQuery.error;
    return <div>Not Found</div>;
  }

  return (
    <Container className={styles.body}>
      <Container className={styles.block}>
        <img src='/assets/images/4-1.png' className={styles.before} alt='Before' />
        <img src='/assets/images/5.png' className={styles.after} alt='After' />
        <Row className=''>
          <Col>
            <div className={styles['img-part']}>
              <img src='/assets/images/adoptme.jpg' alt='Adopt me' />
            </div>
            <div className={styles.favorites}>
              <button>
                <img src='/assets/images/heart.png' alt='Heart' />
              </button>
              5
              <button>
                <img src='/assets/images/email.png' alt='Email' />
              </button>
            </div>
          </Col>
          <Col>
            <div className={styles.about}>
              <div className={styles.name}>
                <span>Nickname: {userQuery.data?.nickname}</span>
                <br />
              </div>

              <div className={styles.bio}>
                <span>{userQuery.data?.about}</span>
                <br />
              </div>

              <div className={styles.contact}>
                <span>Hobby and interests: </span>
                <br />
                <span>Occupation: {userQuery.data?.occupation}</span>
                <br />
                <span>City: </span>
                <br />
                <span>Date of Birth: {userQuery.data?.dateOfBirth}</span>
                <br />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
