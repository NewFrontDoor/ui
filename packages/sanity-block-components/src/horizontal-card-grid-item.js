import React from 'react';
import styled from '@emotion/styled';
import {Styled} from 'theme-ui';
import PropTypes from 'prop-types';

const Wrapper = styled('section')`
  display: grid;
  @media (min-width: 420px) {
    grid-template-columns: 200px 1fr;
    gap: 20px;
  }
`;

// A regex to capture all non-absolute urls
const isRelative = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

export default function HorizontalCard({
  title,
  description,
  image,
  link,
  LinkComponent
}) {
  const relative = link && isRelative.test(link);
  return (
    <Wrapper>
      {relative ? (
        <LinkComponent url={link}>
          <img src={image} alt={title} />
          <div>
            <Styled.h3>{title}</Styled.h3>
            {description}
          </div>
        </LinkComponent>
      ) : link ? (
        <a href={link}>
          <img src={image} alt={title} />
          <div>
            <Styled.h3>{title}</Styled.h3>
            {description}
          </div>
        </a>
      ) : (
        <div>
          <img src={image} alt={title} />
          <Styled.h3>{title}</Styled.h3>
          {description}
        </div>
      )}
    </Wrapper>
  );
}

HorizontalCard.propTypes = {
  description: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string,
  LinkComponent: PropTypes.element,
};
