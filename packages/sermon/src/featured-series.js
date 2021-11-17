/** @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import {jsx, Styled} from 'theme-ui';
import {PulseLoader} from 'react-spinners';
import RenderSeriesComponent from './render-series-content';

const FeaturedSeries = ({loading, seriesData, style}) => {
  return (
    <section sx={style}>
      <Styled.h2>Featured Series</Styled.h2>
      <PulseLoader loading={loading} size={20} />
      {loading || <RenderSeriesComponent {...seriesData} />}
    </section>
  );
};

FeaturedSeries.propTypes = {
  loading: PropTypes.bool.isRequired,
  seriesData: PropTypes.array.isRequired,
  style: PropTypes.object
};

FeaturedSeries.defaultProps = {
  style: {}
};

export default FeaturedSeries;
