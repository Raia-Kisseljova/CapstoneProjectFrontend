import axios from 'axios'
import decode from 'jwt-decode'
import React, { useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import ButtonCustom from '../../shared/Button/ButtonCustom'
import styles from "./Login.module.css"



// import { Link } from
export default function Login() {
  const history = useHistory()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailInput = emailRef.current as HTMLInputElement;
    const passwordInput = passwordRef.current as HTMLInputElement;

    const credentials = {
      email: emailInput.value,// ''
      password: passwordInput.value, // ''
    }

    try {

      const res = await axios.post("http://localhost:3001/login", credentials);
      console.log(res)
      const decodedToken = decode(res.data.accessToken) as { nickname: string }
      console.log(decodedToken)
      localStorage.setItem('accessToken', res.data.accessToken);
      history.push(`users/${decodedToken.nickname}`)

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status, data } = err.response;
        console.log({ status, data });
      }
    }

  }

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
          <form onSubmit={onSubmit}>
            <div className={styles.form}>
              <h4>Login to your account.</h4>
              <input type="text" placeholder="email" ref={emailRef} />
              <input type="password" placeholder="password" ref={passwordRef} />
              <ButtonCustom color='blue' className='mr-5'>Login</ButtonCustom>

              <Link to={"/signup"}>
                <ButtonCustom color='pink' className='mb-3' >Signup</ButtonCustom>
              </Link>
            </div>
          </form>
        </Col>


      </Row>


    </Container>
  )
}
