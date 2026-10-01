import { useRef } from 'react';
import { EarlyAccessButton } from '../components/EarlyAccess';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { FINAL } from '../content/home';
import { LINKS, SECTIONS } from '../content/links';
import { useReveal } from '../motion/useReveal';
import './FinalCta.css';

/**
 * 9 — Final call to action: the eggplant panel (24px, the reference pack's
 * large-panel radius) with the confirmed tagline, a filled + ghost pair of
 * identical size, and the advisor link.
 */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  // The panel, then its heading, text and actions (the white buttons are never moved themselves).
  useReveal(ref, { targets: '[data-reveal], .final__title, .final__lead, .final__actions, .final__advisor' });

  return (
    <section className="section section--join final" id={SECTIONS.getStarted} aria-labelledby="final-title" ref={ref}>
      <div className="container">
        <div className="final__panel on-brand" data-reveal>
          <span className="final__glow" aria-hidden="true" />
          {/* Figma 14 - FINAL CTA → "image 269": Luminosity, 80%. */}
          <span className="final__texture" aria-hidden="true" />
          <h2 className="final__title" id="final-title">
            {FINAL.title}
          </h2>
          <p className="final__lead">{FINAL.lead}</p>
          <div className="final__actions">
            <EarlyAccessButton className="btn btn--light final__btn" />
            <EarlyAccessButton mode="plans" className="btn btn--ghost-light final__btn">
              {LINKS.plans.label}
            </EarlyAccessButton>
          </div>
          <p className="final__advisor">
            Helping families professionally?{' '}
            <SmartLink to="advisorsInfo" className="arrow-link final__link">
              {LINKS.advisorsInfo.label}
              <Icon name="arrowRight" size={18} strokeWidth={2} className="arrow-link__icon" />
            </SmartLink>
          </p>
        </div>
      </div>
    </section>
  );
}
