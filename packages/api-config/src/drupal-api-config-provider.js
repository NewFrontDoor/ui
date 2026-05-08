import {createContext, useContext} from 'react';

export const ApiContext = createContext({
  baseUrl: 'https://cornerstoneapi.newfrontdoor.org/api/views/'
});

export const useApiConfig = () => useContext(ApiContext);
