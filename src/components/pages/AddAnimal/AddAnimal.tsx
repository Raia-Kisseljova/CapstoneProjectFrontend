import { ErrorMessage } from "@hookform/error-message";
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import styles from './AddAnimal.module.css';



type AddAnimalFormData = {
  petName: string;
  type: string;
  breed: string;
  location: string;
  dateOfBirth: string;
  gender: string;
  about: string;
  images: string[];
  canLiveWithPets: boolean;
  canLiveWithChildren: boolean;
  indoorOnly: boolean;
};

export default function AddAnimal() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AddAnimalFormData>();
  const history = useHistory()

  return (
    <Container className={styles.body}>
      <Row>
        <Col>
          <div >
            <form className={styles.frame}>
              {/* PET NAME --TEXT*/}

              <label htmlFor="name">Pet name : </label>
              <input type="text" placeholder="name" id="name" {...register('petName',
                {
                  required: 'This field is required.',
                  maxLength: { value: 140, message: 'This field is too long. Max 140 characters. ' }
                })} />
              <ErrorMessage errors={errors} name="petName" as="p" />


              {/* TYPE --SELECT*/}
              <label htmlFor="type">Type </label>
              <select name="type" id="type">
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="bird">Bird</option>
                <option value="rodent">Rodent</option>
                <option value="other">Other</option>
              </select>

              {/* BREED --TEXT*/}

              <label htmlFor="breed">Breed : </label>
              <input type="text" placeholder="breed" id="breed" {...register('breed',
                {
                  required: 'This field is required.',
                  maxLength: { value: 140, message: 'This field is too long. Max 140 characters. ' }
                })} />
              <ErrorMessage errors={errors} name="breed" as="p" />

              {/* LOCATION --TEXT*/}

              <label htmlFor="location">City :  </label>
              <input type="text" placeholder="city" id="city" {...register('location',
                {
                  required: 'This field is required.',
                  maxLength: { value: 140, message: 'This field is too long. Max 140 characters. ' }
                })} />
              <ErrorMessage errors={errors} name="location" as="p" />


              {/* DATEOFBIRTH --DATE*/}

              <label htmlFor="dateOfBirth">Date of birth :  </label>
              <input type="date" placeholder="dateOfBirth" id="dateOfBirth" {...register('dateOfBirth', {})} />
              <ErrorMessage errors={errors} name="dateOfBirth" as="p" />


              {/* GENDER --SELECT*/}

              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender">
                <option value="cat">Good boy</option>
                <option value="dog">Beautiful girl</option>
              </select>

              {/* DESCRIPTION --TEXT*/}

              <label htmlFor="about">Description  </label>
              <textarea placeholder="about" id="about" {...register('location',
                {
                  required: 'This field is required.',
                  maxLength: { value: 140, message: 'This field is too long. Max 140 characters. ' }
                })} />
              <ErrorMessage errors={errors} name="location" as="p" />


              {/* CANLIVEWITHPETS --CHECKBOX*/}
              <div>
                <input type="checkbox" id="canLiveWithPets" name="canLiveWithPets" />
                <label htmlFor="canLiveWithPets">Can live with other animals</label>
              </div>

              {/* CANLIVEWITHCHILDREN --CHECKBOX*/}

              <div>
                <input type="checkbox" id="canLiveWithChildren" name="canLiveWithChildren" />
                <label htmlFor="canLiveWithChildren">Can live with children</label>
              </div>

              {/* INDOORONLY --CHECKBOX*/}

              <div>
                <input type="checkbox" id="indoor" name="indoorOnly" />
                <label htmlFor="indoor">Indor only</label>
              </div>


              {/* IMAGES --UPLOAD*/}

              <div className={styles['file-upload']}>
                <label htmlFor="imgarray" className={styles.imglabel}>Attach images</label>
                <br />
                <input type="file" id="imgarray" className={styles.upload} />
              </div>




















            </form>

          </div>
        </Col>
      </Row>

    </Container>
  )
}
