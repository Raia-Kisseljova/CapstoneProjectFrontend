import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Animation from 'components/shared/Animations/Animation';
import useCurrentUser from 'hooks/useCurrentUser';
import { Role } from 'types';

import styles from './Home.module.css';

export default function Home() {
  const { user } = useCurrentUser();

  return (
    // BLOCK 1
    <>
      <div>
        <Animation />

        <Container fluid={true}>
          <Row>
            <Col className={styles['block-1-test']}>
              <img
                src='/assets/images/Shelter.png'
                alt=''
                className={styles['shelter-img']}
              />
              <p>
                Find your new <span>family</span> member.
              </p>

              <p className={styles['sub-title-test']}>
                Be a proud foster parent. Adopt your new family member today.
              </p>
              <div>
                <Link to='/search'>
                  <button className='search-btn'>Search</button>
                </Link>
                {user && user.role === Role.ORGANISATION && (
                  <Link to='/add-animal'>
                    <button className='post-btn'>Post</button>
                  </Link>
                )}
              </div>
            </Col>
          </Row>
        </Container>
        {/* <Container fluid className={styles['block-1']}>
          <Row className='mx-3'>
            <Col className={styles['header-block-1']}>
              <p>
                Find your new <span>family</span> member.
              </p>
            </Col>
            <Col>
              <img
                src='/assets/images/Shelter.png'
                alt=''
                className={styles['shelter-img']}
              />
            </Col>
          </Row>
        </Container> */}

        {/* <Container fluid>
          <Row>
            <Col className={styles['section-2']}>
              <p>Be a proud foster parent.Adopt your new family member today.</p>

              {user && user.role === Role.ORGANISATION && (

                <Link to="/add-animal">
                  <button className='post-btn mr-5'>Post</button>
                </Link>
              )}


              <Link to='/search'>
                <button className='search-btn'>Search</button>
              </Link>
            </Col>
          </Row>
        </Container> */}

        {/* BLOCK 2 */}

        {/* <Container fluid className={styles['block-2']}>
          <Row className='mx-3'>
            <Col>
              <p>
                Where pets turn out to be a <span>family.</span>
              </p>
              <p className={styles['sub-title']}>
                Unconditional love is as close as your nearest shelter.
              </p>
              <label>
                <input
                  type='text'
                  placeholder='City'
                  className={styles['search-field']}
                />
                <button className={styles['search-btn-group']}>Search</button>
              </label>

              <img src='/assets/images/6.png' alt='' width={'170px'} />
            </Col>
          </Row>
        </Container>

        BLOCK 3 */}

        {/* <Container fluid className={styles['block-3']}>
          <Row className='mx-3'>
            <Col>
              <p>
                Find inside <span>successful</span> stories.
              </p>
              <p className={styles['sub-title']}>
                Successful stories from people who adopted.
              </p>
            </Col>
          </Row>
          <Row>
            Space for blogs
          </Row>
        </Container> */}
      </div>
    </>
  );
}
