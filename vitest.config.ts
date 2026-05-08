import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({jsxImportSource: 'theme-ui'})],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['packages/**/__tests__/*.{js,jsx,ts,tsx}'],
    setupFiles: ['./vitest.setup.ts']
  }
});
