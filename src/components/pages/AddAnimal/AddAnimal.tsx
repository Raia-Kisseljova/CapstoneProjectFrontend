import { ErrorMessage } from '@hookform/error-message';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router';

import { axios } from 'api';
import ButtonCustom from 'components/shared/Button/ButtonCustom';
import Loader from 'components/shared/Loaders/Loader';
import useCurrentUser from 'hooks/useCurrentUser';
import { Role, TAnimal } from 'types';
import { getProfilePath } from 'utils';

// import { useHistory } from 'react-router';
import styles from './AddAnimal.module.css';

type AddAnimalFormData = Omit<TAnimal, '_id'> & { files: File[] };

export default function AddAnimal() {
  const history = useHistory();
  const { user } = useCurrentUser();

  /*   const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        console.log(files);
        for (let i = 0; i < files.length; i++) {
          const data = new FormData();
          data.append('animalPics', files[i]);
          axios.post('upload', data).then(res => res.data)
          console.log('uploaded', files[i].name);
        }
      }
    }; */

  /* let arr = [1, 2, 3, 4, 5];
  let doubleArr = arr.map(n => n * 2); */

  const onSubmit = async (data: AddAnimalFormData) => {
    const { files, ...jsonData } = data;

    try {
      const res = await axios.post<TAnimal>('animal', jsonData, {
        // headers: { authorization: `Bearer ` + localStorage.getItem('accessToken') },
      });
      const fd = new FormData();
      for (const file of files) {
        fd.append('animalPics', file, file.name);
      }
      await axios.post(`animal/${res.data._id}/upload`, fd, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      history.push(`/animal/${res.data._id}`);
    } catch (err) {
      //
    }
  };

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm<AddAnimalFormData>();
  // const history = useHistory();

  if (user === undefined) {
    return <Loader />;
  }

  if (user === null) {
    return <Redirect to={'/login'} />;
  }

  if (user.role !== Role.ORGANISATION) {
    return <Redirect to={getProfilePath(user)} />;
  }

  return (
    <Container fluid={true} className={styles.body}>
      <Row>
        <Col>
          <img src='/assets/images/9.png' alt='' width='25%' className={styles.before} />
          <img src='/assets/images/12.png' alt='' width='30%' className={styles.after} />
          <div className={styles.relative}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.frame}>
              {/* PET NAME --TEXT*/}

              <label htmlFor='name'>Pet name </label>
              <input
                type='text'
                placeholder='name'
                id='name'
                {...register('petName', {
                  required: 'This field is required.',
                  maxLength: {
                    value: 140,
                    message: 'This field is too long. Max 140 characters. ',
                  },
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='petName' as='span' />

              {/* TYPE --SELECT*/}

              <label htmlFor='type'>Type </label>
              <select id='type' {...register('type')}>
                <option value='cat'>Cat</option>
                <option value='dog'>Dog</option>
                <option value='bird'>Bird</option>
                <option value='rodent'>Rodent</option>
                {/* <option value='other'>Other</option> */}
              </select>
              <br />

              {/* BREED --TEXT*/}

              <label htmlFor='breed'>Breed : </label>
              <input type='text' placeholder='breed' id='breed' {...register('breed')} />
              <br />
              <ErrorMessage errors={errors} name='breed' as='p' />

              {/* LOCATION --TEXT*/}

              <label htmlFor='location'>City </label>
              <input
                type='text'
                placeholder='city'
                id='city'
                {...register('location', {
                  required: 'This field is required.',
                  maxLength: {
                    value: 140,
                    message: 'This field is too long. Max 140 characters. ',
                  },
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='location' as='p' />

              {/* DATE OF BIRTH --DATE*/}

              <label htmlFor='dateOfBirth'>Date of birth </label>
              <input
                type='date'
                placeholder='dateOfBirth'
                id='dateOfBirth'
                {...register('dateOfBirth')}
              />
              <br />
              <ErrorMessage errors={errors} name='dateOfBirth' as='p' />

              {/* GENDER --SELECT*/}

              <label htmlFor='gender'>Gender</label>
              <select id='gender' {...register('gender')}>
                <option value='male'>Boy</option>
                <option value='female'>Girl</option>
              </select>
              <br />

              {/* DESCRIPTION --TEXT*/}

              <label htmlFor='description'>Description </label>
              <textarea
                placeholder='about'
                id='description'
                {...register('description', {
                  required: 'This field is required.',
                  minLength: {
                    value: 55,
                    message: 'This field is too short. Min 55 characters. ',
                  },
                })}
              />
              <br />
              <ErrorMessage errors={errors} name='description' as='p' />

              {/* CAN LIVE WITH PETS --CHECKBOX*/}
              <div className={styles.checkboxes}>
                <div>
                  <input
                    type='checkbox'
                    id='canLiveWithPets'
                    {...register('canLiveWithPets')}
                  />
                  <label htmlFor='canLiveWithPets'>
                    <span>Can live with other animals</span>
                  </label>
                </div>

                {/* CAN LIVE WITH CHILDREN --CHECKBOX*/}

                <div>
                  <label htmlFor='canLiveWithChildren'>
                    {' '}
                    <input
                      type='checkbox'
                      id='canLiveWithChildren'
                      {...register('canLiveWithChildren')}
                    />
                    <span>Can live with children</span>
                  </label>
                </div>

                {/* INDOOR ONLY --CHECKBOX*/}

                <div>
                  <label htmlFor='indoor'>
                    {' '}
                    <input type='checkbox' id='indoor' {...register('indoorOnly')} />
                    <span>Indoor only</span>
                  </label>
                </div>
              </div>
              {/* IMAGES --UPLOAD*/}

              <div>
                <label htmlFor='files'>
                  <input
                    id='files'
                    type='file'
                    multiple
                    {...register('files', {
                      required: 'At least 1 image is required',
                      validate: files => {
                        for (const file of files) {
                          if (file.size > 2 * 1024 * 1024) {
                            return 'File is too big. Max is 2MB.';
                          }
                        }
                        return true;
                      },
                    })}
                    className={styles['custom-upload']}
                  />
                </label>
                <ErrorMessage errors={errors} name='files' as='p' />
                <br />
              </div>

              {/* <div className={styles['file-upload']}>
                <label htmlFor='img-array' className={styles['img-label']}>
                  Attach images
                </label>
                <br />
                <input type='file' id='img-array' className={styles.upload} />
              </div><br /> */}

              <ButtonCustom color='pink' className={styles.wbtn}>
                {isSubmitting ? 'Creating...' : 'Create'}
              </ButtonCustom>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
