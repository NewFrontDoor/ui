import React from 'react';
import {decode} from 'he';
import fetch from 'isomorphic-fetch';
import Box from 'mineral-ui/Box';
import config from 'react-global-configuration';
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
          title: decode(sermon.node_title),
          preacher: sermon.preacher,
          datePreached: sermon.datepreached,
          sermonUrl: sermon.url,
          sermonImg: sermon.sermon_img,
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
      `${config.get(
        'DRUPAL_BASE_API_URL'
      )}all_sermons_api?limit=1&display_id=services_1`
    ).then(resp => resp.json());
  };

  render() {
    return (
      <Box element="section">
        <LatestSermon {...this.state} />
      </Box>
    );
  }
}

export default LatestSermonContainerDrupal;
