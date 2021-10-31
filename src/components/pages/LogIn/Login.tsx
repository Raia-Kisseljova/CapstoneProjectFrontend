import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ButtonCustom from '../../shared/Button/ButtonCustom'
import styles from "./Login.module.css"

export default function Login() {
  return (
    <Container fluid="md" className={styles.body}>
      <Row >
        <Col  >
          <div className={styles.videopart}>
            <video loop={true} autoPlay={true} muted={true}>
              <source src="assets/images/videoLogin.mp4" type="video/mp4" />
            </video>
          </div>
        </Col>
        <Col >
          <div className={styles.form}>
            <h4>Login to your account.</h4>
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <ButtonCustom color='blue' className='mr-5'>Login</ButtonCustom>
            <ButtonCustom color='pink' className='mb-3'>Signup</ButtonCustom>

          </div>
        </Col>


      </Row>


    </Container>
  )
}
