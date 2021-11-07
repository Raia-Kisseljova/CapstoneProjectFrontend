import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './OrganisationProfile.module.css';

export default function OrganisationProfile() {
  return (
    <Container fluid className={styles.body}>
      <Container className={styles.block}>
        <img src='/assets/images/3.png' className={styles.before} alt='before' />
        <img src='/assets/images/2.png' className={styles.after} alt='after' />

        <Row>
          <Col>
            <div className={styles.image}>
              <img src='/assets/images/orgexample.png' alt='' />
            </div>
            <div className={styles.about}>
              <h4>Who we are</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                laboriosam tenetur, at dicta atque cupiditate, aperiam ad repudiandae fuga
                vel accusantium adipisci debitis tempora quasi nesciunt. Error
                consequuntur explicabo temporibus? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Fugiat laboriosam in sint modi accusamus quibusdam quo,
                laborum culpa provident neque voluptatibus minus, illum sed mollitia
                dolor. Minima beatae aperiam quo. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Hic, quidem. Non, reprehenderit fugit id ratione
                possimus ipsa architecto temporibus doloribus? Eaque tenetur assumenda
                praesentium, eius minus ratione nemo. Optio, quas?
              </p>
            </div>

            <div className={styles.contacts}>
              <h4>Find out more</h4>
              <p>www.website.com</p>
            </div>
            <div></div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
