/** @jsx jsx */
import React from 'react';
import {jsx, Styled} from 'theme-ui';
import PropTypes from 'prop-types';
import {FaDownload} from 'react-icons/fa';

const SermonTable = ({
  sermons,
  headers,
  titleKey,
  sermonDirectory,
  renderLink,
  passedSx
}) => {
  const desiredColumns = headers
    .map((item) => item.key)
    .filter((word) => word !== titleKey);
  return (
    <Styled.table sx={passedSx}>
      <thead>
        <Styled.tr>
          {headers.map((column) => (
            <Styled.th
              key={column.key}
              sx={{
                display: [column.hideable ? 'none' : 'table-cell', 'table-cell']
              }}
            >
              {column.heading}
            </Styled.th>
          ))}
          <th /> {/* This is for the download column */}
        </Styled.tr>
      </thead>
      <tbody>
        {sermons.map((sermon) => (
          <Styled.tr key={sermon.nid}>
            <Styled.td>
              {renderLink(sermonDirectory, sermon.slug, sermon[titleKey])}
            </Styled.td>
            {desiredColumns.map((item) => (
              <Styled.td
                key={sermon.nid + item}
                sx={{
                  display: [item.hideable ? 'none' : 'table-cell', 'table-cell']
                }}
              >
                {Object.prototype.hasOwnProperty.call(sermon, item) &&
                  sermon[item]}
              </Styled.td>
            ))}
            <Styled.td>
              <Styled.a
                href={sermon.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload />
              </Styled.a>
            </Styled.td>
          </Styled.tr>
        ))}
      </tbody>
    </Styled.table>
  );
};

SermonTable.defaultProps = {
  sermons: [],
  headers: [],
  titleKey: 'title',
  sermonDirectory: 'sermons',
  renderLink: () => {},
  passedSx: {}
};

SermonTable.propTypes = {
  headers: PropTypes.array,
  sermons: PropTypes.array,
  titleKey: PropTypes.string,
  sermonDirectory: PropTypes.string,
  renderLink: PropTypes.func,
  passedSx: PropTypes.object
};

export default SermonTable;
