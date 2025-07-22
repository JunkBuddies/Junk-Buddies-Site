import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load .env variables based on mode (development or production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    define: {
      'process.env': {
        OPENAI_API_KEY: JSON.stringify(env.OPENAI_API_KEY || ''),
      },
    },
    build: {
      rollupOptions: {
        input: 'index.html',
      },
    },
  };
});
