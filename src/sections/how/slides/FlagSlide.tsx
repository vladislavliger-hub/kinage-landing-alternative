import { useEffect, useState } from 'react';
import { Brand } from '../../../components/Brand';
import { UpcomingTable } from '../../../components/product/UpcomingTable';
import { HOW } from '../../../content/home';

const TYPING_DOTS_MS = 900;
const CHAR_MS = 32;
const START_MS = 450;

/**
 * Step 3 — the list stays in the background; a Kinage message appears above
 * it, shows typing, then writes "I found Martha's AT&T bill. It's overdue and
 * higher than usual." As the message names the bill, the AT&T Home Internet
 * row lights up (Overdue + Was Flagged stay on the row).
 *
 * The bubble always holds the full sentence (the untyped rest is invisible),
 * so typing never moves the table. Screen readers get the complete sentence
 * once. Timers belong to this activation and are cleared on any switch;
 * reduced motion shows the finished message and highlight at once.
 */
export function FlagSlide({ active, reduced }: { active: boolean; reduced: boolean }) {
  const a = HOW.alert;
  const full = a.message;
  const [state, setState] = useState<'hidden' | 'typing' | 'text'>('text');
  const [typed, setTyped] = useState(full.length);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setState('text');
      setTyped(full.length);
      return;
    }
    setState('hidden');
    setTyped(0);
    const timers: number[] = [];
    let interval = 0;
    timers.push(window.setTimeout(() => setState('typing'), START_MS));
    timers.push(
      window.setTimeout(() => {
        setState('text');
        let n = 0;
        interval = window.setInterval(() => {
          n += 1;
          setTyped(n);
          if (n >= full.length) window.clearInterval(interval);
        }, CHAR_MS);
      }, START_MS + TYPING_DOTS_MS),
    );
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(interval);
    };
  }, [active, reduced, full]);

  const named = full.indexOf(a.highlightAt) + a.highlightAt.length;
  const highlighted = state === 'text' && typed >= named;

  return (
    <div className="flag2">
      <div className="kmsg p-ui" data-state={state}>
        {/* The navigation's own lockup, scaled down whole: it names the sender. */}
        <Brand className="kmsg__logo" />
        <div className="kmsg__body">
          <p className="kmsg__bubble">
            <span className="kmsg__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="kmsg__text" aria-hidden="true">
              <span>{full.slice(0, typed)}</span>
              <span className="kmsg__rest">{full.slice(typed)}</span>
            </span>
            <span className="sr-only">{full}</span>
          </p>
        </div>
      </div>
      <UpcomingTable rows={HOW.table.rows} extraBadges={{ att: ['flagged'] }} highlightId={highlighted ? 'att' : undefined} />
    </div>
  );
}
