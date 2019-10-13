import React from 'react';
import {Box, Link, Table} from 'mineral-ui';
import styled from '@emotion/styled';
import {PulseLoader} from 'react-spinners';
import {FaDownload} from 'react-icons/fa';

const Root = styled('td')(({theme}) => ({
  padding: theme.space_stack_sm + ' ' + theme.space_inline_md
}));

const CustomCell = React.memo(props => {
  return (
    <Root {...props}>
      <Link href={props.children} target="_blank" rel="noopener noreferrer">
        <FaDownload />
      </Link>
    </Root>
  );
});

const cell = ({props}) => <CustomCell {...props} />;


const celt = ({props}) => <CustomCell {...props} />;





export default function SermonSeriesList({loading, series, seriesSermonList}) {
  console.log(seriesSermonList);
  const columns = [
    {content: 'Title', key: 'title', cell: {celt}},
    {content: 'Preacher', key: 'preacher'},
    {content: 'Date Preached', key: 'datePreached'},
    {content: 'Sermon', key: 'sermonUrl', cell: cell}
  ];
  return (
    <Box element="section">
      <PulseLoader loading={loading} size={10} />
      {loading || (
        <Box element="section">
          <Table
            striped
            columns={columns}
            data={seriesSermonList}
            rowKey="title"
            title={series ? series.title : 'All Sermons'}
          />
        </Box>
      )}
    </Box>
  );
}
