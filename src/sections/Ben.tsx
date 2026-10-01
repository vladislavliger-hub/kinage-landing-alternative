import { useRef } from 'react';
import ben from '../assets/images/ben-terk.webp';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { BEN } from '../content/home';
import { LINKS, SECTIONS } from '../content/links';
import { useReveal } from '../motion/useReveal';
import './Ben.css';

/**
 * 7 — Ben. His own words from the Q&A script (Q1), shortened, in a white
 * card with his photo; the full story is on /our-story.
 */
export function Ben() {
  const ref = useRef<HTMLElement>(null);
  // Photo, then the copy in reading order: title, quote, signature, button.
  useReveal(ref, { targets: '.ben__photo, .ben__copy > *' });

  return (
    <section className="section ben" id={SECTIONS.story} aria-labelledby="ben-title" ref={ref}>
      <div className="container">
        <div className="ben__card">
          <figure className="ben__photo">
            <img src={ben} alt="Ben Terk" width={560} height={690} loading="lazy" decoding="async" />
          </figure>
          <div className="ben__copy">
            <h2 className="section-title ben__title" id="ben-title">
              {BEN.title}
            </h2>
            <blockquote className="ben__quote">
              {BEN.quote.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </blockquote>
            <p className="ben__sign">
              <strong>{BEN.name}</strong>
              <span>{BEN.role}</span>
            </p>
            {/* The entrance moves this wrapper; the button keeps its own press transform. */}
            <div className="ben__action">
              <SmartLink to="story" className="btn btn--ghost ben__link">
                {LINKS.story.label}
                <Icon name="arrowRight" size={18} strokeWidth={2} className="btn__icon ben__arrow" />
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
