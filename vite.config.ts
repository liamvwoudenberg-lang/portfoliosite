import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Using '.' instead of process.cwd() to avoid type errors with global process definition
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});