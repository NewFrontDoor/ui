import React from 'react';
import styled from '@emotion/styled';

const Grid = styled('section')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  input:focus,
  textarea:focus {
    outline: 3px solid gold;
  }

  label {
    display: block;
    grid-column: 1 / 2;
    padding-bottom: 5px;
  }
  input,
  textarea,
  select,
  button {
    width: 100%;
    box-sizing: border-box;
  }
`;

export default function FormGrid({children}) {
  return <Grid>{children}</Grid>;
}
