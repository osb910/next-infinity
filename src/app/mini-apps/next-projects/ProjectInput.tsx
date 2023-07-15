'use client';

import {useState, FormEvent} from 'react';
import styles from './ProjectInput.module.css';
import ky from 'ky';
import {getURL} from '@/utils/path';
import Spinner from '@/components/Spinner/Spinner';
import {IProject} from './Project.model';

interface Validatable {
  value: FormDataEntryValue | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (input: Validatable) => {
  let isValid = true;
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.minLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length >= input.minLength;
  }
  if (input.maxLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length <= input.maxLength;
  }
  if (input.min != null && typeof input.value === 'number') {
    isValid = isValid && +input.value >= input.min;
  }
  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && +input.value <= input.max;
  }
  return isValid;
};

interface ProjectInputProps {
  addProject: (project: IProject) => void;
}

const ProjectInput = ({addProject}: ProjectInputProps) => {
  const [submitting, setSubmitting] = useState(false);
  const submit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = [...new FormData(evt.currentTarget).entries()];
    const project = Object.fromEntries(formData);
    const {title, description, people} = project;
    const titleValidatable: Validatable = {
      value: title,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +people,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      setSubmitting(true);
      const res = (await ky
        .post(getURL('/api/next-projects'), {
          json: {title, description, people: +people},
        })
        .json()) as IProject & {status: string};
      console.log(res);
      if (res.status === 'success') {
        evt.currentTarget?.reset();
        addProject({
          _id: res._id?.toString(),
          title: res.title,
          description: res.description,
          people: +people,
        });
      }
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className={styles.userInput}>
      <p className='form-control'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' name='title' />
      </p>
      <p className='form-control'>
        <label htmlFor='description'>Description</label>
        <textarea id='description' name='description' rows={3}></textarea>
      </p>
      <p className='form-control'>
        <label htmlFor='people'>People</label>
        <input
          type='number'
          id='people'
          name='people'
          step={1}
          min={0}
          max={10}
        />
      </p>
      <button type='submit' disabled={submitting}>
        ADD PROJECT {submitting && <Spinner />}
      </button>
    </form>
  );
};

export default ProjectInput;
