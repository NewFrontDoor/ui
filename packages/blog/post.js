import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'react-emotion';
import Text from 'mineral-ui/Text';
import {Link} from 'react-router-dom';
import format from 'date-fns/format';
import SanityBlock from './SanityBlock'; // Or replace with some other block renderer

const ContentWrapper = styled('div')`
  display: flex;
  flex-flow: row wrap;
  margin: auto;
  width: 100vw;
  max-width: 920px;
  padding-top: 40px;
  @media (min-width: 420px) {
    min-height: 600px;
  }
`;

const Meta = styled('div')`
  flex: 1 0 auto;
  height: auto;
  overflow: hidden;
  width: 250px;
  padding: 20px;
  position: sticky;
  top: 40px;
  height: 50px;
  background: inherit;
  @media (min-width: 420px) {
    top: 110px;
    height: 150px;
  }
`;

const Content = styled('div')`
  flex: 1 0 auto;
  width: auto;
  max-width: 24em;
  @media (min-width: 420px) {
    max-width: 32em;
    padding-top: 23.5px;
  }
`;

const Post = props => (
  <ContentWrapper display="flex">
    <Meta>
      <Text element="h2">{props.title}</Text>
      <Text appearance="mouse">
        {format(new Date(props.date), 'dddd, MMMM do YYYY')}
      </Text>
      <Text
        className={css`
          display: none;
          @media (min-width: 420px) {
            display: block;
          }
        `}
        element="div"
        appearance="mouse"
      >
        <ul>
          {props.categories.map(category => (
            <li key={category.title + props.date}>
              <Link
                to={{
                  pathname: '/blog',
                  search: `?category=${category.title}`
                }}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </Text>
    </Meta>
    <Content>
      <SanityBlock blocks={props.body} />
    </Content>
  </ContentWrapper>
);

export default Post;

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired
};
