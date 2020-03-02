import React, {useContext} from 'react';

export const ApiContext = React.createContext({
  baseUrl: 'https://cornerstoneapi.newfrontdoor.org/api/views/'
});

export const useApiConfig = () => useContext(ApiContext);
