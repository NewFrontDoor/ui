import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Grid = styled('section')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  input:focus,
  textarea:focus {
    outline: 3px solid gold;
  }

  label {
    display: block;
    grid-column: 1 / 2;
    padding-bottom: 5px;
  }
  input,
  textarea,
  select,
  button {
    width: 100%;
    box-sizing: border-box;
  }
  .fullwidth {
    grid-column: 1 / 3;
  }
  .inline {
    display: inline;
  }
`;

const RadioGrid = styled('fieldset')`
  input {
    width: initial;
  }
  label {
    display: inline;
    margin-left: 10px;
    padding-bottom: 0px;
  }
  legend {
    grid-column: 1 / 3;
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
        <RadioGrid>
          <legend>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id}>
              <input type="radio" id={value} name={field.id} value={value} />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
        </RadioGrid>
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
        <Grid>
          {fields.map(field => {
            return getFormField(field);
          })}
        </Grid>
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
