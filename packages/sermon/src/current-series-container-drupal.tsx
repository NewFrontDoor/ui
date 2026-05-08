import {useContext, useEffect, useState} from 'react';
import {ApiContext} from '@newfrontdoor/api-config';
import ky from 'ky';

import CurrentSeries from './current-series';

type DrupalCurrentSeries = {
  node_title: string;
  'series thumbnail': string;
  url: string;
  series_id: string | number;
};

type SeriesData = {
  title?: string;
  image?: string;
  link?: string;
  id?: string | number;
};

type State = {
  loading: boolean;
  error: unknown;
  seriesData: SeriesData;
};

const initialState: State = {
  loading: true,
  error: null,
  seriesData: {}
};

function transformCurrentSeries(series?: DrupalCurrentSeries): SeriesData {
  if (!series) {
    return {};
  }

  return {
    title: series.node_title,
    image: series['series thumbnail'],
    link: series.url,
    id: series.series_id
  };
}

export default function CurrentSeriesContainerDrupal() {
  const {baseUrl} = useContext(ApiContext);

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    ky.get(`${baseUrl}current_series_api?display_id=services_1`, {
      signal: controller.signal
    })
      .json<DrupalCurrentSeries[]>()
      .then(response => {
        setState({
          seriesData: transformCurrentSeries(response[0]),
          loading: false,
          error: null
        });
      })
      .catch(error => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setState(previousState => ({
          ...previousState,
          loading: false,
          error
        }));
      });

    return () => {
      controller.abort();
    };
  }, [baseUrl]);

  return (
    <CurrentSeries
      seriesData={state.seriesData}
      loading={state.loading}
    />
  );
}
