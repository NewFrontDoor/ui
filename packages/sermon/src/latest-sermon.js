import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Text from 'mineral-ui/Text';
import {Heading} from '@newfrontdoor/base';
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
            <Link href={sermonUrl} dangerouslySetInnerHTML={{__html: title}} />
          </Text>
          <Text>{this.props.loading ? '...' : preacher}</Text>
          <Box>
            <ReactAudioPlayer controls src={sermonUrl} />
          </Box>
          <Text>
            <Link href={sermonUrl}>Download Sermon</Link>
          </Text>
        </Box>
      );
    }

    return (
      <Box element="section">
        <Heading element="h2">Latest Sermon</Heading>
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
