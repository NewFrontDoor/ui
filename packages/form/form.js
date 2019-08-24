import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import FormGrid from './form-grid';

const RadioGroup = styled('fieldset')`
  input {
    width: initial;
  }
  label {
    display: inline;
    margin-left: 10px;
    padding-bottom: 0px;
  }
`;

function getFormField(field) {
  switch (field.input) {
    case 'textarea':
      return (
        <div className="fullwidth">
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
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>
      );
    case 'radio':
      return (
        <RadioGroup>
          <legend>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id}>
              <input type="radio" id={value} name={field.id} value={value} />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </RadioGroup>
      );
    case 'checkbox':
      return (
        <div>
          <input type="checkbox" id={field.id} name={field.label} />
          <label className="inline" htmlFor={field.id}>
            {field.label}
          </label>
        </div>
      );
    case 'submit':
    case 'reset':
        return <input className={field.fullwidth ? 'fullwidth' : ''} type={field.input} id={field.id} value={field.value} />
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
}

export default function Form({title, id, description, fields}) {
  return (
    <form id={id}>
      <fieldset>
        <h2>{title}</h2>
        <p>{description}</p>
        <FormGrid>
          {fields.map(field => {
            return getFormField(field);
          })}
        </FormGrid>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
};
