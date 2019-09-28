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
  @media (min-width: 420px) {
    padding-top: 23.5px;
  }
`;

function postPage({post, dateFormat}) {
    function createMarkup() { return {__html: post.body}; };

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
                <div dangerouslySetInnerHTML={createMarkup()} /> 
            </Content>
        </ContentWrapper>
    );
}

postPage.defaultProps = {
    dateFormat: 'dddd, MMMM do yyyy'
};

export default postPage;