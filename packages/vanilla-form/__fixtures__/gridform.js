import React from 'react';
import {VanillaForm, validation} from '../src';

const props = {
  title: 'Test Form',
  id: 'test',
  description: 'This is a test form so you can test out the form builder',
  data: {
    fields: [
      {
        id: 'name',
        input: 'text',
        label: 'Name',
        required: true,
        placeholder: 'Miss Piggy'
      },
      {
        id: 'mobile',
        input: 'telephone',
        label: 'Mobile',
        required: false,
        validation: {
          validationType: 'default',
          warning: 'you need to put in a mobile'
        },
        placeholder: '04********'
      },
      {
        id: 'opt',
        input: 'radio',
        label: 'Options',
        required: false,
        values: ['first', 'second', 'third'],
        length: 3,
        initialValue: 'second'
      },
      {
        id: 'opt2',
        input: 'select',
        label: 'More options',
        required: false,
        values: ['Select1', 'Select2', 'Select3']
      },
      {
        id: 'textarea',
        input: 'textarea',
        label: 'Describe how you find this form',
        required: false,
        placeholder: 'Do you find it well?'
      },
      {
        id: 'reset',
        input: 'reset',
        label: 'Reset me!'
      },
      {
        id: 'reset',
        input: 'reset',
        label: 'Reset me again!'
      }
    ],
    requiredError: "it's required yo!"
  }
};

export default (
  <VanillaForm
    {...props}
    fields={props.data.fields}
    validationFn={values => validation(values, props.data)}
    submitForm={formValues => {
      console.log('Submitted!');
      console.log(formValues);
    }}
  />
);
