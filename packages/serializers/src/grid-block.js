import React from 'react';
import PropTypes from 'prop-types';

const GridBlockSerializer = ({node: {header, blocks, columns, style}}) => {
  return (
    <GridBlock
      items={blocks}
      columns={
        (columns === undefined) | null
          ? `repeat(auto-fit, minmax(200px, 1fr))`
          : `repeat(${columns}, 1fr)`
      }
      columnRawValue={(columns === undefined) | null ? 1 : columns}
      gap="40px"
      style={style}
      margin="150px -155px 0 -155px"
      padding={['0 10px 50px 10px', '0 40px 50px 40px']}
      header={header}
      renderProp={(data, style) =>
        style === 'card' ? (
          <Card {...data} />
        ) : style === 'overlay' ? (
          <Overlay {...data} />
        ) : style === 'horizontal' ? (
          <HorizontalCard {...data} />
        ) : style === 'people' ? (
          <PeopleCard {...data} />
        ) : style === 'homecard' ? (
          <HomeCard {...data} />
        ) : (
          ''
        )
      }
    />
  );
};

GridBlockSerializer.propTypes = {
  node: PropTypes.shape({
    blocks: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.number,
    style: PropTypes.string.isRequired
  }).isRequired
};