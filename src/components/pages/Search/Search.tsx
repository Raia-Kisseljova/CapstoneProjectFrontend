import debouncePromise from 'awesome-debounce-promise';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { axios } from 'api';
import ButtonCustom from 'components/shared/Button/ButtonCustom';

import styles from './Search.module.css';

type TAnimal = {
  id: string;
  petName: string;
  breed: string;
  type: string;
  gender: string;
  image: string;
  location: string;
  description: string;
  canLiveWithPets: boolean;
  canLiveWithChildren: boolean;
  indoorOnly: boolean;
};

export default function Search() {
  const searchByCity = async () => {
    const animalArray = await fetchAnimals();

    const byCity = animalArray.filter(
      animal => animal.location === inputRef.current?.value
    );

    setSearch(byCity);
  };

  const [search, setSearch] = React.useState<TAnimal[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const fetchAnimals = async (): Promise<TAnimal[]> => {
    const result = await axios.get('/animal');
    if (result.status === 200) {
      setSearch(result.data);
    }
    return result.data;
  };

  const onlyCats = async () => {
    const animalArray = await fetchAnimals();
    setSearch(animalArray.filter(animal => animal.type === 'cat'));
  };

  const onlyDogs = async () => {
    const animalArray = await fetchAnimals();
    setSearch(animalArray.filter(animal => animal.type === 'dog'));
  };

  const onlyRodents = async () => {
    const animalArray = await fetchAnimals();
    setSearch(animalArray.filter(animal => animal.type === 'rodent'));
  };

  const onlyBirds = async () => {
    const animalArray = await fetchAnimals();
    setSearch(animalArray.filter(animal => animal.type === 'bird'));
  };

  // console.log(search.filter(animal => animal.type === 'cat'));

  React.useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <>
      <Container>
        <Row className={styles.search}>
          <Col>
            <input
              type='text'
              placeholder='Search in your city'
              width='100%'
              onChange={debouncePromise(searchByCity, 500)}
              ref={inputRef}
            />
          </Col>
          <Col>
            <div className={styles.categories}>
              <button onClick={() => onlyCats()}>
                <img src='/assets/images/cat.png' alt='cats' />
              </button>
              <button onClick={() => onlyRodents()}>
                <img src='/assets/images/rodents.png' alt='rodents' />
              </button>
              <button onClick={() => onlyDogs()}>
                <img src='/assets/images/dogs.png' alt='dogs' />
              </button>
              <button onClick={() => onlyBirds()}>
                <img src='/assets/images/birds.png' alt='birds' />
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className={styles.display}>
          <Col>
            {search.map(animal => {
              return (
                <div className={styles.card}>
                  <img src={animal.image} alt='animal' />
                  <h3>{animal.petName}</h3>
                  <p>{animal.location}</p>
                  <p>{animal.gender}</p>
                  <ButtonCustom color='pink' className={styles['button-search']}>
                    Adopt
                  </ButtonCustom>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}
