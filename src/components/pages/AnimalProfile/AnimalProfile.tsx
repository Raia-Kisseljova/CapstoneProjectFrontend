import { AxiosError } from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router';

import { axios } from 'api';
import { TAnimal } from 'types';

import styles from './AnimalProfile.module.css';

export default function AnimalProfile() {
  const { _id } = useParams() as { _id: string };
  const animalQuery = useQuery<TAnimal, AxiosError>(['ANIMAL', _id], () =>
    axios.get(`animal/${_id}`).then(res => res.data)
  );

  return (
    <Container className={styles.body}>
      <Row className='col-8'>
        <Col>
          <div>
            {animalQuery.isLoading ? (
              <div>
                <Skeleton circle count={5} width={50} height={50} />
              </div>
            ) : animalQuery.isSuccess ? (
              <div>
                <Carousel>
                  {animalQuery.data.images.map(image => (
                    <div key={image} className={styles.cover}>
                      <img src={image} alt='animalimage' />
                    </div>
                  ))}
                </Carousel>

                {/* <img src='/assets/images/tilly.jpg' alt='' /> */}
                <div className={styles.badges}>
                  {animalQuery.data.canLiveWithChildren === true ? (
                    <div className={styles.children}>
                      <img
                        src='/assets/images/yes-child.png'
                        alt='Friendly with children'
                        width='33%'
                      />
                      <p>Friendly with children</p>
                    </div>
                  ) : (
                    <div className={styles.pets}>
                      <img
                        src='/assets/images/no-child.png'
                        alt='No children in household'
                        width='33%'
                        className={styles['no-children']}
                      />
                      <p>No children in household</p>
                    </div>
                  )}

                  {animalQuery.data.canLiveWithPets === true ? (
                    <div className={styles.pets}>
                      <img
                        src='/assets/images/yes-animals.png'
                        alt='Is friendly with other animals'
                        width='33%'
                      />
                      <p>Friendly with other pets</p>
                    </div>
                  ) : (
                    <div className={styles.pets}>
                      <img
                        src='/assets/images/no-animals.png'
                        alt='Not friendly with other animals'
                        width='33%'
                        className={styles['no-animals']}
                      />
                      <p>An only animal at home</p>
                    </div>
                  )}

                  {animalQuery.data.indoorOnly === true ? (
                    <div className={styles.indoor}>
                      <img
                        src='/assets/images/indoor.png'
                        alt='Keep indoor only'
                        width='33%'
                      />
                      <p>Indoor only</p>
                    </div>
                  ) : (
                    <div className={styles.indoor}>
                      <img
                        src='/assets/images/outdoor.png'
                        alt='Outdoor access is essential'
                        width='33%'
                        className={styles['no-animals']}
                      />
                      <p>Outdoor access is essential</p>
                    </div>
                  )}
                </div>

                <div className={styles.about}>
                  <h4>
                    Introducing our beautiful{' '}
                    {animalQuery.data.gender === 'female' ? 'girl' : 'boy'}{' '}
                    <span>{animalQuery.data.petName}</span>
                  </h4>
                  <p>{animalQuery.data.description}</p>
                </div>
              </div>
            ) : animalQuery.isError ? (
              <div>{animalQuery.error.response?.status}</div>
            ) : null}
          </div>

          {/* <div className={styles.categories}></div> */}
        </Col>
      </Row>
    </Container>
  );
}
