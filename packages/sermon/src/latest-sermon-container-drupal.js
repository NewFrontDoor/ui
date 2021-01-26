/** @jsx jsx */
import {jsx} from 'theme-ui';
import {useApiConfig} from '@newfrontdoor/api-config';
import ky from 'ky';
import {useQuery} from 'react-query';
import LatestSermon from './latest-sermon';

function useLatestSermon(prefixUrl, path, searchParameters) {
  return useQuery([prefixUrl, path, searchParameters], async () => {
    const [sermon] = await ky(path, {
      prefixUrl,
      searchParams: searchParameters
    }).json();

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
  });
}

const LatestSermonContainerDrupal = () => {
  const {baseUrl} = useApiConfig();
  const {status, data, error} = useLatestSermon(baseUrl, 'all_sermons_api', {
    limit: 1,
    display_id: 'services_1'
  });

  return (
    <section>
      <LatestSermon error={error} loading={status === 'loading'} {...data} />
    </section>
  );
};

export default LatestSermonContainerDrupal;
