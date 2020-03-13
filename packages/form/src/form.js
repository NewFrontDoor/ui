/** @jsx jsx */
import React from 'react'; // eslint-disable-line no-unused-vars
import {Form, Field, useField, useForm} from 'react-final-form';
import PropTypes from 'prop-types';
import {
  Label,
  Textarea,
  Input,
  Checkbox,
  Button,
  Radio,
  Select,
  Grid,
  Box,
  Styled,
  Text,
  jsx
} from 'theme-ui';

const Error = ({name}) => {
  const {
    meta: {touched, error}
  } = useField(name, {subscription: {touched: true, error: true}});
  return touched && error ? (
    <Text variant="warning" mb={2}>
      {error}
    </Text>
  ) : null;
};

Error.propTypes = {
  name: PropTypes.string.isRequired
};

const handleReset = (e, form) => {
  e.preventDefault();
  form.reset();
};

const getFormField = (field, form) => {
  switch (field.input) {
    case 'textarea':
      return (
        <Field key={field.id} name={field.id} placeholder={field.placeholder}>
          {({input, ...otherProps}) => (
            <div key={field.id + field.label} sx={{gridColumn: '1/3'}}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Textarea id={field.id} {...input} {...otherProps} rows="8" />
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'select':
      return (
        <Field key={field.id} name={field.id}>
          {({input, ...otherProps}) => (
            <div key={field.id + field.label}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Select id={field.id} {...input} {...otherProps}>
                {field.values.map(value => (
                  <option key={field.id + value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'radio':
      return (
        <fieldset key={field.id}>
          <legend sx={{gridColumn: '1/3'}}>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id + value}>
              <label
                key={value}
                sx={{
                  boxSizing: 'border-box',
                  minWidth: '0px',
                  width: '100%',
                  display: 'flex',
                  margin: '0px'
                }}
              >
                <Field
                  name={field.id}
                  type="radio"
                  value={value}
                  component={({input, ...otherProps}) => (
                    <Radio {...input} {...otherProps} />
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
          {({input, ...otherProps}) => (
            <div key={field.id + field.label}>
              <Checkbox
                type="checkbox"
                id={field.id}
                {...input}
                {...otherProps}
              />
              <Label sx={{display: 'inline'}} htmlFor={field.id}>
                {field.label}
              </Label>
              <Error name={field.id} />
            </div>
          )}
        </Field>
      );
    case 'reset':
      return (
        <Button
          sx={{gridColumn: field.fullwidth ? '1/3' : ''}}
          type={field.input}
          id={field.id}
          onClick={e => handleReset(e, form)}
        >
          {field.label}
        </Button>
      );
    default:
      return (
        <Field key={field.id} name={field.id} placeholder={field.placeholder}>
          {({input, ...otherProps}) => (
            <div key={field.id + field.label}>
              <Label htmlFor={field.id} required={field.required}>
                {field.label}
                {field.required && <strong>*</strong>}
              </Label>
              <Input
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

const FormComponent = ({
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
      render={({handleSubmit, form, submitting, pristine}) => {
        return (
          <Box as="form" id={id} onSubmit={handleSubmit}>
            <fieldset>
              {title && <Styled.h2>{title}</Styled.h2>}
              {description && blockText ? (
                blockText(description)
              ) : (
                <Styled.p>{description}</Styled.p>
              )}
              <Grid gap={20} columns={['1fr, 1fr']}>
                {fields.map(field => {
                  return getFormField(field, form);
                })}
                <Button
                  sx={{gridColumn: '1/3'}}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Submit
                </Button>
              </Grid>
            </fieldset>
          </Box>
        );
      }}
      validate={validationFn}
      initialValues={fields.reduce((obj, field) => {
        if (field.initialValue) obj[field.id] = field.initialValue;
        return obj;
      }, {})}
      onSubmit={submitForm}
    />
  );
};

FormComponent.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  blockText: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  validationFn: PropTypes.func
};

export default FormComponent;
export {getFormField};
