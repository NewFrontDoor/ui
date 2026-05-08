import {useContext, useEffect, useState} from 'react';

import {ApiContext} from '@newfrontdoor/api-config';
import RecentSeries from './recent-series';

type DrupalSeriesResponse = {
  node_title: string;
  series_img: string;
  url: string;
  series_id: string;
};

type SeriesData = {
  title: string;
  image: string;
  link: string;
  id: string;
};

type RecentSeriesState = {
  loading: boolean;
  error: unknown;
  seriesData: SeriesData[];
};

function transformSeriesData(response: DrupalSeriesResponse[]): SeriesData[] {
  return response.map(item => ({
    title: item.node_title,
    image: item.series_img,
    link: item.url,
    id: item.series_id
  }));
}

async function getMostRecentSeries(
  baseUrl: string,
  signal?: AbortSignal
): Promise<DrupalSeriesResponse[]> {
  const response = await fetch(
    `${baseUrl}recent_series_api?display_id=services_1`,
    {signal}
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch recent series: ${response.status}`);
  }

  return response.json();
}

export default function RecentSeriesContainerDrupal() {
  const {baseUrl} = useContext(ApiContext);

  const [state, setState] = useState<RecentSeriesState>({
    loading: true,
    error: null,
    seriesData: []
  });

  useEffect(() => {
    const controller = new AbortController();

    setState({
      loading: true,
      error: null,
      seriesData: []
    });

    getMostRecentSeries(baseUrl, controller.signal)
      .then(response => {
        setState({
          seriesData: transformSeriesData(response),
          loading: false,
          error: null
        });
      })
      .catch(error => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setState({
          loading: false,
          error,
          seriesData: []
        });
      });

    return () => {
      controller.abort();
    };
  }, [baseUrl]);

  return <RecentSeries {...state} />;
}