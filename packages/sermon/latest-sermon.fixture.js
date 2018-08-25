import LatestSermon from './latest-sermon';

export default {
  component: LatestSermon,
  props: {
    title: "Sermon Title",
    preacher: "Preacher",
    datePreached: "Date Preached",
    artUrl: "http://localhost/art_url",
    sermonUrl: "http://localhost/sermon_url",
    sermonSeries: "Exodus",
    biblePassage: "Bible Passage",
    loading: false
  }
};
