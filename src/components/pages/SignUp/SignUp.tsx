import React from 'react'
import { Col, Container, Row } from "react-bootstrap"
import ButtonCustom from '../../shared/Button/ButtonCustom'
import styles from './Signup.module.css'
export default function SignUp() {
  return (
    <>
      <div>
        <p className={`${styles.header} text-center`}>Join and adopt today</p>
      </div>
      <Container fluid="md" className={styles.body}>
        <Row >
          <Col>
            <div className="">
              <form action="">
                <label htmlFor="email">Email</label><br />
                <input type="text" placeholder="email" id="email" /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" placeholder="password" id="password" /><br />
                <label htmlFor="nickname">Nickname</label><br />
                <input type="text" placeholder="nickname" id="nickname" /><br />
                <label htmlFor="city">Location</label><br />
                <input type="text" placeholder="location" id="city" /><br />
                <label htmlFor="dob">Date of birth</label><br />
                <input type="date" placeholder="date of birth" id="dob" /><br />
                <div className={styles['file-upload']}><label htmlFor="avatar" className="avatarlabel">Avatar</label><br />
                  <input type="file" id="avatar" className={styles.upload} /></div>

                <ButtonCustom color='pink'>signup</ButtonCustom>
              </form>

            </div>
          </Col>

          <Col >
            <div>
              <img src="assets/images/adoptme.jpg" alt="" />
            </div>
          </Col>


        </Row>
      </Container >
    </>

  )
}
