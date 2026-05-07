import React from 'react';
import {Styled} from 'theme-ui';
import PropTypes from 'prop-types';

export default function TextCard({title, description}) {
  return (
    <div>
      <Styled.h3>{title}</Styled.h3>
      {description}
    </div>
  );
}

TextCard.propTypes = {
  description: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};
