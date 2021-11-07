
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { axios } from "../../../api";
import { TUser } from '../../../types';
// import { Redirect } from 'react-router';
// import { useUser } from '../../../hooks/useUser';
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  // const { user } = useUser();
  const { username } = useParams() as { username: string };
  const [userData, setUserData] = React.useState<TUser | undefined>();

  // const token = localStorage.getItem("accessToken")
  // const decodedToken = decode(token as string) as Token;
  // const nickname = decodedToken.nickname;

  React.useEffect(() => {
    const result = async () => {
      const answer = await axios.get(`user/${username}`);
      setUserData(answer.data)
    }
    result()
  }, [username]);

  // if (user === undefined) {
  //   return <div>Loading</div>;
  // }

  // if (user === null) {
  //   return <Redirect to='/login' />
  // }

  // console.log(userData);

  return (
    <Container className={styles.body}>
      <Container className={styles.block}>
        <img src="/assets/images/4-1.png" className={styles.before} />
        <img src="/assets/images/5.png" className={styles.after} />
        <Row className="">

          <Col>
            <div className={styles.imgpart}>
              <img src="/assets/images/adoptme.jpg" alt="" />

            </div>
            <div className={styles.favourites}>
              <button><img src="/assets/images/heart.png" alt="" /></button>
              5

              <button><img src="/assets/images/email.png" alt="" /></button>
            </div>
          </Col>
          <Col>
            <div className={styles.about}>
              <div className={styles.name}>
                <span>Nickname: </span><br />
              </div>



              <div className={styles.bio}>
                <span>About: Lorem ipsum dolor sit amet consectetur adipisicing elit.Assumenda, sequi animi ad veritatis libero distinctio aut harum veniam voluptatum quod!Dolorem culpa voluptatibus et vel, mollitia at exercitationem facere aliquid?</span><br />

              </div>

              <div className={styles.contact}>
                <span>Hobby and interests: </span><br />
                <span>Occupation: </span><br />
                <span>City: </span><br />
                <span>Date of Birth: </span><br />
              </div>
            </div>
          </Col>


        </Row>


      </Container>


    </Container >
  )
}
