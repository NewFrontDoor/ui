import React from 'react';
import Form from '../src';

const props = {
  title: 'Test Form',
  id: 'test',
  description: 'This is a test form so you can test out the form builder',
  fields: [
    {
      id: 'name',
      input: 'text',
      label: 'Name',
      required: true
    },
    {
      id: 'mobile',
      input: 'telephone',
      label: 'Mobile',
      required: true
    },
    {
      id: 'opt',
      input: 'radio',
      label: 'Options',
      required: false,
      values: ['first', 'second', 'third'],
      length: 3
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
      required: false
    },
    {
      id: 'reset',
      input: 'reset',
      value: 'Reset'
    },
    {
      id: 'submit',
      input: 'submit',
      value: 'Submit'
    },
    {
      id: 'extrabutton',
      input: 'reset',
      value: 'Extra button',
      fullwidth: true
    }
  ],
  blockText: value => <p>{value}</p>,
  submitForm: e => {
    console.log('Submitted!');
    e.preventDefault();
  },
  validations: values => {
    const errors = {};
    console.log(Object.keys(values)[0]);
    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.textarea) {
      errors.textarea = 'Required';
    }

    if (!values.mobile) {
      errors.phone = 'Required';
    } else if (isNaN(values.mobile)) {
      errors.mobile = 'Must be a number';
    } else if (!/(04+)\w+/.test(values.mobile)) {
      errors.mobile = "Doesn't start with 04...";
    }

    return errors;
  }
};

export default <Form {...props} />;
