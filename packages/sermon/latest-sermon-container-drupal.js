import React from 'react';
import {decode} from 'he';
import fetch from 'isomorphic-fetch';
import LatestSermon from './latest-sermon';

// Should end in trailing slash
const BASE_DRUPAL_URL = 'https://cornerstoneapi.newfrontdoor.org/api/views/';

class LatestSermonContainerDrupal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: '',
      latestSermon: {}
    };

    this.getLatestSermon()
      .then(ls => {
        const sermon = ls[0];
        // This transform could moved out into generic (Drupal => NFD) component structure for sermons
        const lsTransformed = {
          title: decode(sermon.node_title),
          preacher: sermon.preacher,
          datePreached: sermon.datepreached,
          sermonUrl: sermon.url,
          sermonImg: sermon.sermon_img,
          sermonSeries: sermon.sermonseries,
          biblePassage: sermon.text,
          loading: false
        };

        this.setState({
          latestSermon: lsTransformed
        });
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  }

  getLatestSermon = () => {
    return fetch(
      `${BASE_DRUPAL_URL}all_sermons_api?limit=1&display_id=services_1`
    ).then(resp => resp.json());
  };

  render() {
    return (
      <section>
        <LatestSermon {...this.state.latestSermon} />
      </section>
    );
  }
}

export default LatestSermonContainerDrupal;
