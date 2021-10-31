import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './Home.module.css';


export default function Home() {
  return (
    // BLOCK 1
    <div>
      <Container className={styles['block-1']}>
        <Row className="mx-3">

          <Col className={styles["header-block-1"]} >

            <p>Find your new <span>family</span> member.</p>

          </Col>
          <Col >
            <img src="/assets/images/Shelter.png" alt="" className={styles["shelter-img"]} />
          </Col>

        </Row>
      </Container>

      <Container>
        <Row className="mx-3">
          <Col className={styles['section-2']}>
            <p>Be a proud foster parent. Adopt your new family member today.</p>
            <button className='post-btn'>Post</button>
            <button className='search-btn'>Search</button>
          </Col>
        </Row>

      </Container>

      {/* BLOCK 2 */}

      <Container className={styles['block-2']}>
        <Row className="mx-3">
          <Col>
            <p>Where pets turn out to be a <span>family.</span></p>
            <p className={styles['sub-title']}>Unconditional love is as close as your nearest shelter.</p>
            <label>
              <input type="text" placeholder="City" className={styles['search-field']} />
              <button className='search-btn-group'>Search</button>
            </label>
          </Col>
        </Row>
      </Container>



      {/* BLOCK 3 */}

      <Container className={styles['block-3']}>
        <Row className="mx-3">
          <Col>
            <p>Find inside <span>succesfull</span> stories.</p>
            <p className={styles['sub-title']}>
              Succesfull stories from people who adopted.
            </p>
          </Col>
        </Row>
        <Row>
          {/* Space for blogs */}
        </Row>
      </Container>
    </div >
  )
}
