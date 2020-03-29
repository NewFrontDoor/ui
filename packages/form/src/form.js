/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React from 'react'; // eslint-disable-line no-unused-vars
import {Form, Field, useField} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {FieldArray} from 'react-final-form-arrays';
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

const NestedForm = ({childFields, form, childLabel, name, fields, index}) => {
  return (
    <div key={name} sx={{gridColumn: '1/3'}}>
      <fieldset sx={{display: 'contents'}}>
        {childLabel && (
          <Styled.h4>
            {childLabel} {index + 1}
          </Styled.h4>
        )}
        {childFields.map(field => {
          return getFormField(field, form, name);
        })}
        <Button type="button" onClick={() => fields.remove(index)}>
          Remove
        </Button>
      </fieldset>
    </div>
  );
};

NestedForm.propTypes = {
  childFields: PropTypes.array.isRequired,
  form: PropTypes.any,
  name: PropTypes.string.isRequired,
  childLabel: PropTypes.string,
  fields: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired
};

const getFormField = (field, form, blockText, name = '') => {
  const {push, pop} = form.mutators;
  const width = field.styling && field.styling.fullWidth ? '1/3' : null;
  // This is a hack while Sanity doesn't enable initial values on array-level items
  if (field.childFields) field.input = 'field-array';

  switch (field.input) {
    case 'textarea':
      return (
        <Field
          key={field.id}
          name={name + field.id}
          placeholder={field.placeholder}
        >
          {({input, ...otherProps}) => (
            <div key={field.id + field.label} sx={{gridColumn: '1/3'}}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Textarea id={field.id} {...input} {...otherProps} rows="8" />
              <Error name={name + field.id} />
            </div>
          )}
        </Field>
      );
    case 'field-array':
      return (
        <Box sx={{gridColumn: '1/3'}}>
          {field.label && <Styled.h2>{field.label}</Styled.h2>}
          {field.description && blockText ? (
            blockText(field.description)
          ) : (
            <Styled.p>{field.description}</Styled.p>
          )}
          <Grid gap={20} columns={['1fr 1fr']}>
            <div sx={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Button
                type="button"
                sx={{width: '35%'}}
                onClick={() => push(name + field.id, undefined)}
              >
                Add
              </Button>
              <Button
                type="button"
                sx={{width: '35%'}}
                onClick={() => pop(name + field.id, undefined)}
              >
                Remove
              </Button>
            </div>
            <FieldArray name={name + field.id}>
              {({fields}) =>
                fields.map((name, index) => (
                  <NestedForm
                    key={name + field.id}
                    childLabel={field.childLabel}
                    name={name}
                    form={form}
                    fields={fields}
                    index={index}
                    childFields={field.childFields}
                  />
                ))
              }
            </FieldArray>
          </Grid>
        </Box>
      );
    case 'select':
      return (
        <Field key={field.id} name={name + field.id}>
          {({input, ...otherProps}) => (
            <div key={field.id + field.label} sx={{gridColumn: width}}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Select id={field.id} {...input} {...otherProps}>
                {field.values.map(value => (
                  <option key={field.id + value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
              <Error name={name + field.id} />
            </div>
          )}
        </Field>
      );
    case 'radio':
      return (
        <fieldset key={field.id} sx={{gridColumn: width}}>
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
                <Field name={name + field.id} type="radio" value={value}>
                  {({input, ...otherProps}) => (
                    <Radio {...input} {...otherProps} />
                  )}
                </Field>
                {value}
              </label>
            </div>
          ))}
        </fieldset>
      );
    case 'checkbox':
      return (
        <>
          {field.label && field.values && field.values.length > 0 ? (
            <fieldset key={field.id} sx={{gridColumn: width}}>
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
                    <Field name={name + field.id} value={value}>
                      {({input, ...otherProps}) => (
                        <Checkbox {...input} {...otherProps} />
                      )}
                    </Field>
                    {value}
                  </label>
                </div>
              ))}
            </fieldset>
          ) : (
            <div key={field.id + field.label} sx={{gridColumn: width}}>
              <Label sx={{display: 'inline-block'}}>
                <Field key={field.id} name={name + field.id}>
                  {({input, ...otherProps}) => (
                    <Checkbox {...input} {...otherProps} />
                  )}
                </Field>
                {field.label}
                <Error name={name + field.id} />
              </Label>
            </div>
          )}
        </>
      );
    case 'reset':
      return (
        <Button
          sx={{gridColumn: width}}
          type={field.input}
          id={field.id}
          onClick={e => handleReset(e, form)}
        >
          {field.label}
        </Button>
      );
    default:
      return (
        <Field
          key={name + field.id}
          name={name + field.id}
          placeholder={field.placeholder}
        >
          {({input, ...otherProps}) => (
            <div key={field.id + field.label} sx={{gridColumn: width}}>
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
              <Error name={name + field.id} />
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
      mutators={{
        ...arrayMutators
      }}
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
              <Grid gap={20} columns={['1fr 1fr']}>
                {fields.map(field => {
                  return getFormField(field, form, blockText);
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
