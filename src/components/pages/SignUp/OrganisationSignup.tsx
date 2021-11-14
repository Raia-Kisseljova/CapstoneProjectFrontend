import { ErrorMessage } from '@hookform/error-message';
import debouncePromise from 'awesome-debounce-promise';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import { axios } from 'api';
import ButtonCustom from 'components/shared/Button';

import styles from './OrganisationSignup.module.css';

type OrganisationSignUpFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  location: string;
  about: string;
  website: string;
};

export default function OrganisationSignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrganisationSignUpFormData>();
  const password = watch('password');
  const history = useHistory();

  const onSubmit = async (data: OrganisationSignUpFormData) => {
    // console.log(data);

    await axios.post('/signup/organisation', data);
    history.push('/login');
  };

  return (
    <Container fluid className={styles.body}>
      <Row>
        <Col>
          <div className={styles.frame}>
            <img
              src='/assets/images/11.png'
              width='30%'
              alt=''
              className={styles.before}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor='name'>Organisation name *</label>
              <br />
              <input
                type='text'
                placeholder='name'
                id='name'
                {...register('name', {
                  required: 'This field is required.',
                  maxLength: {
                    value: 140,
                    message: 'This field is too long. Max 140 characters. ',
                  },
                  validate: debouncePromise(validateName, 500),
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='name' as='p' />

              <label htmlFor='email'>Email *</label>
              <br />
              <input
                type='text'
                placeholder='email'
                id='email'
                {...register('email', {
                  required: 'This field is required.',
                  maxLength: 255,
                  validate: debouncePromise(validateEmail, 500),
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='email' as='p' />

              <label htmlFor='password'>Password *</label>
              <br />
              <input
                type='password'
                placeholder='password'
                id='password'
                {...register('password', {
                  required: 'This field is required.',
                  minLength: 8,
                  maxLength: 100,
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='password' as='p' />

              <label htmlFor='passwordConf'>Password confirm *</label>
              <br />
              <input
                type='password'
                placeholder='password confirm'
                id='passwordConf'
                {...register('passwordConfirm', {
                  required: 'This field is required.',
                  minLength: 8,
                  maxLength: 100,
                  validate: value => {
                    return value === password || 'Passwords do not match';
                  },
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='passwordConfirm' as='p' />

              <label htmlFor='city'>City</label>
              <br />
              <input
                type='text'
                placeholder='City'
                id='city'
                {...register('location', {
                  required: 'This field is required',
                  maxLength: 100,
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='location' as='p' />

              <label htmlFor='website'>Website</label>
              <br />
              <input
                type='text'
                placeholder='website'
                id='website'
                {...register('website', { maxLength: 255 })}
              />
              <br />
              <ErrorMessage errors={errors} name='website' as='p' />

              <label htmlFor='about'>Description</label>
              <br />
              <input
                type='text'
                placeholder='description'
                id='about'
                {...register('about')}
              />
              <br />
              <ErrorMessage errors={errors} name='about' as='p' />

              <div className={styles['file-upload']}>
                <label htmlFor='avatar' className={styles['avatar-label']}>
                  Avatar
                </label>
                <br />
                <input type='file' id='avatar' className={styles.upload} />
              </div>

              <ButtonCustom color='pink' className='w-100'>
                Sign up
              </ButtonCustom>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

async function validateEmail(value: string) {
  const res = await axios.get('user/is_unique', { params: { email: value } });
  return res.data.email === true || 'Email already exists';
}

async function validateName(value: string) {
  const res = await axios.get('user/is_unique', { params: { name: value } });
  return res.data.name === true || 'Name already exists';
}
