import 'isomorphic-fetch';
import React from 'react';
import {ApiContext} from '@newfrontdoor/api-config';
import LatestSermon from './latest-sermon';

class LatestSermonContainerDrupal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      latestSermon: {}
    };
  }

  componentDidMount() {
    this.getLatestSermon()
      .then(ls => {
        const sermon = ls[0];
        // This transform could moved out into generic (Drupal => NFD) component structure for sermons
        const lsTransformed = {
          title: sermon.node_title,
          preacher: sermon.preacher,
          datePreached: sermon.datepreached,
          sermonUrl: sermon.url,
          sermonImg: sermon.sermon_img,
          seriesImg: sermon.series_img,
          sermonSeries: sermon.sermonseries,
          biblePassage: sermon.text
        };

        this.setState({
          latestSermon: lsTransformed,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  }

  getLatestSermon = () => {
    return fetch(
      `${this.props.baseUrl}all_sermons_api?limit=1&display_id=services_1`
    ).then(resp => resp.json());
  };

  render() {
    return (
      <section>
        <LatestSermon {...this.state} />
      </section>
    );
  }
}

export default function() {
  return (
    <ApiContext.Consumer>
      {({baseUrl}) => <LatestSermonContainerDrupal baseUrl={baseUrl} />}
    </ApiContext.Consumer>
  );
}
