import React from 'react';

class RecentSeries extends React.PureComponent {
  static defaultProps = {
    header: 'Recent Series',
    seriesTitle: 'Series Title',
    seriesUrl: 'http://localhost/node_url',
    artUrl: 'http://localhost/art_url'
  };


  render() {
  const {header, seriesTitle, seriesUrl, artUrl, ...props} = this.props;


    return (
      <section>
        <h2>{this.props.header}</h2>
        <div className="row">
        {/*Map the four most recent to below layout*/}

          <div className="recent-series-content col-sm-3">
            <div className='sermon-art' style={{width: '260px', height: '260px'}}>
              <a href={this.props.seriesUrl}>
                <img src={this.props.artUrl} alt="Sermon Art"/>
              </a>
            </div>
            <a href={this.props.seriesUrl}>{this.props.seriesTitle}</a>
          </div>
        </div>
      </section>
    );
  }
}

export default RecentSeries;
