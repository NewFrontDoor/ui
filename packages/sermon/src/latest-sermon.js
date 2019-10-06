import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Text from 'mineral-ui/Text';
import Link from 'mineral-ui/Link';
import Box from 'mineral-ui/Box';
import PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';

function LatestSermon({title, preacher, sermonUrl, sermonImg, loading, error}) {
  return (
    <Box element="section">
      <Text as="h2">Latest Sermon</Text>
      {loading ? (
        <PulseLoader loading={loading} size={10} />
      ) : error && !loading ? (
        <Text>Unable to find latest sermon</Text>
      ) : (
        <Box>
          <Box className="latest-sermon-art">
            <img src={sermonImg} alt="Sermon Art" />
          </Box>
          <Text>
            <Link href={sermonUrl} dangerouslySetInnerHTML={{__html: title}} />
          </Text>
          <Text>{loading ? '...' : preacher}</Text>
          <Box>
            <ReactAudioPlayer controls src={sermonUrl} />
          </Box>
          <Text>
            <Link href={sermonUrl}>Download Sermon</Link>
          </Text>
        </Box>
      )}
    </Box>
  );
}

LatestSermon.propTypes = {
  latestSermon: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default LatestSermon;
