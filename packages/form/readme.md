# Form component
### for dynamically building out forms from JSON

Primarily built to work with data provided by sanity.io, and styling injected by a theme-ui theme provider, however the package offers alternatives for those who prefer to style forms differently.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Available components](#available-components)
* [Functions](#functions)


## Installation
`yarn add @newfrontdoor/form` and optionally `theme-ui`
`npm install @newfrontdoor/form` and optionally `theme-ui`

## Usage
```
import {Form, validation} from '@newfrontdoor/form'

const MyFormPage = ({formData}) => {

const {fields requiredError} = formData

return <Form
      fields
      title="My Form"
      description="This is a cool form"
      validationFn={values => validation(values, formData, regexLookup)}
      submitForm={() => console.log('submitted!')}
    />
}
```

## Available components
- `<Form>` - see above for basic usage
- `<VanillaForm>` - same props as form, but uses plain html tags, rather than theme-ui elements.

### Props
- fields `<Array>` (required) - 
- submitForm `<Function>` (required) - your callback for the form submission
- title `<String>` (optional) - A string to output as your title
- id `<String>` (optional) - To set an ID on the wrapping element
- description `<String, Other>` (optional) - Add a description to your form. This can be a string, or any content that can be parsed using the optional blockText function
- blockText `<Function>` (optional) - If your description comes in some other form, say Portable Text, then this is the function you'd pass in to interpret that text. For example, if you were bringing in a description from Sanity.io you'd use the following function: `text => <BlockText blocks={text} />`
- validationFn `<Function>` (optional) - You can opt into validation by adding a function which takes the object `values{}` and returns an object `errors{}`. This package provides a function to test for whether a field is 'required' or against a custom regex provided per field, which you can use by copying the syntax in the [Usage](#usage) example above.

## Functions
###`validation()`
This function provides the validation check for your form. As it's not baked into the Form component you're free to supply your own validation by swapping it out on the validations prop of the form component.
Arguments:
- values (required) - this is the values returned from the form component for checking
- formData (required) - this is an object with keys `fields` and (optionally) `requiredError`. This is what validation() maps over to check all your fields. requiredError is an optional replacement for the default erro shown when a field is required: "required".
- regexLookup (option) - the validation function by default pulls in the 'regex-lookup' exported from this package, but you're also able to supply your own default regex values as an optional argument, as, frankly, the regex values supplied are more geared toward Australians...

