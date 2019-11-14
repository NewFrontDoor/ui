import 'isomorphic-fetch';
import React from 'react';
import Box from 'mineral-ui/Box';
import {ApiContext} from '@newfrontdoor/api-config';
import SermonSeriesList from './series-sermon-list';

class SeriesSermonListContainerDrupal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      series: {},
      seriesSermonList: []
    };
  }

  componentDidMount() {
    this.getSeries()
      .then(resp => {
        const series = resp[0];
        const transSeries = {
          title: series.node_title,
          image: series.image
        };

        this.setState({
          series: transSeries
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });

    this.getSermonsForSeries()
      .then(resp => {
        const transSermonList = resp.map(s => {
          const sTransformed = {
            title: s.node_title,
            preacher: s.preacher,
            datePreached: s.datepreached,
            sermonUrl: s.url,
            sermonImg: s.sermon_img,
            sermonSeries: s.sermonseries,
            biblePassage: s.text
          };
          return sTransformed;
        });

        this.setState({
          seriesSermonList: transSermonList,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  getSeries = () => {
    return fetch(
      `${this.props.baseUrl}all_sermon_series_api?display_id=services_1&nid=${this.props.seriesId || ''}`
    ).then(resp => resp.json());
  };

  getSermonsForSeries = () => {
    return fetch(
      `${this.props.baseUrl}all_sermons_api?display_id=services_1${this.props.seriesId ? `&filters[sermonSeries]=${this.props.seriesId}` : ''}`
    ).then(resp => resp.json());
  };

  render() {
    return (
      <Box element="section">
        <SermonSeriesList {...this.state} />
      </Box>
    );
  }
}

export default function(props) {
  return (
    <ApiContext.Consumer>
      {({baseUrl}) => (
        <SeriesSermonListContainerDrupal
          baseUrl={baseUrl}
          seriesId={props.seriesId}
        />
      )}
    </ApiContext.Consumer>
  );
}
