import { axios } from 'api'
import debouncePromise from 'awesome-debounce-promise'
import ButtonCustom from 'components/shared/Button/ButtonCustom'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './Search.module.css'

interface Animal {
  id: string,
  petName: string,
  breed: string,
  type: string,
  gender: string,
  image: string,
  location: string,
  description: string,
  canLiveWithPets: boolean,
  canLiveWithChildren: boolean,
  indoorOnly: boolean,
}

export default function Search() {

  const searchByCity = async () => {
    const animalArray = await fetchAnimals()
    console.log("too many requests")
    const byCity = animalArray.filter((animal: any) => animal.location === inputRef.current?.value)
    setSearch(byCity)
  }

  const [search, setSearch] = React.useState<Animal[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const fetchAnimals = async () => {
    const result = await axios.get('/animal')
    if (result.status === 200) {
      setSearch(result.data)
    }
    return result.data
  }

  const onlyCats = async () => {
    const animalArray = await fetchAnimals()
    setSearch(animalArray.filter((animal: any) => animal.type === "cat"))
  }


  const onlyDogs = async () => {
    const animalArray = await fetchAnimals()
    setSearch(animalArray.filter((animal: any) => animal.type === "dog"))
  }
  const onlyRodents = async () => {
    const animalArray = await fetchAnimals()
    setSearch(animalArray.filter((animal: any) => animal.type === "rodent"))
  }
  const onlyBirds = async () => {
    const animalArray = await fetchAnimals()
    setSearch(animalArray.filter((animal: any) => animal.type === "bird"))
  }

  console.log(search.filter(animal => animal.type === 'cat'))

  window.onload = () => { fetchAnimals() }
  return (
    <>
      <Container >
        <Row className={styles.search}>
          <Col>
            <input type="text" placeholder="Search in your city" width="100%" onChange={debouncePromise(searchByCity, 500)} ref={inputRef} />
          </Col>
          <Col>
            <div className={styles.categories}>
              <img src="/assets/images/cat.png" alt="cats" onClick={(e: React.MouseEvent<HTMLImageElement>) => onlyCats()} />
              <img src="/assets/images/rodents.png" alt="rodents" onClick={(e: React.MouseEvent<HTMLImageElement>) => onlyRodents()} />
              <img src="/assets/images/dogs.png" alt="dogs" onClick={(e: React.MouseEvent<HTMLImageElement>) => onlyDogs()} />
              <img src="/assets/images/birds.png" alt="birds" onClick={(e: React.MouseEvent<HTMLImageElement>) => onlyBirds()} />
            </div>

          </Col>
        </Row>
      </Container>


      <Container >
        <Row className={styles.display}>
          <Col>
            {search.map(animal => {
              return (
                <div className={styles.card}>
                  <img src={animal.image} alt="animal" />
                  <h3>{animal.petName}</h3>
                  <p>{animal.location}</p>
                  <p>{animal.gender}</p>
                  <ButtonCustom color="pink" className={styles.buttonSearch}>Adopt</ButtonCustom>
                </div>
              )
            })}
          </Col>
        </Row>
      </Container>
    </>
  )
}
