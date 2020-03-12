/** @jsx jsx */
import React from 'react';
import {Form, Field, useField} from 'react-final-form';
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

const getFormField = field => {
  switch (field.input) {
    case 'textarea':
      return (
        <Field name={field.id}>
          {({input}) => (
            <div key={field.id} sx={{gridColumn: '1/3'}}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Textarea id={field.id} {...input} rows="8" />
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
              <Label htmlFor={field.id}>{field.label}</Label>
              <Select id={field.id} {...input}>
                {field.values.map(value => (
                  <option key={value} value={value}>
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
        <fieldset key={field.label}>
          <legend sx={{gridColumn: '1/3'}}>{field.label}</legend>
          {field.values.map(value => (
            <div key={field.id}>
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
                  component={({input}) => <Radio {...input} />}
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
              <Checkbox type="checkbox" id={field.id} {...input} />
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
        <Field name={field.id}>
          {({input}) => (
            <div key={field.label}>
              <input
                sx={{gridColumn: field.fullwidth ? '1/3' : ''}}
                type={field.input}
                id={field.id}
                {...input}
              />
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
              <Label htmlFor={field.id} required={field.required}>
                {field.label}
                {field.required && <strong>*</strong>}
              </Label>
              <Input type={field.input} id={field.id} {...input} />
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
  validations
}) => {
  return (
    <Form
      render={({handleSubmit}) => (
        <Box as="form" id={id} onSubmit={handleSubmit}>
          <fieldset>
            <Styled.h2>{title}</Styled.h2>
            {description && blockText(description)}
            <Grid gap={20} columns={['1fr, 1fr']}>
              {fields.map(field => {
                return getFormField(field);
              })}
              <Button sx={{gridColumn: '1/3'}} type="submit">
                Submit
              </Button>
            </Grid>
          </fieldset>
        </Box>
      )}
      validate={validations}
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
  validations: PropTypes.func
};

export default FormComponent;
