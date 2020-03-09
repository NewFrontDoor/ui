/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {FaDownload} from 'react-icons/fa';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  th {
    text-align: left;
    padding: 0 5px;
  }
  @media (max-width: 505px) {
    ${props =>
      props.columnHide.map(
        column => `th:nth-child(${column}) { display: none;}`
      )}
  }
`;

const Tr = styled.tr`
  background-color: ${props => (props.num % 2 ? '#eee' : '#fff')};
  border-bottom: 1px solid #ccc;
  td {
    padding: 0 5px;
  }
  @media (max-width: 505px) {
    ${props =>
      props.columnHide.map(
        column => `td:nth-child(${column}) { display: none;}`
      )}
  }
`;

const SermonTable = ({
  sermons,
  headers,
  columnHide,
  titleKey,
  sermonDirectory,
  renderLink
}) => {
  const desiredColumns = headers
    .map(item => item.key)
    .filter(word => word !== 'title');
  return (
    <Table columnHide={columnHide}>
      <thead>
        <tr>
          {headers.map(column => (
            <th key={column.key}>{column.heading}</th>
          ))}
          <tr />
        </tr>
      </thead>
      <tbody>
        {sermons.map((sermon, index) => (
          <Tr key={sermon.nid} num={index} columnHide={columnHide}>
            <td>
              {renderLink(sermonDirectory, sermon.slug, sermon[titleKey])}
            </td>
            {desiredColumns.map(item => (
              <td key={sermon.nid + item}>
                {Object.prototype.hasOwnProperty.call(sermon, item)
                  ? sermon[item]
                  : ''}
              </td>
            ))}
            <td>
              <a href={sermon.url} target="_blank" rel="noopener noreferrer">
                <FaDownload />
              </a>
            </td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

SermonTable.defaultProps = {
  sermons: [],
  headers: [],
  columnHide: [],
  titleKey: 'title',
  sermonDirectory: 'sermons',
  renderLink: () => {}
};

SermonTable.propTypes = {
  columnHide: PropTypes.array,
  headers: PropTypes.array,
  sermons: PropTypes.array,
  titleKey: PropTypes.string,
  sermonDirectory: PropTypes.string,
  renderLink: PropTypes.func
};

export default SermonTable;
