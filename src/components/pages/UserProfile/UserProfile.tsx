
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from "./UserProfile.module.css"
export default function UserProfile() {
  return (
    <Container className={styles.body}>
      <Container className={styles.block}>
        <Row className="">
          <Col>
            <img src="/assets/images/adoptme.jpg" alt="" width="60%" />
          </Col>
          <Col>
            <div>
              <h6>Puppy</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="mt-5">
              <h6>Age : 2 years.</h6>
              <h6>Location : Bristol.</h6>
              <h6>Occupation : N/A</h6>
              <h6>Hobby : Going for a walk.</h6>
            </div>
          </Col>


        </Row>


      </Container>


    </Container>
  )
}
