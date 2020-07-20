import React from 'react';
import PropTypes from 'prop-types';
import getVideoId from 'get-video-id';
import Vimeo from '@u-wave/react-vimeo';
import Youtube from '@u-wave/react-youtube';

const VideoSerializer = ({node}) => {
  const {url} = node;
  if (url) {
    const video = getVideoId(url);

    if (video.service === 'youtube') {
      return (
        <Youtube
          modestBranding
          annotations={false}
          video={video.id}
          height={360}
          width={640}
        />
      );
    }

    if (video.service === 'vimeo') {
      return <Vimeo showTitle={false} showByline={false} video={video.id} />;
    }
  }
};

VideoSerializer.propTypes = {
  node: PropTypes.object.isRequired
};
