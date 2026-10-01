import { useRef } from 'react';
import bill from '../assets/3d/bill-trim.webp';
import family from '../assets/3d/family-trim.webp';
import scam from '../assets/3d/scam-trim.webp';
import { Icon } from '../components/Icon';
import { PROBLEM } from '../content/home';
import { SECTIONS } from '../content/links';
import { gsap, ScrollTrigger, useGSAP } from '../motion/gsap';
import { MOTION, MQ } from '../motion/tokens';
import { useReveal } from '../motion/useReveal';
import './Problem.css';

/**
 * The three rendered objects, each trimmed to its visible pixels (no
 * transparent padding) so one shared image box gives them the same apparent
 * size. Intrinsic sizes are the trimmed files' own.
 */
const IMAGES: Record<string, { src: string; width: number; height: number }> = {
  bill: { src: bill, width: 480, height: 461 },
  scam: { src: scam, width: 480, height: 474 },
  family: { src: family, width: 480, height: 453 },
};

/**
 * 2 — Problem → visibility. Three white cards on one shared row structure
 * (image · title · body · "With Kinage"): the grid's rows are shared through
 * subgrid, so titles, bodies, dividers and benefit rows line up across the
 * cards whatever the copy length. One sourced figure below.
 */
export function Problem() {
  const ref = useRef<HTMLElement>(null);
  // Heading and the figure: the shared reveal.
  useReveal(ref, { targets: '[data-reveal]' });

  // Cards: surface first, then its illustration (~120ms later), then title and
  // text overlapping it, then the "With Kinage" row. Each card has its own
  // timeline; cards entering together are staggered across the row, and on
  // phones each card starts as it comes into view. Only nested layers move;
  // everything ends exactly at its layout position (props cleared).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
        if (!motion || !ref.current) return;
        const y = mobile ? MOTION.distance.revealMobile : MOTION.distance.reveal;
        const d = MOTION.duration.reveal;
        const timelines = new Map<Element, gsap.core.Timeline>();
        gsap.utils.toArray<HTMLElement>('.problem__card', ref.current).forEach((card) => {
          const art = card.querySelector('.problem__img');
          const text = card.querySelectorAll('.problem__title, .problem__body');
          const answer = card.querySelector('.problem__answer');
          const clear = { clearProps: 'transform,visibility,opacity' };
          gsap.set(card, { autoAlpha: 0, y });
          gsap.set([art, ...text, answer], { autoAlpha: 0, y: y * 0.6 });
          const tl = gsap.timeline({ paused: true, defaults: { ease: 'kinage.out', duration: d } });
          tl.to(card, { autoAlpha: 1, y: 0, ...clear })
            .to(art, { autoAlpha: 1, y: 0, ...clear }, 0.12)
            .to(text, { autoAlpha: 1, y: 0, stagger: 0.08, ...clear }, 0.22)
            .to(answer, { autoAlpha: 1, y: 0, ...clear }, 0.36);
          timelines.set(card, tl);
        });
        ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>('.problem__card', ref.current), {
          start: MOTION.trigger.revealStart,
          once: true,
          // A paused timeline ignores delay(): start each one 120ms after the previous card in the row.
          onEnter: (batch) => batch.forEach((card, k) => gsap.delayedCall(k * 0.12, () => timelines.get(card)?.play())),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section className="section problem" id={SECTIONS.problem} aria-labelledby="problem-title" ref={ref}>
      <div className="container">
        <header className="section-head" data-reveal>
          <h2 className="section-title" id="problem-title">
            {PROBLEM.title}
          </h2>
          <p className="section-lead">{PROBLEM.lead}</p>
        </header>

        <ul className="problem__cards">
          {PROBLEM.cards.map((c) => {
            const img = IMAGES[c.image];
            return (
              <li className="problem__card surface-card" key={c.title}>
                <span className="problem__art">
                  <img className="problem__img" src={img.src} alt="" width={img.width} height={img.height} loading="lazy" decoding="async" />
                </span>
                <h3 className="problem__title">{c.title}</h3>
                <p className="problem__body">{c.body}</p>
                <p className="problem__answer">
                  <span className="problem__check" aria-hidden="true">
                    <Icon name="check" size={14} strokeWidth={2.4} />
                  </span>
                  <span>
                    <strong>With Kinage:</strong> {c.withKinage}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>

        <figure className="problem__stat" data-reveal>
          <p className="problem__stat-value">{PROBLEM.stat.value}</p>
          <figcaption className="problem__stat-text">
            <span>{PROBLEM.stat.text}</span>
            <small>{PROBLEM.stat.source}</small>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
