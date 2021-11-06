import Loader from 'components/shared/Loaders/Loader';
import decode from 'jwt-decode';
import React, { useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { axios, isAxiosError } from '../../../api';
import { TTokenPayload } from '../../../types';
import ButtonCustom from '../../shared/Button/ButtonCustom';
import styles from "./Login.module.css";



// import { Link } from
export default function Login() {
  const history = useHistory()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailInput = emailRef.current as HTMLInputElement;
    const passwordInput = passwordRef.current as HTMLInputElement;

    const credentials = {
      email: emailInput.value,
      password: passwordInput.value,
    }

    try {
      if (credentials.email && credentials.password) {
        const res = await axios.post("login", credentials);
        // console.log(res)
        const decodedToken = decode(res.data.accessToken) as TTokenPayload;
        // console.log(decodedToken)
        localStorage.setItem('accessToken', res.data.accessToken);
        console.log(decodedToken);
        history.push(`users/${decodedToken._id}`)
      } else {
        // console.log("Missing credentials")
      }

    } catch (err) {
      if (isAxiosError(err) && err.response) {
        const { status, data } = err.response;
        // console.log({ status, data });
      }
    }

  }
  setTimeout(() => {
    setIsLoading(false)
  }, 1000);
  return (
    <>
      {isLoading && <Loader />}
      <Container fluid={true} className={styles.body}>
        <Row >
          <Col  >
            <div className={styles.videopart}>
              <video loop={true} autoPlay={true} muted={true}>
                <source src="assets/images/videoLogin2.mp4" type="video/mp4" />
              </video>
            </div>
          </Col>
          <Col >
            <form onSubmit={onSubmit}>
              <div className={styles.form}>
                <h4>Login to your account.</h4>
                <input type="text" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passwordRef} />
                <div>
                  <ButtonCustom color='blue' className='mr-4'>Login</ButtonCustom>
                  <Link to={"/signup"}>
                    <ButtonCustom color='pink' className='' >Signup</ButtonCustom>
                  </Link>
                </div>

              </div>
            </form>
          </Col>


        </Row>


      </Container>

    </>
  )
}
