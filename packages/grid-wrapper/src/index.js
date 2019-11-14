import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Grid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${props => (props.gap ? props.gap : `5%`)};
`;

const ItemOuter = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : `4em`)};
`;

export default function GridBlock({
  items,
  columns,
  renderProp,
  gap,
  marginBottom
}) {
  return (
    <Grid columns={columns} gap={gap}>
      {items.map(item => {
        return (
          <ItemOuter key={item._id} marginBottom={marginBottom}>
            {renderProp(item)}
          </ItemOuter>
        );
      })}
    </Grid>
  );
}

GridBlock.propTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.string.isRequired,
  renderProp: PropTypes.func.isRequired,
  gap: PropTypes.string,
  marginBottom: PropTypes.string
};
