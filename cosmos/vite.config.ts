import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';

const rootUrl = new URL('../', import.meta.url);

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'theme-ui'
    })
  ],
  resolve: {
    alias: {
      '@newfrontdoor/api-config': fileURLToPath(
        new URL('packages/api-config/src/index.js', rootUrl)
      ),
      '@newfrontdoor/audio-player': fileURLToPath(
        new URL('packages/audio-player/src/index.ts', rootUrl)
      )
    }
  }
});
