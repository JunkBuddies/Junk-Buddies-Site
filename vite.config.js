import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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
