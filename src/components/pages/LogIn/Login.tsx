import { ErrorMessage } from '@hookform/error-message';
import decode from 'jwt-decode';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Link, Redirect, useHistory } from 'react-router-dom';

import { axios, isAxiosError } from 'api';
import ButtonCustom from 'components/shared/Button';
import useCurrentUser from 'hooks/useCurrentUser';
import { Role, TTokenPayload } from 'types';
import { getProfilePath } from 'utils';

import styles from './Login.module.css';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // To display server authorization errors.
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post('login', data);

      // login.
      const { nickname, role } = decode(res.data.accessToken) as TTokenPayload;
      localStorage.setItem('accessToken', res.data.accessToken);

      let res2;
      if (role === Role.USER) {
        res2 = await axios.get(`user/by_name/${nickname}`);
      } else {
        res2 = await axios.get(`organisation/${nickname}`);
      }
      queryClient.setQueryData('CURRENT_USER', res2.data);

      // redirect to profile.
      history.push(role === Role.USER ? `users/${nickname}` : `organisation/${nickname}`);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        const { data } = err.response;
        if (data.message) {
          setError(data.message);
        }
      }
    }
  };

  if (user) {
    return <Redirect to={getProfilePath(user)} />;
  }

  // setTimeout(() => {
  //   setIsLoading(false);
  // }, 1000);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Container fluid className={styles.body}>
        <Row>
          <Col>
            <div className={styles['video-part']}>
              <video loop autoPlay muted>
                <source src='assets/images/videoLogin2.mp4' type='video/mp4' />
              </video>
            </div>
          </Col>
          <Col>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.form}>
                <h4>Login to your account.</h4>
                {error}
                <input
                  type='text'
                  placeholder='email'
                  {...register('email', { required: 'This field is required.' })}
                />
                <ErrorMessage errors={errors} name='email' as='p' />

                <input
                  type='password'
                  placeholder='password'
                  {...register('password', { required: 'This field is required.' })}
                />
                <ErrorMessage errors={errors} name='password' as='p' />

                <div>
                  <ButtonCustom color='blue' className='mr-4'>
                    Log in
                  </ButtonCustom>
                  <Link to='/signup'>
                    <ButtonCustom color='pink' className=''>
                      Sign up
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
