// Export functions for communicating with the drupal API e.g. getLatestSermon
import fetch from "isomorphic-fetch";

//Should end in trailing slash
const BASE_DRUPAL_URL = "https://cornerstoneapi.newfrontdoor.org/";

export const getLatestSermon = () => {
  return fetch(`${DRUPAL_URL}all_sermons_api?limit=1&display_id=services_1`).then(resp => resp.json());
}
