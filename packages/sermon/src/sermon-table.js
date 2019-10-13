import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
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

export default function SermonTable({sermons, headers, columnHide}) {
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
              <a
                href={`/sermon/${sermon.nid}`}
                dangerouslySetInnerHTML={{
                  __html: sermon.node_title ? sermon.node_title : 'untitled'
                }}
              />
            </td>
            {desiredColumns.map(item => (
              <td key={sermon.nid + item}>
                {sermon.hasOwnProperty(item) ? sermon[item] : ''}
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
}

SermonTable.defaultProps = {
  columnHide: []
};

SermonTable.propTypes = {
  columnHide: PropTypes.array,
  headers: PropTypes.array.isRequired,
  sermons: PropTypes.array.isRequired
};
