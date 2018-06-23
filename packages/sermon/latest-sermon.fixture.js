import LatestSermon from './latest-sermon';

export default {
  component: LatestSermon,
  props: {
    title: 'Sermon Title',
    preacher: 'Preacher',
    datePreacher: 'Date Preached',
    downloadUrl: 'http://localhost/download_url',
    nodeUrl: 'http://localhost/node_url',
    artUrl: 'http://localhost/art_url'
  }
};
