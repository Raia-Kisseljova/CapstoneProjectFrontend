import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './AnimalProfile.module.css'
export default function AnimalProfile() {
  return (
    <Container className={styles.body}>
      <Row>
        <img src="" alt="" />
        <Col>
          <div className={styles.imagepart}>
            <img src="/assets/images/tilly.jpg" alt="" />

          </div>

          <div className={styles.categories}>


          </div>

          <div className={styles.about}>
            <h4>Introducing our beautiful girl <span>Tilly</span></h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ipsum iste! Dignissimos earum commodi ipsam nemo ducimus perferendis atque. Illo eveniet odio atque adipisci eaque rem tempore voluptate dolorem sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est minima quo temporibus, aspernatur exercitationem cupiditate officiis. Veniam laboriosam laudantium iusto consequatur exercitationem obcaecati culpa laborum, porro, earum ab, corporis eveniet.</p>
          </div>
        </Col>


      </Row>


    </Container>
  )
}
