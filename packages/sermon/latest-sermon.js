import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

class LatestSermon extends React.PureComponent {
  render() {
    const {title, preacher, datePreached, sermonUrl, artUrl, ...props} = this.props;
    return (
      <section>
        <h2>Latest Sermon</h2>
        <div className="latest-sermon-content">
          <div className='latest-sermon-art' style={{width: '360px', height: '270px'}}>
            <img src={artUrl} alt="Sermon Art"/>
          </div>
          <a href={sermonUrl}>{title}</a>
          <p>{preacher}</p>
          <p><ReactAudioPlayer src={sermonUrl} controls /></p>
          <a href={sermonUrl}>Download Sermon</a>
        </div>
      </section>
    );
  }
}

export default LatestSermon;
