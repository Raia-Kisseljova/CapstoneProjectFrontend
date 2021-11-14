import { AxiosError } from 'axios';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { axios } from 'api';
import Loader from 'components/shared/Loaders/Loader';
import { TOrganisation } from 'types';

import styles from './OrganisationProfile.module.css';

export default function OrganisationProfile() {
  const { name } = useParams() as { name: string };

  const organisationQuery = useQuery<TOrganisation, AxiosError>(
    ['ORGANISATION_DETAIL', name],
    () => axios.get(`/organisation/${name}`).then(res => res.data)
  );

  if (organisationQuery.isLoading) {
    return <Loader />;
  }

  if (organisationQuery.isError) {
    organisationQuery.error;
    return <div>Not Found</div>;
  }

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
              <p>{organisationQuery.data?.about}</p>
            </div>

            <div className={styles.contacts}>
              <h4>Find out more</h4>
              <p>{organisationQuery.data?.website}</p>
            </div>
            <div></div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
