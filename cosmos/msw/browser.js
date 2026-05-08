import {setupWorker} from 'msw/browser';
import {handlers} from './handlers';

const worker = setupWorker(...handlers);

if (typeof window !== 'undefined' && !window.__COSMOS_MSW_STARTED__) {
  window.__COSMOS_MSW_STARTED__ = true;

  worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  });
}
