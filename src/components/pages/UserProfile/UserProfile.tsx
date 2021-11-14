import { AxiosError } from 'axios';
import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { axios } from 'api';
import Loader from 'components/shared/Loaders/Loader';
import { TAnimal, TUser } from 'types';

import styles from './UserProfile.module.css';

export default function UserProfile() {
  const queryClient = useQueryClient();
  const { username } = useParams() as { username: string };

  const userQuery = useQuery<TUser, AxiosError>(['USERS', username], () =>
    axios.get(`user/by_name/${username}`).then(res => res.data)
  );

  const favouritesQuery = useQuery<TAnimal[], AxiosError>(
    ['USERS', username, 'FAVORITES'],
    () => axios.get(`user/${username}/favourites`).then(res => res.data),
    {
      enabled: userQuery.isSuccess,
    }
  );

  if (userQuery.isLoading) {
    return <Loader />;
  }

  if (userQuery.isError) {
    userQuery.error;
    return <div>Not Found</div>;
  }

  const remove = async (_id: string) => {
    await axios.delete(`/user/${userQuery.data?.nickname}/favourites/${_id}`);
    queryClient.invalidateQueries(['USERS', username, 'FAVORITES']);
  };

  return (
    <Container className={styles.body}>
      <Container className={styles.block}>
        <img src='/assets/images/15.png' className={styles.before} alt='Before' />
        <img src='/assets/images/5.png' className={styles.after} alt='After' />
        <Row className='row-cols-1 row-cols-md-2'>
          <Col>
            <div className={styles['img-part']}>
              <img src='/assets/images/tilly.jpg' alt='Adopt me' />
            </div>
            <div className={styles.favorites}>
              <button>
                <img src='/assets/images/heart.png' alt='Heart' />
              </button>

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
                <span>City:{userQuery.data?.location} </span>
                <br />
                <span>Date of Birth: {userQuery.data?.dateOfBirth}</span>
                <br />
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <h3 className='mt-5'>Favourites</h3>
          {favouritesQuery.isLoading ? (
            <div>
              <Skeleton circle count={5} width={50} height={50} />
            </div>
          ) : favouritesQuery.isSuccess ? (
            <div>
              {favouritesQuery.data.map(animal => {
                return (
                  <div key={animal._id} className={styles.animals}>
                    <img src={animal.images[0]} alt='img' width='50px' />
                    <Link to={`/animal/${animal._id}`} className='ml-3'>
                      {animal.petName}{' '}
                    </Link>
                    <button onClick={() => remove(animal._id)}>&times; </button>
                  </div>
                );
              })}
            </div>
          ) : favouritesQuery.isError ? (
            <div>{favouritesQuery.error.response?.status}</div>
          ) : null}
        </div>
      </Container>
    </Container>
  );
}

// <AnimalInfo isOwner={currentUser._id === userQuery.data._id}

// AnimalInfo ({ isOwner, ...ainimalStuff })
// image.resize('300x300');
// image.crop('16:9');
// {isOwner &&  <button></button>}
