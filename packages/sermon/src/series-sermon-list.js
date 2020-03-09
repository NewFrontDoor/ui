/** @jsx jsx */
import React from 'react';
import {jsx} from 'theme-ui';
import styled from '@emotion/styled';
import {PulseLoader} from 'react-spinners';
import {FaDownload} from 'react-icons/fa';
import {useTable} from 'react-table';

const Root = styled('td')(({theme}) => ({
  padding: theme.space_stack_sm + ' ' + theme.space_inline_md
}));

const CustomCell = React.memo(props => {
  return (
    <Root {...props}>
      <a href={props.children} target="_blank" rel="noopener noreferrer">
        <FaDownload />
      </a>
    </Root>
  );
});

const cell = ({props}) => <CustomCell {...props} />;

const Table = ({data}) => {
  const columns = [
    {Header: 'Title', accessor: 'node_title'},
    {Header: 'Preacher', accessor: 'preacher'},
    {Header: 'Date Preached', accessor: 'datepreached'},
    {Header: 'Sermon', accessor: 'url', Cell: cell}
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    data,
    columns
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default function SermonSeriesList({loading, series, seriesSermonList}) {
  return (
    <section>
      <PulseLoader loading={loading} size={10} />
      {loading || (
        <section>
          <Table data={seriesSermonList} />
        </section>
      )}
    </section>
  );
}
