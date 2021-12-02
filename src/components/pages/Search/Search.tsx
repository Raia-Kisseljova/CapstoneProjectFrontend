import { AxiosError } from 'axios';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { axios } from 'api';
import useCurrentUser from 'hooks/useCurrentUser';
import useDebounce from 'hooks/useDebounce';
import { TAnimal } from 'types';

import styles from './Search.module.css';

export default function Search() {
  const { user } = useCurrentUser();

  const [city, setCity] = React.useState('');
  const [type, setType] = React.useState('');

  const debouncedCity = useDebounce(city, 500);

  const animalsQuery = useQuery<TAnimal[], AxiosError>(
    ['ANIMALS', debouncedCity, type],
    () =>
      axios.get('animal', { params: { city: debouncedCity, type } }).then(res => res.data)
  );

  const addToFavorites = async (animal: TAnimal) => {
    if (user?.role === 'BasicUser')
      try {
        const nickname = user.nickname;
        const animalId = animal._id;

        await axios.post(`user/${nickname}/favourites`, {
          _id: animalId,
        });

        toast.success(`Added ${animal.petName} to favorites!`);
      } catch (error) {
        // console.log(error);
      }
  };

  return (
    <>
      <Container>
        <Row className={styles.search}>
          <Col>
            <input
              type='text'
              placeholder='Search in your city'
              width='100%'
              // onChange={debouncePromise(searchByCity, 500)}
              // ref={inputRef}
              onChange={e => setCity(e.target.value)}
            />
          </Col>
          <Col>
            <div className={styles.categories}>
              <button onClick={() => setType('cat')}>
                <img src='/assets/images/cat.png' alt='cats' />
              </button>
              <button onClick={() => setType('rodent')}>
                <img src='/assets/images/rodents.png' alt='rodents' />
              </button>
              <button onClick={() => setType('dog')}>
                <img src='/assets/images/dogs.png' alt='dogs' />
              </button>
              <button onClick={() => setType('bird')}>
                <img src='/assets/images/birds.png' alt='birds' />
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className={styles.display}>
          <Col>
            {animalsQuery.isLoading ? (
              <div>
                <Skeleton circle count={5} width={50} height={50} />
              </div>
            ) : animalsQuery.isSuccess ? (
              <Col>
                {animalsQuery.data.map(animal => {
                  return (
                    <div
                      className={
                        animal.type === 'bird'
                          ? styles.bird
                          : animal.type === 'rodent'
                          ? styles.rodent
                          : animal.type === 'dog'
                          ? styles.dog
                          : styles.card
                      }
                      key={animal._id}
                    >
                      <img
                        src={animal.images[0]}
                        alt='animal'
                        className={styles.animalimg}
                      />
                      <h3>{animal.petName}</h3>
                      <p>{animal.location}</p>
                      <p>{animal.gender}</p>

                      {user && (
                        <div className={styles.adoptlike}>
                          <Link
                            to={`/animal/${animal._id}`}
                            color='pink'
                            className={styles['button-adopt']}
                          >
                            Adopt
                          </Link>
                          <div className={styles.like}>
                            <button onClick={() => addToFavorites(animal)}>♥</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Col>
            ) : animalsQuery.isError ? (
              <div>{animalsQuery.error.response?.status}</div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}
