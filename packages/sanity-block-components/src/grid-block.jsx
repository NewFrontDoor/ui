import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Grid = styled('div')`
  display: grid;
  grid-template-columns: ${props => props.columns};
  grid-template-rows: auto;
  gap: ${props => (props.gap ? props.gap : `5%`)};
  @media (min-width: 450px) and (max-width: 890px) {
    grid-template-columns: ${props =>
      `repeat(${Math.round(props.columnRawValue / 2)}, 1fr)`};
  }
`;

const ItemOuter = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : `4em`)};
`;

export default function GridBlock({
  items,
  columns,
  columnRawValue,
  renderProp,
  gap,
  marginBottom,
  style
}) {
  return (
    <Grid columns={columns} columnRawValue={columnRawValue} gap={gap}>
      {items.map(item => {
        return (
          <ItemOuter key={item._id} marginBottom={marginBottom}>
            {renderProp(item, style)}
          </ItemOuter>
        );
      })}
    </Grid>
  );
}

GridBlock.propTypes = {
  columnRawValue: PropTypes.number.isRequired,
  columns: PropTypes.string.isRequired,
  gap: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  marginBottom: PropTypes.string.isRequired,
  renderProp: PropTypes.element.isRequired,
  style: PropTypes.string.isRequired
};
