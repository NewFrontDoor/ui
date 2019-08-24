import React from 'react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import Text from 'mineral-ui/Text';
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
  max-width: 24em;
  @media (min-width: 420px) {
    max-width: 32em;
    padding-top: 23.5px;
  }
`;

function postPage({post, dateFormat}) {
    return (
        <ContentWrapper>
            <Text as="h2">{post.title}</Text>
            <Text appearance="mouse">by {post.author}</Text>
            <Text appearance="mouse">
                Posted on {format(new Date(post._createdAt), dateFormat)}
            </Text>
            <Text
                css={css`
                    display: none;
                    @media (min-width: 420px) {
                    display: block;
                    }
                `}
                as="div"
                appearance="mouse"
            >
                <ul>
                    {post.categories.map(category => (
                    <li key={category.title + post.date}>
                        <Link {...category} />
                    </li>
                    ))}
                </ul>
            </Text>
            <Content>
                {post.body.map(para => {
                    return <p>{para}</p>;
                })}
            </Content>
        </ContentWrapper>
    );
}

postPage.defaultProps = {
    dateFormat: 'dddd, MMMM do YYYY'
};

export default postPage;