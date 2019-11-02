import React from 'react';
import {StyledPlayer} from '@newfrontdoor/audio-player';
import PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';

function LatestSermon({
  title,
  preacher,
  sermonUrl,
  sermonImg,
  seriesImg,
  loading,
  error
}) {
  return (
    <section>
      <h2>Latest Sermon</h2>
      {loading ? (
        <PulseLoader loading={loading} size={10} />
      ) : error && !loading ? (
        <p>Unable to find latest sermon</p>
      ) : (
        <section>
          {(sermonImg || seriesImg) && (
            <div className="latest-sermon-art">
              <img src={sermonImg || seriesImg} alt="Sermon Art" />
            </div>
          )}
          <p>
            <a href={sermonUrl} dangerouslySetInnerHTML={{__html: title}} />
          </p>
          <p>{preacher}</p>
          <StyledPlayer hasPlaybackSpeed isInvert={false} audio={sermonUrl} />
            <a href={sermonUrl}>Download Sermon</a>
        </section>
      )}
    </section>
  );
}

LatestSermon.propTypes = {
  latestSermon: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default LatestSermon;
