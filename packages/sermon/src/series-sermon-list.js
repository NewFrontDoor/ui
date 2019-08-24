import React from 'react';
import { Box, Text, Table } from "mineral-ui";
import {PulseLoader} from "react-spinners";

export default function({ loading, series, seriesSermonList }) {
    const columns = [
        { content: 'Title', key: 'title' },
        { content: 'Preacher', key: 'preacher' },
        { content: 'Date Preached', key: 'datePreached' }
    ];
    return (
    <Box element="section">
      <PulseLoader loading={loading} size={10} />
      {loading || (
        <Box element="section">
            <Text element="h2">{series.title}</Text>
            <Table 
                columns={columns} 
                data={seriesSermonList} 
                rowKey="title"
                title="Sermons" />
        </Box>
      )}
    </Box>
  );
};