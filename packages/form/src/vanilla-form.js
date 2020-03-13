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

const handleReset = (e, form) => {
  e.preventDefault();
  form.reset();
};

const getVanillaFormField = (field, form) => {
  switch (field.input) {
    case 'textarea':
      return (
        <Field key={field.id} name={field.id} placeholder={field.placeholder}>
          {({input, otherProps}) => (
            <div key={field.id + field.label}>
              <label htmlFor={field.id}>{field.label}</label>
              <textarea id={field.id} {...input} {...otherProps} rows="8" />
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'select':
      return (
        <Field key={field.id} name={field.id}>
          {({input, otherProps}) => (
            <div key={field.id + field.label}>
              <label htmlFor={field.id}>{field.label}</label>
              <select id={field.id} {...input} {...otherProps}>
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
        <fieldset key={field.id}>
          <legend>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id + value}>
              <label key={value}>
                <Field
                  name={field.id}
                  type="radio"
                  value={value}
                  component={({input, otherProps}) => (
                    <radio {...input} {...otherProps} />
                  )}
                />
                {value}
              </label>
            </div>
          ))}
        </fieldset>
      );
    case 'checkbox':
      return (
        <Field key={field.id} name={field.id}>
          {({input, otherProps}) => (
            <div key={field.id + field.label}>
              <checkbox
                type="checkbox"
                id={field.id}
                {...input}
                {...otherProps}
              />
              <label htmlFor={field.id}>{field.label}</label>
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'reset':
      return (
        <button
          type="button"
          value="reset"
          id={field.id}
          onClick={e => handleReset(e, form)}
        >
          {field.label}
        </button>
      );
    default:
      return (
        <Field key={field.id} name={field.id}>
          {({input, otherProps}) => (
            <div key={field.id + field.label}>
              <label htmlFor={field.id} required={field.required}>
                {field.label}
                {field.required && <strong>*</strong>}
              </label>
              <input
                type={field.input}
                id={field.id}
                {...input}
                {...otherProps}
              />
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
      render={({handleSubmit, form, submitting, pristine}) => (
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
                return getVanillaFormField(field, form);
              })}
              <button type="submit"
                  disabled={submitting || pristine}>Submit</button>
            </div>
          </fieldset>
        </form>
      )}
      validate={validationFn}
      initialValues={fields.reduce((obj, field) => {
        if (field.initialValue) obj[field.id] = field.initialValue;
        return obj;
      }, {})}
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
