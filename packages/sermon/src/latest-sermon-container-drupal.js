import React from 'react';
import {useApiConfig} from '@newfrontdoor/api-config';
import ky from 'ky-universal';
import {useQuery} from 'react-query';
import LatestSermon from './latest-sermon';

async function getLatestSermon(prefixUrl, path, searchParams) {
  const [sermon] = await ky(path, {prefixUrl, searchParams}).json();

  // This transform could moved out into generic (Drupal => NFD) component structure for sermons
  return {
    title: sermon.node_title,
    preacher: sermon.preacher,
    datePreached: sermon.datepreached,
    sermonUrl: sermon.url,
    sermonImg: sermon.sermon_img,
    seriesImg: sermon.series_img,
    sermonSeries: sermon.sermonseries,
    biblePassage: sermon.text
  };
}

const LatestSermonContainerDrupal = () => {
  const {baseUrl} = useApiConfig();
  const {status, data, error} = useQuery(
    [baseUrl, 'all_sermons_api', {limit: 1, display_id: 'services_1'}],
    getLatestSermon
  );

  return (
    <section>
      <LatestSermon error={error} loading={status === 'loading'} {...data} />
    </section>
  );
};

export default LatestSermonContainerDrupal;
