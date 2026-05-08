import {useContext, useEffect, useState} from 'react';

import {ApiContext} from '@newfrontdoor/api-config';
import SermonSeriesList from './series-sermon-list';

type SeriesSermonListContainerDrupalProps = {
  seriesId?: string | number;
};

type Series = {
  title?: string;
  image?: string;
};

type Sermon = {
  title: string;
  preacher: string;
  datePreached: string;
  sermonUrl: string;
  sermonImg: string;
  sermonSeries: string;
  biblePassage: string;
};

type State = {
  loading: boolean;
  error: unknown;
  series: Series;
  seriesSermonList: Sermon[];
};

type DrupalSeriesResponse = {
  node_title: string;
  image: string;
};

type DrupalSermonResponse = {
  node_title: string;
  preacher: string;
  datepreached: string;
  url: string;
  sermon_img: string;
  sermonseries: string;
  text: string;
};

const initialState: State = {
  loading: true,
  error: null,
  series: {},
  seriesSermonList: []
};

function transformSeries(series: DrupalSeriesResponse | undefined): Series {
  if (!series) {
    return {};
  }

  return {
    title: series.node_title,
    image: series.image
  };
}

function transformSermonList(response: DrupalSermonResponse[]): Sermon[] {
  return response.map(s => ({
    title: s.node_title,
    preacher: s.preacher,
    datePreached: s.datepreached,
    sermonUrl: s.url,
    sermonImg: s.sermon_img,
    sermonSeries: s.sermonseries,
    biblePassage: s.text
  }));
}

export default function SeriesSermonListContainerDrupal(
  props: SeriesSermonListContainerDrupalProps
) {
  const {baseUrl} = useContext(ApiContext);
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    const getSeries = () =>
      fetch(
        `${baseUrl}all_sermon_series_api?display_id=services_1&nid=${
          props.seriesId || ''
        }`,
        {signal}
      ).then(resp => resp.json() as Promise<DrupalSeriesResponse[]>);

    const getSermonsForSeries = () =>
      fetch(
        `${baseUrl}all_sermons_api?display_id=services_1${
          props.seriesId ? `&filters[sermonSeries]=${props.seriesId}` : ''
        }`,
        {signal}
      ).then(resp => resp.json() as Promise<DrupalSermonResponse[]>);

    Promise.all([getSeries(), getSermonsForSeries()])
      .then(([seriesResponse, sermonResponse]) => {
        setState({
          loading: false,
          error: null,
          series: transformSeries(seriesResponse[0]),
          seriesSermonList: transformSermonList(sermonResponse)
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
  }, [baseUrl, props.seriesId]);

  return (
    <section>
      <SermonSeriesList {...state} />
    </section>
  );
}
