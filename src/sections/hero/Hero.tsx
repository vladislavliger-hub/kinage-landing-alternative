import { useRef, useState, type CSSProperties } from 'react';
import { EarlyAccessButton } from '../../components/EarlyAccess';
import { SmartLink } from '../../components/SmartLink';
import { VideoPlayer } from '../../components/VideoPlayer';
import { HERO } from '../../content/home';
import { LINKS, SECTIONS } from '../../content/links';
import { EXPLAINER } from '../../content/media';
import { useReveal } from '../../motion/useReveal';
import './Hero.css';

/**
 * 1 — Hero. Desktop: copy and the two actions on the left, the explainer
 * video card on the right (about a 4.6 / 7.4 split of the 1200 grid). Below 1024px the copy
 * stacks above the video. The video sits whole in a warm-white card with a
 * lavender backing panel; the background carries the Figma "image 269"
 * texture (Color Burn, see Hero.css).
 *
 * The video keeps the file's own ratio (--hero-media-ratio, from the poster
 * and then the metadata) and its width is capped by the window height, so on
 * short laptop screens the whole frame stays in the first screen.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ratio, setRatio] = useState(EXPLAINER.width / EXPLAINER.height);
  useReveal(ref, { targets: '[data-reveal]', start: 'top bottom', stagger: 0.08 });

  return (
    <section className="hero" id={SECTIONS.top} aria-labelledby="hero-title" ref={ref}>
      <span className="hero__texture" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title" id="hero-title" data-reveal>
            {HERO.title}
          </h1>
          <p className="hero__lead" data-reveal>
            {HERO.lead}
          </p>
          <div className="hero__actions" data-reveal>
            <EarlyAccessButton className="btn btn--primary hero__btn" />
            <SmartLink to="advisorsInfo" className="btn btn--ghost hero__btn">
              {LINKS.advisorsInfo.label}
            </SmartLink>
          </div>
        </div>
        <div className="hero__media" style={{ '--hero-media-ratio': ratio } as CSSProperties} data-reveal>
          {/* Back to front: lavender backing panel → opaque warm-white card → video → play button and controls. */}
          <div className="hero__stack">
            <span className="hero__backing" aria-hidden="true" />
            <div className="hero__frame">
              <VideoPlayer
                variant="hero"
                preload="metadata"
                src={EXPLAINER.src}
                poster={EXPLAINER.poster}
                title={EXPLAINER.title}
                captions={EXPLAINER.captions}
                onShape={(w, h) => setRatio(w / h)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
