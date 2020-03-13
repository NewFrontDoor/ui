import regexLookup from './regex-lookup';

const validation = (values, node, regexs) => {
  const regexObj = regexs ? regexs : regexLookup;
  const errorMessage = node.requiredError;
  const errors = {};
  node.fields.forEach(field => {
    const rg =
      field.validation &&
      field.validation.validationType === 'custom' &&
      field.validation.regexString
        ? new RegExp(field.validation.regexString, 'i')
        : field.validation.validationType === 'default'
        ? new RegExp(regexObj[field.input], 'i')
        : 'false';
    if (field.required) {
      if (!values[field.id]) {
        errors[field.id] = errorMessage || 'Required';
      } else if (rg && !rg.test(values[field.id])) {
        errors[field.id] = field.validation.warning;
      }
    } else if (rg && values[field.id] && !rg.test(values[field.id])) {
      errors[field.id] = field.validation.warning;
    }
  });
  return errors;
};

export default validation;
