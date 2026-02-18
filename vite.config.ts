import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env vars from the current directory
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // CHANGE: set this to your repository name
    base: '/portfoliosite/', 
    plugins: [react()],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
