import React from 'react';

import _ from 'lodash';
import {decode} from 'he';
import PropTypes from 'prop-types';
import {FaSpinner, FaDownload} from 'react-icons/fa';

class AllSermons extends React.PureComponent {
  render() {
    const {sermons, loading, loadingMore} = this.props;

    const sermonRows = _.map(sermons, sermon => {
      return (
        <tr key={_.uniqueId()}>
          <td className="col-md-3" style={{height: '40px'}}>
            {sermon.node_title ? decode(sermon.node_title) : 'Untitled'}
          </td>
          <td className="col-md-2">{sermon.text ? decode(sermon.text) : ''}</td>
          <td className="col-md-2">
            {sermon.sermonseries ? decode(sermon.sermonseries) : ''}
          </td>
          <td className="col-md-2">{decode(sermon.preacher)}</td>
          <td className="col-md-2">{sermon.datepreached}</td>
          <td className="col-md-1">
            <a href={sermon.url} target="_blank" rel="noopener noreferrer">
              <FaDownload />
            </a>
          </td>
        </tr>
      );
    });

    const sermonTable = (
      <table>
        <thead>
          <tr>
            <th />
            <th>Passage</th>
            <th>Sermon Series</th>
            <th>Preacher</th>
            <th>Date Preached</th>
            <th />
          </tr>
        </thead>
        <tbody>{sermonRows}</tbody>
      </table>
    );

    return (
      <section>
        {loading ? <FaSpinner /> : sermonTable}
        {loadingMore ? <FaSpinner /> : ''}
      </section>
    );
  }
}

AllSermons.propTypes = {
  sermons: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired
};

export default AllSermons;
