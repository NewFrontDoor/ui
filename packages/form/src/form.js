/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import FormGrid from './form-grid';
import {Styled, Box, Button, jsx} from 'theme-ui';

const getFormField = field => {
  switch (field.input) {
    case 'textarea':
      return (
        <div sx={{gridColumn: '1/3'}}>
          <label htmlFor={field.id}>{field.label}</label>
          <textarea id={field.id} name={field.label} />
        </div>
      );
    case 'select':
      return (
        <div>
          <label htmlFor={field.id}>{field.label}</label>
          <select id={field.id} name={field.label}>
            {field.values.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      );
    case 'radio':
      return (
        <fieldset
          sx={{
            input: {
              width: 'initial'
            },
            label: {
              display: 'inline',
              marginLeft: '10px',
              paddingBottom: '0px'
            }
          }}
        >
          <legend>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id}>
              <input type="radio" id={value} name={field.id} value={value} />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </fieldset>
      );
    case 'checkbox':
      return (
        <div>
          <input type="checkbox" id={field.id} name={field.label} />
          <label sx={{display: 'inline'}} htmlFor={field.id}>
            {field.label}
          </label>
        </div>
      );
    case 'submit':
      return (
        <Button sx={{gridColumn: '1/3'}} type="submit" value="submit">
          Submit
        </Button>
      );
    case 'reset':
      return (
        <input
          sx={{gridColumn: field.fullwidth ? '1/3' : ''}}
          type={field.input}
          id={field.id}
          value={field.value}
        />
      );
    default:
      return (
        <div>
          <label htmlFor={field.id} required={field.required}>
            {field.label}
            {field.required ? <strong>*</strong> : ''}
          </label>
          <input type={field.input} id={field.id} name={field.label} />
        </div>
      );
  }
};

const Form = ({title, id, description, fields}) => {
  return (
    <Box as="form" id={id}>
      <fieldset>
        <Styled.h2>{title}</Styled.h2>
        <Styled.p>{description}</Styled.p>
        <FormGrid>
          {fields.map(field => {
            return getFormField(field);
          })}
        </FormGrid>
      </fieldset>
    </Box>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
};

export default Form;
