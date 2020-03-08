import PropTypes from 'prop-types';
import React from 'react';
import {PulseLoader} from 'react-spinners';
import RenderSeriesComponent from './render-series-content';

const FeaturedSeries = ({loading, seriesData}) => {
  return (
    <section>
      <h2>Featured Series</h2>
      <PulseLoader loading={loading} size={20} />
      {loading || <RenderSeriesComponent {...seriesData} />}
    </section>
  );
};

FeaturedSeries.propTypes = {
  loading: PropTypes.bool.isRequired,
  seriesData: PropTypes.array.isRequired
};

export default FeaturedSeries;
