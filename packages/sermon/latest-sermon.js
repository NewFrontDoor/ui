import React from 'react';

class LatestSermon extends React.PureComponent {
  render() {
  const {header, title, preacher, datePreached, downloadUrl, nodeUrl, artUrl, ...props} = this.props;


    return (
      <section>
        <h2>{this.props.header}</h2>
        <div className="latest-sermon-content">
          <div className='latest-sermon-art' style={{width: '360px', height: '270px'}}>
            <img src={this.props.artUrl} alt="Sermon Art"/>
          </div>
          <a href={this.props.nodeUrl}>{this.props.title}</a>
          <p>{this.props.preacher}</p>
          <p>[ADD MEDIAPLAYER FOR SERMON]</p>
          <a href={this.props.downloadUrl}>Download Sermon</a>
        </div>
      </section>
    );
  }
}

export default LatestSermon;
