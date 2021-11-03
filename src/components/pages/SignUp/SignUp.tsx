import React from 'react'
import { Container, Row } from 'react-bootstrap'
import OrganisationSignup from './OrganisationSignup/OrganisationSignup'
import styles from './Signup.module.css'
import UserSignup from './UserSignup/UserSignup'

export default function SignUp() {
  const [form, setForm] = React.useState("")
  return (
    <>
      <Container fluid={true} className={styles.banners}>
        <Row>
          <div className={styles['org-banner']}>
            <img src="/assets/images/asorg.png" alt="" />
            <button className={styles['org-btn']} onClick={() => setForm("org")}>Join</button>
          </div>
          <div className={styles['user-banner']}>
            <img src="/assets/images/asuser.png" alt="" />
            <button className={styles['user-btn']} onClick={() => setForm("user")}>Join</button>
          </div>
        </Row>
      </Container>
      {form === "" &&
        <Container fluid={true} className={styles.signupbanner}>
          <Row>
            <img src="/assets/images/signupbanner.png" alt="" />
          </Row>
        </Container>
      }

      {form === "org" &&
        <OrganisationSignup />}

      {form === "user" && <UserSignup />}
    </>

  )
}
