import { withBase } from '../lib/base';

/**
 * The explainer video — the one final export already used on this page
 * (public/media/kinage-explainer.mp4, 63.5 s). `width` / `height` were read
 * from the file itself (1920 × 1080, square pixels) and only give the player
 * its first shape; the player re-reads the poster's and the file's own size
 * at runtime and follows those.
 */
export const EXPLAINER = {
  src: withBase('/media/kinage-explainer.mp4'),
  poster: withBase('/media/kinage-explainer-poster.jpg'),
  captions: { src: withBase('/media/kinage-explainer.en.vtt'), srclang: 'en', label: 'English' },
  title: 'Kinage explainer',
  width: 1920,
  height: 1080,
} as const;
