import React from 'react';
import styled from '@emotion/styled';

const Next = styled.button`
  background-color: transparent;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  padding: 0;
  right: 0.7rem;
  svg {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const Prev = styled.button`
  background-color: transparent;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  width: 5rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  padding: 0;
  left: 0.7rem;
  svg {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const Dot = styled.button`
  background-color: transparent;
  cursor: pointer;
  position: relative;
  padding: 0;
  width: 3rem;
  height: 3rem;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  border: 0;
  display: flex;
  align-items: center;
  &:after {
    background-color: ${props => (props.selected ? '#1bcacd' : '#efefef')};
    width: 100%;
    height: 0.4rem;
    content: '';
  }
`;

const Dot2 = styled.button`
  background-color: transparent;
  cursor: pointer;
  position: relative;
  padding: 0;
  width: 3rem;
  height: 3rem;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  border: 0;
  display: flex;
  align-items: center;
  &:after {
    background-color: ${props => (props.selected ? '#1bcacd' : '#efefef')};
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 50%;
    content: '';
  }
`;

export const DotButton = ({selected, onClick}) => (
  <Dot2 selected={selected} onClick={onClick} />
);

export const PrevButton = ({enabled, onClick}) => (
  <Prev
    className="embla__button embla__button--prev"
    disabled={!enabled}
    onClick={onClick}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </Prev>
);

export const NextButton = ({enabled, onClick}) => (
  <Next
    className="embla__button embla__button--next"
    disabled={!enabled}
    onClick={onClick}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </Next>
);
