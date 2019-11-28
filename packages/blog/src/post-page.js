/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import styled from '@emotion/styled';
import format from 'date-fns/format';
import Link from './link';

const ContentWrapper = styled('div')`
  display: flex;
  flex-flow: column;
  margin: auto;
  width: 100vw;
  max-width: 920px;
  padding-top: 40px;
  @media (min-width: 420px) {
    min-height: 600px;
  }
`;

const Content = styled('div')`
  flex: 1 0 auto;
  width: auto;
  @media (min-width: 420px) {
    padding-top: 23.5px;
  }
`;

function PostPage({post, dateFormat}) {
  function createMarkup() {
    return {__html: post.body};
  }

  return (
    <ContentWrapper>
      <h2>{post.title}</h2>
      <small>by {post.author}</small>
      <small>
        Posted on {format(new Date(post._createdAt), dateFormat)}
      </small>
      <small
        css={css`
          display: none;
          @media (min-width: 420px) {
            display: block;
          }
        `}
      >
        <ul>
          {post.categories.map(category => (
            <li key={category.title + post.date}>
              <Link {...category} />
            </li>
          ))}
        </ul>
      </small>
      <Content>
        <div dangerouslySetInnerHTML={createMarkup()} />
      </Content>
    </ContentWrapper>
  );
}

PostPage.defaultProps = {
  dateFormat: 'dddd, MMMM do yyyy'
};

export default PostPage;
