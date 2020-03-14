export default {
  name: 'form',
  title: 'Form',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'id',
      title: 'ID',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Form description',
      type: 'blockContent'
    },
    {
      name: 'fields',
      title: 'fields',
      type: 'array',
      of: [
        {
          type: 'formfield',
          title: 'Field'
        },
        {
          type: 'formarrayfield',
          title: 'Form Array'
        }
      ]
    },
    {
      name: 'requiredError',
      title: 'Required Error text',
      type: 'string',
      description:
        "This is the error message that will show up if a required field is left blank. If not set, the default is to output 'required'"
    }
  ]
};
