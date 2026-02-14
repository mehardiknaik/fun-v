import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default ({ mode }: any) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    base: env.VITE_PUBLIC_PATH || '/', // Use the env variable, or default to '/'
    // other config options
  });
};