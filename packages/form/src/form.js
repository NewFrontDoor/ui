/** @jsx jsx */
/** @jsxFrag React.Fragment */
import React from 'react';
import PropTypes from 'prop-types';
import {Form, Field, useField} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {FieldArray} from 'react-final-form-arrays';
import {useId} from '@reach/auto-id';
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

const handleReset = (event, form) => {
  event.preventDefault();
  form.reset();
};

const NestedForm = ({
  id,
  childFields,
  form,
  childLabel,
  name,
  fields,
  index
}) => {
  return (
    <div sx={{gridColumn: '1/3'}}>
      <fieldset sx={{display: 'contents'}}>
        {childLabel && (
          <legend>
            <Styled.h4>
              {childLabel} {index + 1}
            </Styled.h4>
          </legend>
        )}
        {childFields?.map((field) => (
          <FormField
            key={`${id}-${field.id}`}
            field={field}
            form={form}
            name={name}
          />
        ))}
        <Button type="button" onClick={() => fields.remove(index)}>
          Remove
        </Button>
      </fieldset>
    </div>
  );
};

NestedForm.propTypes = {
  id: PropTypes.string.isRequired,
  childFields: PropTypes.array.isRequired,
  form: PropTypes.any,
  name: PropTypes.string.isRequired,
  childLabel: PropTypes.string,
  fields: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

const FormField = ({field, form, blockText, name = ''}) => {
  const fieldId = useId();
  const fieldName = name + field.id;
  const {push, pop} = form.mutators;
  const width = field.styling?.fullWidth ? '1/3' : null;
  // This is a hack while Sanity doesn't enable initial values on array-level items
  if (field.childFields) field.input = 'field-array';

  switch (field.input) {
    case 'textarea':
      return (
        <Field name={fieldName} placeholder={field.placeholder}>
          {({input, ...otherProps}) => (
            <div sx={{gridColumn: '1/3'}}>
              <Label htmlFor={fieldId}>{field.label}</Label>
              <Textarea id={fieldId} {...input} {...otherProps} rows={8} />
              <Error name={fieldName} />
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
                onClick={() => push(fieldName, undefined)}
              >
                Add
              </Button>
              <Button
                type="button"
                sx={{width: '35%'}}
                onClick={() => pop(fieldName, undefined)}
              >
                Remove
              </Button>
            </div>
            <FieldArray name={fieldName}>
              {({fields}) =>
                fields.map((name, index) => (
                  <NestedForm
                    key={name}
                    id={fieldId}
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
        <Field name={fieldName}>
          {({input, ...otherProps}) => (
            <div sx={{gridColumn: width}}>
              <Label htmlFor={fieldId}>{field.label}</Label>
              <Select id={fieldId} {...input} {...otherProps}>
                {field.values?.map((value) => (
                  <option key={`${fieldName}-${value}`} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
              <Error name={fieldName} />
            </div>
          )}
        </Field>
      );
    case 'radio':
      return (
        <fieldset sx={{gridColumn: width}}>
          <legend sx={{gridColumn: '1/3'}}>{field.label}</legend>
          {field.values?.map((value) => (
            <div key={`${fieldName}-${value}`}>
              <label
                sx={{
                  boxSizing: 'border-box',
                  minWidth: '0px',
                  width: '100%',
                  display: 'flex',
                  margin: '0px'
                }}
              >
                <Field name={fieldName} type="radio" value={value}>
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
        <React.Fragment>
          {field.label && field.values && field.values.length > 0 ? (
            <fieldset sx={{gridColumn: width}}>
              <legend sx={{gridColumn: '1/3'}}>{field.label}</legend>
              {field.values.map((value) => (
                <div key={`${fieldName}-${value}`}>
                  <label
                    sx={{
                      boxSizing: 'border-box',
                      minWidth: '0px',
                      width: '100%',
                      display: 'flex',
                      margin: '0px'
                    }}
                  >
                    <Field name={fieldName} value={value} type="checkbox">
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
            <div sx={{gridColumn: width}}>
              <Label sx={{display: 'inline-block'}}>
                <Field name={fieldName} type="checkbox">
                  {({input, ...otherProps}) => (
                    <Checkbox {...input} {...otherProps} />
                  )}
                </Field>
                {field.label}
                <Error name={fieldName} />
              </Label>
            </div>
          )}
        </React.Fragment>
      );
    case 'reset':
      return (
        <Button
          sx={{gridColumn: width}}
          type={field.input}
          id={fieldId}
          onClick={(event) => handleReset(event, form)}
        >
          {field.label}
        </Button>
      );
    default:
      return (
        <Field name={fieldName} placeholder={field.placeholder}>
          {({input, ...otherProps}) => (
            <div sx={{gridColumn: width}}>
              <Label htmlFor={fieldId}>
                {field.label}
                {field.required && <strong>*</strong>}
              </Label>
              <Input
                type={field.input}
                id={fieldId}
                {...input}
                {...otherProps}
              />
              <Error name={fieldName} />
            </div>
          )}
        </Field>
      );
  }
};

FormField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  blockText: PropTypes.node,
  name: PropTypes.string
};

const FormComponent = ({
  title,
  id,
  description,
  fields,
  blockText,
  submitForm,
  validationFn,
  success
}) => {
  const defaultTextHandler = (content) => {
    return <Styled.p>{content}</Styled.p>;
  };

  const block = blockText ?? defaultTextHandler;

  return (
    <Form
      mutators={{
        ...arrayMutators
      }}
      render={({handleSubmit, form, submitting, pristine, submitSucceeded}) => {
        return submitSucceeded ? (
          success ? (
            success
          ) : (
            <Box as="form" id={id}>
              <fieldset>
                <Styled.p>
                  Thankyou for your submission. We will get back to you as soon
                  as we can.
                </Styled.p>
              </fieldset>
            </Box>
          )
        ) : (
          <Box as="form" id={id} onSubmit={handleSubmit}>
            <fieldset>
              {title && <Styled.h2>{title}</Styled.h2>}
              {description && block(description)}
              <Grid gap={20} columns={['1fr 1fr']}>
                {fields.map((field) => (
                  <FormField
                    key={`${field.id}-${id}`}
                    field={field}
                    form={form}
                    blockText={blockText}
                  />
                ))}
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
      initialValues={fields.reduce((object, field) => {
        if (field.initialValue) object[field.id] = field.initialValue;
        return object;
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
  validationFn: PropTypes.func,
  success: PropTypes.node
};

export default FormComponent;
