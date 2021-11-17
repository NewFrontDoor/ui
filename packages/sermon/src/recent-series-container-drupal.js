/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import {ApiContext} from '@newfrontdoor/api-config';
import RecentSeries from './recent-series';

class RecentSeriesContainerDrupal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      seriesData: {}
    };
  }

  componentDidMount() {
    this.getMostRecentSeries()
      .then(response => {
        // This transform could moved out into generic (Drupal => NFD) component structure for sermon series
        const transformedSeriesData = response.map(x => ({
          title: x.node_title,
          image: x.series_img,
          link: x.url,
          id: x.series_id
        }));
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
    return <RecentSeries {...this.state} />;
  }
}

export default function() {
  return (
    <ApiContext.Consumer>
      {({baseUrl}) => <RecentSeriesContainerDrupal baseUrl={baseUrl} />}
    </ApiContext.Consumer>
  );
}
