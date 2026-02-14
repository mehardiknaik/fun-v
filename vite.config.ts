import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default () => {

  return defineConfig({
    plugins: [react()],
    base: '/fun-v/', // Use the env variable, or default to '/'
    // other config options
  });
}