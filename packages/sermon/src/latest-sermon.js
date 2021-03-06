/** @jsx jsx */
import {Styled, jsx} from 'theme-ui';
import {AudioPlayer} from '@newfrontdoor/audio-player';
import PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';

const LatestSermon = ({
  title,
  preacher,
  sermonUrl,
  sermonImg,
  seriesImg,
  loading,
  error
}) => {
  return (
    <section>
      <Styled.h2>Latest Sermon</Styled.h2>
      {loading ? (
        <PulseLoader loading={loading} size={10} />
      ) : error && !loading ? (
        <Styled.p>Unable to find latest sermon</Styled.p>
      ) : (
        <section>
          {(sermonImg || seriesImg) && (
            <div className="latest-sermon-art">
              <img src={sermonImg || seriesImg} alt="Sermon Art" />
            </div>
          )}
          <p>
            {/* eslint-disable-next-line react/no-danger */}
            <a href={sermonUrl} dangerouslySetInnerHTML={{__html: title}} />
          </p>
          <p>{preacher}</p>
          <AudioPlayer hasPlaybackSpeed src={sermonUrl} />
          <a href={sermonUrl}>Download Sermon</a>
        </section>
      )}
    </section>
  );
};

LatestSermon.propTypes = {
  title: PropTypes.string,
  preacher: PropTypes.string,
  sermonUrl: PropTypes.string,
  sermonImg: PropTypes.string,
  seriesImg: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool
};

LatestSermon.defaultProps = {
  loading: false
};

export default LatestSermon;
