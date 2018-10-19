import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Text from 'mineral-ui/Text';
import Link from 'mineral-ui/Link';
import Box from 'mineral-ui/Box';
import PropTypes from 'prop-types';

class LatestSermon extends React.PureComponent {
  render() {
    const {title, preacher, sermonUrl, sermonImg} = this.props;
    return (
      <Box element="section">
        <Text element="h2" appearance="h4">
          Latest Sermon
        </Text>
        <Box>
          <Box className="latest-sermon-art">
            <img src={sermonImg} alt="Sermon Art" />
          </Box>
          <Text>
            <Link href={sermonUrl}>{title}</Link>
          </Text>
          <Text>{preacher}</Text>
          <Text>
            <ReactAudioPlayer src={sermonUrl} controls />
          </Text>
          <Text>
            <Link href={sermonUrl}>Download Sermon</Link>
          </Text>
        </Box>
      </Box>
    );
  }
}

LatestSermon.propTypes = {
  title: PropTypes.string.isRequired,
  preacher: PropTypes.string.isRequired,
  sermonUrl: PropTypes.string.isRequired,
  sermonImg: PropTypes.string.isRequired
};

export default LatestSermon;
