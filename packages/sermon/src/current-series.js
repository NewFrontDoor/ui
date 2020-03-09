/** @jsx jsx */
import PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';
import {Styled, jsx} from 'theme-ui';
import RenderSeriesComponent from './render-series-content';

export const CurrentSeries = ({loading, seriesData, style}) => {
  return (
    <section sx={style}>
      <Styled.h2>Current Series</Styled.h2>
      <PulseLoader loading={loading} size={20} />
      {loading || <RenderSeriesComponent {...seriesData} />}
    </section>
  );
};

CurrentSeries.propTypes = {
  loading: PropTypes.bool.isRequired,
  seriesData: PropTypes.array.isRequired,
  style: PropTypes.object
};

CurrentSeries.defaultProps = {
  style: {}
};
