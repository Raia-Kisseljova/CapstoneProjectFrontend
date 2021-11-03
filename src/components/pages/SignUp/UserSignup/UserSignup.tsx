
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { axios } from '../../../../api'
import ButtonCustom from '../../../shared/Button/ButtonCustom'
import styles from './UserSignup.module.css'
export default function UserSignup() {


  const fullnameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const locationRef = React.useRef<HTMLInputElement>(null)
  const nicknameRef = React.useRef<HTMLInputElement>(null)
  const descriptionRef = React.useRef<HTMLInputElement>(null)
  const hobbyRef = React.useRef<HTMLInputElement>(null)
  const occupationRef = React.useRef<HTMLInputElement>(null)
  const dateOfBirthRef = React.useRef<HTMLInputElement>(null)

  const history = useHistory()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formValues = {
      fullname: fullnameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      location: locationRef.current?.value,
      nickname: nicknameRef.current?.value,
      about: descriptionRef.current?.value,
      hobby: hobbyRef.current?.value,
      dateOfBirth: dateOfBirthRef.current?.value
    }

    console.log(formValues)
    await axios.post("/signup/user", formValues)

    history.push("/login")
  }

  return (
    <Container fluid={true} className={styles.body}>
      <Row >
        <Col>
          <div className={styles.frame}>
            <form onSubmit={onSubmit}>
              <label htmlFor="name">Fullname</label><br />
              <input type="text" placeholder="name" id="name" ref={fullnameRef} /><br />

              <label htmlFor="email">Email</label><br />
              <input type="text" placeholder="email" id="email" ref={emailRef} /><br />

              <label htmlFor="password">Password</label><br />
              <input type="password" placeholder="password" id="password" ref={passwordRef} /><br />

              <label htmlFor="city">Location</label><br />
              <input type="text" placeholder="location" id="city" ref={locationRef} /><br />

              <label htmlFor="nickname">Nickname</label><br />
              <input type="text" placeholder="nickname" id="nickname" ref={nicknameRef} /><br />

              <label htmlFor="about">Description</label><br />
              <input type="text" placeholder="description" id="about" ref={descriptionRef} /><br />

              <label htmlFor="hobby">Hobby/interests</label><br />
              <input type="text" placeholder="hobby" id="hobby" ref={hobbyRef} /><br />

              <label htmlFor="occupation">Occupation</label><br />
              <input type="text" placeholder="occupation" id="occupation" ref={occupationRef} /><br />

              <label htmlFor="dob">Date of birth</label><br />
              <input type="date" placeholder="date of birth" id="dob" ref={dateOfBirthRef} /><br />


              <div className={styles['file-upload']}><label htmlFor="avatar" className={styles.avatarlabel}>Avatar</label><br />
                <input type="file" id="avatar" className={styles.upload} /></div>

              <ButtonCustom color='pink'>signup</ButtonCustom>
            </form>

          </div>
        </Col>

      </Row>
    </Container >
  )
}
