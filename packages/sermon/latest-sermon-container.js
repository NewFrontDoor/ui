import React from 'react';
import LatestSermon from './latest-sermon';
import {getLatestSermon} from '../api/drupal-api';

class LatestSermonContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: "",
      latestSermon: {}
    };

    getLatestSermon().then(ls => {
      // This transform could moved out into generic (Drupal => NFD) component structure for sermons
      let lsTransformed = {
        title: ls.node_title,
        preacher: ls.preacher,
        datePreached: ls.datepreached,
        sermonUrl: ls.url,
        artUrl: ls.arturl,
        sermonSeries: ls.sermonseries,
        biblePassage: ls.text,
        loading: false
      }

      this.setState({
        latestSermon: lsTransformed
      })
    }).catch(err => {
      this.setState({
        error: err
      })
    });
  },
  render() {
    return (
      <section>
        <LatestSermon ...this.state />
      </section>
    );
  }
}

export default LatestSermonContainer;
