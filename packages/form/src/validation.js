import regexLookup from './regex-lookup';

const validation = (values, data, regexs) => {
  // If a new Regex object is supplied, use that, otherwise, use the library default
  const regexDict = regexs || regexLookup;

  // If an error message is supplied, use that, otherwise, use the library default
  const errorMessage = data.requiredError || 'Required';

  // Define errors object
  const errors = {};

  // Begin testing each field for errors
  data.fields.forEach(field => {
    /* ***** */
    /* Setup */
    /* ***** */

    // If supplied regex, put it into variable - otherwise false
    const rg = field?.validation?.regexString;

    // Test the supplied regex, return if regex, or make regex, or return false
    const suppliedRegex =
      rg instanceof RegExp
        ? rg
        : rg && new RegExp(rg) instanceof RegExp // If rg && not included, this would evaluate true
        ? new RegExp(rg)
        : false;

    // If supplied validation type, put it into variable - otherwise false
    const vtype = field?.validation?.validationType ?? false;

    // Set the regex based on vtype and suppliedRegex value
    const regex =
      vtype === 'custom'
        ? suppliedRegex
        : vtype === 'default'
        ? regexDict[field.input]
        : false;

    /* ***** */
    /* Tests */
    /* ***** */

    // Test for value against required, if met, test against regex (if applicable)
    if (field.required) {
      if (!values[field.id]) {
        errors[field.id] = errorMessage;
      } else if (regex && !regex.test(values[field.id])) {
        errors[field.id] = field.validation.warning;
      }
    }

    // Given value not required, if value, test against regex (if valid regex)
    if (!field.required) {
      if (regex && values[field.id] && !regex.test(values[field.id])) {
        console.log('inside');
        errors[field.id] = field.validation.warning;
      }
    }
  });

  // Returns error object as result of validation to react-final-form
  return errors;
};

export default validation;
