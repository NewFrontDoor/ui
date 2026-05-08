import {memo} from 'react';
import styled from '@emotion/styled';
import {PulseLoader} from 'react-spinners';
import {FaDownload} from 'react-icons/fa';

type SermonRow = {
  nid?: string | number;
  node_title?: string;
  preacher?: string;
  datepreached?: string;
  url?: string;
};

type SermonSeriesListProps = {
  loading: boolean;
  series?: unknown;
  seriesSermonList: SermonRow[];
};

type Column = {
  header: string;
  accessor: keyof SermonRow;
  isDownload?: boolean;
};

const Root = styled('td')(({theme}) => ({
  padding: '0.5em 1em' // Formerly `${theme.space_stack_sm} ${theme.space_inline_md}` but these aren't on theme, look like mineral-ui hangover
}));

const columns: Column[] = [
  {header: 'Title', accessor: 'node_title'},
  {header: 'Preacher', accessor: 'preacher'},
  {header: 'Date Preached', accessor: 'datepreached'},
  {header: 'Sermon', accessor: 'url', isDownload: true}
];

type DownloadCellProps = {
  href?: string;
};

const DownloadCell = memo(function DownloadCell({href}: DownloadCellProps) {
  return (
    <Root>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <FaDownload aria-label="Download sermon" />
        </a>
      ) : null}
    </Root>
  );
});

type TableProps = {
  data: SermonRow[];
};

function Table({data}: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={row.nid ?? row.url ?? `${row.node_title ?? 'sermon'}-${index}`}>
            {columns.map(column =>
              column.isDownload ? (
                <DownloadCell
                  key={column.accessor}
                  href={row[column.accessor]?.toString()}
                />
              ) : (
                <td key={column.accessor}>{row[column.accessor]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SermonSeriesList({
  loading,
  series: _series,
  seriesSermonList
}: SermonSeriesListProps) {
  return (
    <section>
      <PulseLoader loading={loading} size={10} />

      {!loading && (
        <section>
          <Table data={seriesSermonList} />
        </section>
      )}
    </section>
  );
}