/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import {ApiContext} from '@newfrontdoor/api-config';
import ky from 'ky';
import CurrentSeries from './current-series';

class CurrentSeriesContainerDrupal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      seriesData: {}
    };
  }

  componentDidMount() {
    this.getCurrentSeries()
      .then(response => {
        // This transform could moved out into generic (Drupal => NFD) component structure for sermon series
        const series = response[0];
        this.setState({
          seriesData: {
            title: series.node_title,
            image: series['series thumbnail'],
            link: series.url,
            id: series.series_id
          },
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  getCurrentSeries() {
    return ky
      .get(`${this.props.baseUrl}current_series_api?display_id=services_1`)
      .json();
  }

  render() {
    return (
      <CurrentSeries
        seriesData={this.state.seriesData}
        loading={this.state.loading}
      />
    );
  }
}

export default function() {
  return (
    <ApiContext.Consumer>
      {({baseUrl}) => <CurrentSeriesContainerDrupal baseUrl={baseUrl} />}
    </ApiContext.Consumer>
  );
}
