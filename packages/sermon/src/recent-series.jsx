
import {PulseLoader} from 'react-spinners';

import RenderSeriesComponent from './render-series-content';

const RecentSeries = ({loading, seriesData, style = {}}) => {
  return (
    <section sx={style}>
      <h2 sx={{variant: "styles.h2"}}>Recent Series</h2>
      <PulseLoader loading={loading} size={20} />
      {loading ||
        seriesData.map((item) => (
          <RenderSeriesComponent key={item} {...item} />
        ))}
    </section>
  );
};

/* RecentSeries.propTypes = {
  loading: PropTypes.bool.isRequired,
  seriesData: PropTypes.array.isRequired,
  style: PropTypes.object
};

RecentSeries.defaultProps = {
  style: {}
}; */

export default RecentSeries;
