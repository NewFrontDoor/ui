export default {
  name: 'formfield',
  title: 'Field',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description:
        'The label which will accompany this form input on the screen'
    },
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description:
        'A lowercase single word identifier for this field, usually just the label in lowercase label will suffice. For example: "First name" might have an ID of "first"'
    },
    {
      name: 'required',
      title: 'Required field',
      type: 'boolean',
      description: 'Does this form field require a value?'
    },
    {
      name: 'input',
      title: 'Input Type',
      type: 'string',
      options: {
        list: [
          'text',
          'email',
          'telephone',
          'date',
          'textarea',
          'select',
          'checkbox',
          'radio',
          'url',
          'file',
          'number'
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'values',
      title: 'Input Values',
      description:
        'If you selected Select, Checkbox, or Radio above, please create values to be available for that input type in the field below',
      type: 'array',
      of: [{type: 'string'}],
      layout: 'tags'
    },
    {
      name: 'initialValue',
      title: 'Initial Value',
      type: 'string',
      description:
        'Input a string which matches the value of your chosen value above to set as an initial value on this field.'
    },
    {
      name: 'placeholder',
      title: 'Placeholder',
      description:
        'A placeholder that will sit inside the input component until the user begins to type (only works for text/number fields)',
      type: 'string'
    },
    {
      name: 'validation',
      title: 'Validation',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          type: 'string',
          name: 'validationType',
          title: 'Validation type',
          options: {
            list: [
              {title: 'None', value: 'none'},
              {title: 'Default', value: 'default'},
              {title: 'Custom', value: 'custom'}
            ],
            layout: 'radio',
            direction: 'horizontal'
          },
          description:
            "Choose whether you use no validation, the default validation, or a custom regex for validating this field. If you're unsure, just use default validation."
        },
        {type: 'string', name: 'regexString', title: 'Regex String'},
        {
          type: 'string',
          name: 'warning',
          title: 'Warning text',
          description:
            'Input a warning that helpfully describes what your field expects'
        }
      ]
    }
  ]
};
