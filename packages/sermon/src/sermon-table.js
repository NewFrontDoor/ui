/** @jsx jsx */
import React from 'react';
import {jsx, Styled} from 'theme-ui';
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
  tr:nth-of-type(even) {
    background-color: #eee
  }
  @media (max-width: 505px) {
    ${props =>
      props.columnHide.map(
        column => `th:nth-of-type(${column}) { display: none;}`
      )}
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid #ccc;
  td {
    padding: 0 5px;
  }
  @media (max-width: 505px) {
    ${props =>
      props.columnHide.map(
        column => `td:nth-of-type(${column}) { display: none;}`
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
        <Styled.tr>
          {headers.map(column => (
            <Styled.th key={column.key}>{column.heading}</Styled.th>
          ))}
          <th />
        </Styled.tr>
      </thead>
      <tbody>
        {sermons.map((sermon) => (
          <Tr key={sermon.nid} columnHide={columnHide}>
            <Styled.td>
              {renderLink(sermonDirectory, sermon.slug, sermon[titleKey])}
            </Styled.td>
            {desiredColumns.map(item => (
              <Styled.td key={sermon.nid + item}>
                {Object.prototype.hasOwnProperty.call(sermon, item) && sermon[item]}
              </Styled.td>
            ))}
            <Styled.td>
              <Styled.a href={sermon.url} target="_blank" rel="noopener noreferrer">
                <FaDownload />
              </Styled.a>
            </Styled.td>
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
