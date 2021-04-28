import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const vueSvgPlugin = require('vite-plugin-vue-svg');

const envFiles = [
  /** default file */ '.env',
  /** mode file */ `.env.${process.env.ENV}`,
];
for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: process.env.VITE_HOST,
    port: parseInt(process.env.VITE_PORT),
  },
  build: {
    outDir: process.env.VITE_DIST,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueSvgPlugin({
      defaultExport: 'component',
    }),
  ],
});
