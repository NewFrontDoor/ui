export default {
  name: 'formarrayfield',
  title: 'Sub-form Object',
  type: 'document',
  fields: [
    {
      // This (along with it's initialValue) is necessary for rendering the formarrayfield on the front end.
      name: 'input',
      title: 'Input',
      type: 'string',
      hidden: true
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description:
        'The label which will accompany this form input on the screen'
    },
    {
      name: 'description',
      title: 'Form description',
      type: 'blockContent'
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
      name: 'childLabel',
      title: 'Child label',
      description:
        "The label appended to each input array (along with it's index) e.g. Customer 1/2/3 [etc.]",
      type: 'string'
    },
    {
      name: 'childFields',
      title: 'Fields',
      type: 'array',
      of: [
        {
          type: 'formfield'
        }
      ]
    }
  ],
  initialValue: {
    input: 'field-array'
  }
};
