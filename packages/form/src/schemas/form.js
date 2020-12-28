const form = {
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
    },
    {
      name: 'onSuccess',
      title: 'Successful submission message',
      type: 'string',
      description:
        "This is the message which you would like displayed after the form is successfully submitted. If not set, the default is to output 'Thankyou for your submission. We will get back to you as soon as we can.'"
    }
  ]
};

export default form;
