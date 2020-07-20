import React from 'react';
import {Form, validation} from '../src';

const Success = () => (
  <div>
    <p>Thanks for your submission. We'll get back to you as soon as we can.</p>
  </div>
);

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
        id: 'opt3',
        input: 'checkbox',
        label: 'Options',
        required: false,
        values: ['first', 'second', 'third'],
        length: 3
      },
      {
        id: 'opt4',
        input: 'checkbox',
        label: 'Single choice',
        required: false
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
      },
      {
        id: 'testing',
        input: 'field-array',
        label: 'Time for some field arrays',
        childLabel: 'Family member',
        required: false,
        childFields: [
          {
            id: 'name',
            input: 'text',
            label: 'Name',
            placeholder: 'Kermit'
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
          }
        ]
      }
    ],
    requiredError: "it's required yo!"
  }
};

export default (
  <Form
    {...props}
    fields={props.data.fields}
    validationFn={values => validation(values, props.data)}
    submitForm={formValues => {
      console.log('Submitted!');
      console.log(formValues);
    }}
    success={<Success />}
  />
);
