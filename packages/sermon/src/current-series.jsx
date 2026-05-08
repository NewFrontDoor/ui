
import {PulseLoader} from 'react-spinners';

import RenderSeriesComponent from './render-series-content';

const CurrentSeries = ({loading, seriesData, style = {}}) => {
  return (
    <section sx={style}>
      <h2 sx={{variant: "styles.h2"}}>Current Series</h2>
      <PulseLoader loading={loading} size={20} />
      {loading || <RenderSeriesComponent {...seriesData} />}
    </section>
  );
};

/* CurrentSeries.propTypes = {
  loading: PropTypes.bool.isRequired,
  seriesData: PropTypes.array.isRequired,
  style: PropTypes.object
};

CurrentSeries.defaultProps = {
  style: {}
}; */

export default CurrentSeries;
