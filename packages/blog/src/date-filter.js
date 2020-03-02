/** @jsx jsx */
import React, {useState} from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';

const FilterWrapper = styled('div')`
  height: 60px;
  width: calc(100% - 40px);
  position: fixed;
  background: white;
  padding: 20px;
  z-index: 1;
  display: grid;
  grid-template-columns: 15px auto;
  grid-template-rows: 30px 30px;
  font-family: sans-serif;
`;

const Years = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: 45px repeat(7, 1fr) 45px;
  grid-template-rows: 30px;
  grid-auto-flow: row;
  vertical-align: center;
  text-align: center;
  align-items: center;
`;

const Months = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 30px;
  grid-auto-flow: row;
  text-align: center;
  align-items: center;
`;

const Year = styled('div')``;

const Month = styled('div')`
  margin: 6px;
`;

const Arrow = styled('div')``;
const Archive = styled('div')`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
  div {
    transform: rotate(-90deg) translate(-30px);
  }
`;

const FilterOptions = styled('div')`
  display: ${props => (props.dateFilter ? 'contents' : 'none')};
`;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DateFilter = () => {
  const startYear = new Date().getFullYear() - 6;
  const [dateFilter, toggleDateFilter] = useState(false);

  return (
    <FilterWrapper>
      <Archive>
        <div onClick={() => toggleDateFilter(!dateFilter)}>Archive</div>
      </Archive>
      <FilterOptions dateFilter={dateFilter}>
        <Years>
          <Arrow
            css={css`
              text-align: left;
            `}
          >
            &lt;
          </Arrow>
          {Array.from({length: 7}, (_, i) => startYear + i).map(item => (
            <Year key={item}>{item}</Year>
          ))}
          <Arrow
            css={css`
              text-align: right;
            `}
          >
            &gt;
          </Arrow>
        </Years>
        <Months>
          {Array.from({length: 12}, (_, i) => months[i]).map(month => (
            <Month key={month}>{month}</Month>
          ))}
        </Months>
      </FilterOptions>
    </FilterWrapper>
  );
};

export default DateFilter;
