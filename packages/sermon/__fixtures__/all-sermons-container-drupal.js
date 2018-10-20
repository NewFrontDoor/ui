import React from 'react';
import fetch from 'isomorphic-fetch';
import Box from 'mineral-ui/Box';
import Waypoint from 'react-waypoint';
import AllSermons from '../all-sermons';

// Should end in trailing slash
const BASE_DRUPAL_URL = 'https://cornerstoneapi.newfrontdoor.org/api/views/';

const PER_PAGE = 25;

class AllSermonsContainerDrupal extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      loading: true,
      loadingMore: false,
      error: null,
      totalSermons: null,
      sermonPages: null,
      sermons: [],
      page: 0
    };

    this.loadInitialSermons()
      .then(data => {
        const pages = Math.floor(data.length / PER_PAGE) + 1;
        const sr = pages > 1;
        this.setState({
          sermons: data.slice(0, PER_PAGE),
          sermonPages: pages,
          loading: false,
          sermonsRemaining: sr,
          page: 0
        });
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });

    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.getFromDrupalAPI = this.getFromDrupalAPI.bind(this);
    this.loadMoreSermons = this.loadMoreSermons.bind(this);
  }

  handleWaypointEnter() {
    if (!this.state.loadingMore && this.state.page < this.state.sermonPages) {
      this.setState({loadingMore: true});
      this.loadMoreSermons(this.state.page);
    }

    if (this.state.page === this.state.sermonPages) {
      this.setState({sermonsRemaining: false});
    }
  }

  loadInitialSermons = () => {
    return fetch(
      `${BASE_DRUPAL_URL}all_sermons_api?&display_id=services_1`
    ).then(resp => resp.json());
  };

  getFromDrupalAPI(url, callback) {
    if (url.includes('?')) {
      url += '&display_id=services_1';
    } else {
      url += '?display_id=services_1';
    }
    fetch(BASE_DRUPAL_URL + url)
      .then(resp => resp.json())
      .then(data => {
        callback(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadMoreSermons(page) {
    const that = this;
    const offset = (page + 1) * PER_PAGE;
    this.setState({page: page + 1});
    this.getFromDrupalAPI(
      'all_sermons_api?offset=' + offset + '&limit=' + PER_PAGE,
      data => {
        that.setState({
          sermons: [...that.state.sermons, ...data],
          loadingMore: false
        });
      }
    );
  }

  render() {
    return (
      <Box element="section">
        <AllSermons {...this.state} />
        {this.state.loading ||
        this.state.loadingMore ||
        !this.state.sermonsRemaining ? (
          ''
        ) : (
          <Waypoint onEnter={this.handleWaypointEnter} />
        )}
        <br />
        {this.state.loading || this.state.sermonsRemaining
          ? ''
          : 'No more sermons to load'}
      </Box>
    );
  }
}

export default AllSermonsContainerDrupal;
