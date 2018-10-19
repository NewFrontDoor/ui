import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Text from 'mineral-ui/Text';
import Link from 'mineral-ui/Link';
import Box from 'mineral-ui/Box';
import PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';

class LatestSermon extends React.PureComponent {
  render() {
    const {title, preacher, sermonUrl, sermonImg} = this.props.latestSermon;
    let content;
    if (!this.props.loading && this.props.error !== null) {
      content = <Text>Unable to find latest sermon</Text>;
    } else {
      content = (
        <Box>
          <Box className="latest-sermon-art">
            <img src={sermonImg} alt="Sermon Art" />
          </Box>
          <Text>
            <Link href={sermonUrl}>{title}</Link>
          </Text>
          <Text>{this.props.loading ? '...' : preacher}</Text>
          <Box>
            <ReactAudioPlayer src={sermonUrl} controls />
          </Box>
          <Text>
            <Link href={sermonUrl}>Download Sermon</Link>
          </Text>
        </Box>
      );
    }
    return (
      <Box element="section">
        <Text element="h2">Latest Sermon</Text>
        <PulseLoader loading={this.props.loading} size={10} />
        {this.props.loading || content}
      </Box>
    );
  }
}

LatestSermon.propTypes = {
  latestSermon: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default LatestSermon;
