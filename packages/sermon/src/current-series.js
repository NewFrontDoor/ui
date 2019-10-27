import React from 'react';
import {PulseLoader} from 'react-spinners';
import RenderSeriesComponent from './render-series-content';

export default function({loading, seriesData}) {
  return (
    <section>
      <h2>Current Series</h2>
      <PulseLoader loading={loading} size={20} />
      {loading || <RenderSeriesComponent {...seriesData} />}
    </section>
  );
}
