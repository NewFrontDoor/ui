import React from 'react';
import {Form} from '../src';

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
      required: true,
      regex: {
        regexString: /(04+)\d+/,
        warning: "Doesn't start with '04'"
      }
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
    props.fields.forEach(field => {
      const rg = field.regex && field.regex.regexString
        ? new RegExp(field.regex.regexString, 'i')
        : false;
      if (field.required) {
        if (!values[field.id]) {
          errors[field.id] = 'Required';
        } else if (rg && !rg.test(values[field.id])) {
          errors[field.id] = field.regex.warning;
        }
      } else if (rg && values[field.id] && !rg.test(values[field.id])) {
        errors[field.id] = field.regex.warning;
      }
    });
    return errors;
  }
};

export default <Form {...props} />;
