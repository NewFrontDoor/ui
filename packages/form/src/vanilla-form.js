import React from 'react';
import {Form, Field, useField} from 'react-final-form';
import PropTypes from 'prop-types';

const Error = ({name}) => {
  const {
    meta: {touched, error}
  } = useField(name, {subscription: {touched: true, error: true}});
  return touched && error ? <p>{error}</p> : null;
};

Error.propTypes = {
  name: PropTypes.string.isRequired
};

const getVanillaFormField = field => {
  switch (field.input) {
    case 'textarea':
      return (
        <Field name={field.id}>
          {({input}) => (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <textarea id={field.id} {...input} rows="8" />
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'select':
      return (
        <Field name={field.id}>
          {({input}) => (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <select id={field.id} {...input}>
                {field.values.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'radio':
      return (
        <fieldset key={field.label}>
          <legend>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id}>
              <label key={value}>
                <Field
                  name={field.id}
                  type="radio"
                  value={value}
                  component={({input}) => <radio {...input} />}
                />
                {value}
              </label>
            </div>
          ))}
        </fieldset>
      );
    case 'checkbox':
      return (
        <Field name={field.id}>
          {({input}) => (
            <div key={field.label}>
              <checkbox type="checkbox" id={field.id} {...input} />
              <label htmlFor={field.id}>{field.label}</label>
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'reset':
      return (
        <Field name={field.id}>
          {({input}) => (
            <div key={field.label}>
              <input type={field.input} id={field.id} {...input} />
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    default:
      return (
        <Field name={field.id}>
          {({input}) => (
            <div key={field.id}>
              <label htmlFor={field.id} required={field.required}>
                {field.label}
                {field.required && <strong>*</strong>}
              </label>
              <input type={field.input} id={field.id} {...input} />
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
  }
};

const VanillaFormComponent = ({
  title,
  id,
  description,
  fields,
  blockText,
  submitForm,
  validationFn
}) => {
  return (
    <Form
      render={({handleSubmit}) => (
        <form id={id} onSubmit={handleSubmit}>
          <fieldset>
            {title && <h2>{title}</h2>}
            {description && blockText ? (
              blockText(description)
            ) : (
              <p>{description}</p>
            )}
            <div>
              {fields.map(field => {
                return getVanillaFormField(field);
              })}
              <button type="submit">Submit</button>
            </div>
          </fieldset>
        </form>
      )}
      validate={validationFn}
      onSubmit={submitForm}
    />
  );
};

VanillaFormComponent.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  blockText: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  validationFn: PropTypes.func
};

export default VanillaFormComponent;
export {getVanillaFormField};
