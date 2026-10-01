import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { PATHS } from './src/routes';

/**
 * Base path the site is served from. Local development and previews use `/`;
 * the GitHub Pages workflow sets BASE_PATH from the Pages site
 * (`/kinage-landing-alternative/` for github.io), so a renamed repository or
 * a custom domain needs no change here.
 */
const base = (process.env.BASE_PATH ?? '/').replace(/\/*$/, '/');

/**
 * Static hosting: one index.html per page (our-story/index.html,
 * advisors/index.html) so a direct load or refresh of /our-story is served
 * the app, plus 404.html for any other path (the app shows the landing).
 */
function pageEntries(): Plugin {
  let outDir = 'dist';
  return {
    name: 'kinage-page-entries',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html');
      for (const path of Object.values(PATHS)) {
        if (path === '/') continue;
        mkdirSync(resolve(outDir, path.slice(1)), { recursive: true });
        copyFileSync(index, resolve(outDir, path.slice(1), 'index.html'));
      }
      copyFileSync(index, resolve(outDir, '404.html'));
    },
  };
}

// Port 5200 keeps it clear of the current landing (5190/5191) and the
// archived landing-local (5180); strictPort fails loudly instead of drifting.
export default defineConfig({
  base,
  plugins: [react(), pageEntries()],
  server: { port: 5200, strictPort: true },
  preview: { port: 5201, strictPort: true },
  build: { outDir: 'dist', assetsInlineLimit: 0, sourcemap: false },
});
