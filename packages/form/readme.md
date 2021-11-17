# Form component
### for dynamically building out forms from JSON

A wrapper around React-Final-Form primarily built to work with data provided by [sanity.io](sanity.io) (json), and styling injected by [theme-ui](https://theme-ui.com/). However, you're not stuck with theme-ui! Check out (VanillaForm)[https://www.npmjs.com/package/@newfrontdoor/vanilla-form] if you'd prefer work with your own styling.

Or just use this library as an inspiration!

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Available components](#available-components)
* [Functions](#functions)


## Installation
`yarn add @newfrontdoor/form theme-ui`

or

`npm install @newfrontdoor/form theme-ui`

## Usage

If you're using Sanity, you can find some suitable schemas for your studio [in the schemas folder](schemas). They're also exported from this project as `formObject` and `formField`;

```
import {Form, validation} from '@newfrontdoor/form'
const MyFormPage = ({formData}) => {
    const {fields requiredError} = formData
    return  <Form
              fields
              title="My Form"
              description="This is a cool form"
              validationFn={values => validation(values, formData)}
              submitForm={() => console.log('submitted!')}
            />
}
```
Obviously all props could be passed in from your data store, meaning you can end up just doing:

```
<Form {..props} validationFn={values => validation(values, formData)}>
```


## Available components
**`<Form>`** see above for basic usage. See prop definitions below.

### Props
_**fields**_ <Array> [required]

an array of objects with the following shape:
```
{
    id: <String>,
    input: <String> InputType ['text', 'email', 'telephone', 'date', 'textarea', 'select', 'checkbox', 'radio', 'url', 'file', 'number'],
    label: <String>,
    required: <Bool>,
    validation: {
        regexString: <RegEx>,
        warning: <String>
    },
    placeholder: <String>,
    initialValue: <String>
}
```

_**submitForm**_ <Function> [required]

Your callback for the form submission. The form values can be accessed on submission as below. As per React-Final-Form design, the submitForm callback will not be run unless the form has no validation errors.

```
submitForm={formValues => {
    console.log('Submitted!');
    console.log(formValues);
    }}
```

_**title**_ <String> [optional]

A string to output as your title

_**id**_ <String> [optional]

To set an ID on the wrapping element

_**description**_ <String>, <other> [optional]

Add a description to your form. This can be a string, or any content that can be parsed using the optional blockText function.

_**blockText**_ <Function> [optional]

If your description comes in some other form, say Portable Text, then this is the function you'd pass in to interpret that text. For example, if you were bringing in a description from Sanity.io you'd use the following function: `text => <BlockText blocks={text} />`

_**validationFn**_ <Function> [optional]

You can opt into validation by adding a function which takes the object `values{}` and returns an object `errors{}`. This package provides a function `validation` (see below) to test both if a field is 'required' and/or against a regex provided per field.

## Functions

### `validation`

```
values => validation(values, formData[, regexLibrary])
```

This function provides the validation check for your form. As it's not baked into the Form component you're free to supply your own validation by swapping it out on the validations prop of the form component.

#### Parameters:
_**values**_ [required]

This must be the first argument. It is the values returned from the form component for checking, passed from the validation callback. (See above)

_**formData**_ [required]

This is an object:
```
{
    fields: <Array>,
    requiredError [optional]: <String>
}
```
This is what `validation()` maps over to check all your fields. 

- `fields` is your array of fields which you will have used to create the form in the first place
- `requiredError` is an optional replacement string for the default error shown when a field is required: "required".

_**regexLookup**_ [optional]

The validation function by default pulls in the ['regex-lookup'](src/regex-lookup.js) exported from this package with a collection of default validation regular expressions, but you're also able to supply your own default regex values as an optional argument, as (frankly) the regex values supplied are entirely geared toward my use case... So use `regex-lookup.js` as a launching point.
