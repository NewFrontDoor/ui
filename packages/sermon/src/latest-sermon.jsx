
import {AudioPlayer} from '@newfrontdoor/audio-player';
import {PulseLoader} from 'react-spinners';

const LatestSermon = ({
  title,
  preacher,
  sermonUrl,
  sermonImg,
  seriesImg,
  loading = false,
  error
}) => {
  return (
    <section>
      <h2 sx={{variant: "styles.h2"}}>Latest Sermon</h2>
      {loading ? (
        <PulseLoader loading={loading} size={10} />
      ) : error && !loading ? (
        <p sx={{variant: "styles.p"}}>Unable to find latest sermon</p>
      ) : (
        <section>
          {(sermonImg || seriesImg) && (
            <div className="latest-sermon-art">
              <img src={sermonImg || seriesImg} alt="Sermon Art" />
            </div>
          )}
          <p>
            { }
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

/* LatestSermon.propTypes = {
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
}; */

export default LatestSermon;
