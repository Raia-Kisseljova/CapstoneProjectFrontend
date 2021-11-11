import debouncePromise from 'awesome-debounce-promise';
import { AxiosError } from 'axios';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';

import { axios } from 'api';
import ButtonCustom from 'components/shared/Button/ButtonCustom';
import useCurrentUser from 'hooks/useCurrentUser';
import useDebounce from 'hooks/useDebounce';
import { TAnimal } from 'types';

import styles from './Search.module.css';

export default function Search() {
  const user = useCurrentUser();

  const [city, setCity] = React.useState('');
  const [type, setType] = React.useState('all');
  // const inputRef = React.useRef<HTMLInputElement>(null);

  const animalsQuery = useQuery<TAnimal[], AxiosError>(['ANIMALS', city, type], () =>
    axios.get('animal', { params: { city: city, type: type } }).then(res => res.data)
  );

  // console.log(user.user, "USER")

  // if (user.user?.role === "BasicUser") {
  //   const nickname = user.user.nickname
  //   console.log(nickname, "NICKNAME")
  // }

  // const searchByCity = async () => {
  //   const animalArray = await fetchAnimals();

  //   const byCity = animalArray.filter(
  //     animal => animal.location === inputRef.current?.value
  //   );

  //   setSearch(byCity);
  // };

  // const [animals, setAnimals] = React.useState<TAnimal[]>([]);

  // const fetchAnimals = async (): Promise<TAnimal[]> => {
  //   const result = await axios.get('/animal');
  //   if (result.status === 200) {
  //     setCity(result.data);
  //   }
  //   return result.data;
  // };

  // const onlyCats = async () => {
  //   const animalArray = await fetchAnimals();
  //   setCity(animalArray.filter(animal => animal.type === 'cat'));
  // };

  // const onlyDogs = async () => {
  //   const animalArray = await fetchAnimals();
  //   setCity(animalArray.filter(animal => animal.type === 'dog'));
  // };

  // const onlyRodents = async () => {
  //   const animalArray = await fetchAnimals();
  //   setCity(animalArray.filter(animal => animal.type === 'rodent'));
  // };

  // const onlyBirds = async () => {
  //   const animalArray = await fetchAnimals();
  //   setCity(animalArray.filter(animal => animal.type === 'bird'));
  // };

  // console.log(search.filter(animal => animal.type === 'cat'));

  // React.useEffect(() => {
  //   fetchAnimals();
  // }, []);

  const addToFavorites = async (animal: TAnimal) => {
    if (user.user?.role === 'BasicUser')
      try {
        const nickname = user.user.nickname;
        const animalId = animal._id;
        console.log(animalId, 'ANIMAL ID');
        console.log(nickname, 'NICKNAME');

        const result = await axios.post(`user/${nickname}/favourites`, {
          _id: animalId,
        });
      } catch (error) {
        console.log(error);
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
              <div>
                {animalsQuery.data.map(animal => {
                  return (
                    <div className={styles.card} key={animal._id}>
                      <img src={animal.image} alt='animal' />
                      <h3>{animal.petName}</h3>
                      <p>{animal.location}</p>
                      <p>{animal.gender}</p>
                      <ButtonCustom color='pink' className={styles['button-search']}>
                        Adopt
                      </ButtonCustom>
                      <div className={styles.like}>
                        <button onClick={e => addToFavorites(animal)}>♥</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : animalsQuery.isError ? (
              <div>{animalsQuery.error.response?.status}</div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}
