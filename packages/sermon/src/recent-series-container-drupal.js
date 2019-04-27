import React from 'react';
import {decode} from 'he';
import fetch from 'isomorphic-fetch';
import RecentSeries from './recent-series';
import { ApiContext } from '@newfrontdoor/api-config';

class RecentSeriesContainerDrupal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      latestSermon: {}
    };
  }

  componentDidMount() {
    this.getMostRecentSeries()
      .then(response => {
        // This transform could moved out into generic (Drupal => NFD) component structure for sermon series
        const transformedSeriesData = response.map((x) => ({
          title: decode(x.node_title),
          image: x.series_img,
          link: x.url,
          id: x.series_id
        }));
        console.log("Set state ", transformedSeriesData);

        this.setState({
          seriesData: transformedSeriesData,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  getMostRecentSeries = () => {
    return fetch(
      `${this.props.baseUrl}recent_series_api?display_id=services_1`
    ).then(resp => resp.json());
  };

  render() {
    return (
      <RecentSeries {...this.state} />
    );
  }
}

export default function() {
  return (
    <ApiContext.Consumer>
      {({ baseUrl }) => (
        <RecentSeriesContainerDrupal baseUrl={baseUrl} />
      )}
    </ApiContext.Consumer>
  )
};
