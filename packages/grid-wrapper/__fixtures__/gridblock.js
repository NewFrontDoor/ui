import React from 'react';
import styled from '@emotion/styled';
import GridBlock from '../src';

const Header = styled('h3')`
  grid-column: 1/1;
  max-width: 100%;
  text-align: center;
  margin: 0.5em;
`;

const Actions = styled('section')`
  grid-column: 1/1;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
`;

const Action = styled('a')`
  text-decoration: none;
  padding: 10px 0;
  font-size: 0.8em;
  text-transform: uppercase;
  border: 1px solid;
  border-color: #444446;
  border-radius: 40px;
  color: #444446;
  width: 7.25rem;
  :hover {
    background-color: #444446;
    color: white;
    cursor: pointer;
  }
`;

function GridItem({title, imgSrc, action, slug}) {
  return (
    <>
      <img src={imgSrc} alt={title} style={{width: '100%'}} />
      <Header>{title}</Header>
      <Actions>
        <Action href={slug}>{action ? action : 'VIEW PAGE'}</Action>
      </Actions>
    </>
  );
}

const WrapperGridBlock = props => (
  <GridBlock
    items={props.items}
    columns={props.columns}
    gap="10%"
    marginBottom="50px;"
    renderProp={data => <GridItem {...data} />}
  />
);

export default [
  {
    component: WrapperGridBlock,
    props: {
      items: [
        {
          _id: '1',
          title: 'first',
          imgSrc:
            'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg',
          slug: 'first-slug'
        },
        {
          _id: '2',
          title: 'second',
          imgSrc:
            'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg',
          slug: 'second-slug'
        },
        {
          _id: '3',
          title: 'third',
          imgSrc:
            'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg',
          slug: 'third-slug'
        }
      ],
      columns: '3'
    }
  }
];
