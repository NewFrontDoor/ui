import React from 'react';
import PropTypes from 'prop-types';
import {Form, validation} from '@newfrontdoor/form';

const FormSerializer = ({node, submitForm, BlockText}) => {
  return (
    <Form
      {...node}
      validationFn={(values) => validation(values, node)}
      blockText={(value) => <BlockText blocks={value} />}
      submitForm={(values) => submitForm(values)}
    />
  );
};

FormSerializer.propTypes = {
  node: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  BlockText: PropTypes.node.isRequired
};
