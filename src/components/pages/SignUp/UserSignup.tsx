import { ErrorMessage } from '@hookform/error-message';
import debouncePromise from 'awesome-debounce-promise';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import { axios } from 'api';

import ButtonCustom from '../../shared/Button/ButtonCustom';
import styles from './UserSignup.module.css';

type UserSignUpFormData = {
  fullname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  location: string;
  about: string;
  occupation: string;
  hobby: string;
  dateOfBirth: Date;
};

export default function UserSignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserSignUpFormData>();
  const password = watch('password');
  const history = useHistory();

  const onSubmit = async (data: UserSignUpFormData) => {
    await axios.post('/signup/user', data);
    history.push('/login');
  };

  return (
    <Container fluid className={styles.body}>
      <Row>
        <Col>
          <div className={styles.frame}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor='name'>Fullname </label>
              <br />
              <input type='text' placeholder='name' id='name' {...register('fullname')} />
              <br />
              <ErrorMessage errors={errors} name='fullname' as='p' />

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
                  minLength: { value: 8, message: 'Min 8 characters' },
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

              <label htmlFor='city'>City *</label>
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

              <label htmlFor='nickname'>Nickname *</label>
              <br />
              <input
                type='text'
                placeholder='nickname'
                id='nickname'
                {...register('nickname', {
                  required: 'This field is required.',
                  maxLength: {
                    value: 100,
                    message: 'This field is too long. Max 100 characters.',
                  },
                  validate: debouncePromise(validateNickname, 500),
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='nickname' as='p' />

              <label htmlFor='about'>About you</label>
              <br />
              <input
                type='text'
                placeholder='description'
                id='about'
                {...register('about')}
              />
              <br />
              <ErrorMessage errors={errors} name='about' as='p' />

              <label htmlFor='hobby'>Hobby/interests</label>
              <br />
              <input type='text' placeholder='hobby' id='hobby' {...register('hobby')} />
              <br />
              <ErrorMessage errors={errors} name='hobby' as='p' />

              <label htmlFor='occupation'>Occupation</label>
              <br />
              <input
                type='text'
                placeholder='occupation'
                id='occupation'
                {...register('occupation')}
              />
              <br />
              <ErrorMessage errors={errors} name='occupation' as='p' />

              <label htmlFor='dob'>Date of birth</label>
              <br />
              <input
                type='date'
                placeholder='date of birth'
                id='dob'
                {...register('dateOfBirth')}
              />
              <br />
              <ErrorMessage errors={errors} name='dateOfBirth' as='p' />

              <div className={styles['file-upload']}>
                <label htmlFor='avatar' className={styles['avatar-label']}>
                  Avatar
                </label>
                <br />
                <input type='file' id='avatar' className={styles.upload} />
              </div>

              <ButtonCustom color='pink'>Sign Up</ButtonCustom>
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

async function validateNickname(value: string) {
  const res = await axios.get('user/is_unique', { params: { nickname: value } });
  return res.data.nickname === true || `User with nickname ${value} already exists`;
}
