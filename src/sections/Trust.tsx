import { useRef } from 'react';
import { Icon, type IconName } from '../components/Icon';
import { TRUST } from '../content/home';
import { SECTIONS } from '../content/links';
import { useReveal } from '../motion/useReveal';
import './Trust.css';

/**
 * 6 — Security and control, on the cream band. Three white cards with Mist
 * Violet icon tiles: what Kinage can see, what it can't do, what the parent
 * decides. Only points confirmed in several sources (read-only via Plaid, no
 * money movement, no bank passwords or SSN, cannot see cash or calls,
 * disconnect any time).
 */
export function Trust() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { targets: '[data-reveal], .trust__card' });

  return (
    <section className="section section--warm trust" id={SECTIONS.security} aria-labelledby="trust-title" ref={ref}>
      <div className="container">
        <header className="section-head" data-reveal>
          <h2 className="section-title" id="trust-title">
            {TRUST.title}
          </h2>
          <p className="section-lead">{TRUST.lead}</p>
        </header>

        <ul className="trust__grid">
          {TRUST.columns.map((col) => (
            <li className="trust__card surface-card" key={col.title} data-kind={col.icon}>
              <span className="icon-tile" aria-hidden="true">
                <Icon name={col.icon as IconName} />
              </span>
              <h3 className="trust__title">{col.title}</h3>
              <ul className="trust__points">
                {col.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
