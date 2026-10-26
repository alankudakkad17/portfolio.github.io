import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works both at username.github.io/
// and at username.github.io/<repo-name>/ without changes.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    watch: {
      // Don't watch loose source images (e.g. original photos) outside public/ —
      // on Windows they can be locked by an image viewer and crash the watcher.
      ignored: (path: string) => /\.(png|jpe?g|heic)$/i.test(path) && !/[\\/]public[\\/]/.test(path),
    },
  },
});
