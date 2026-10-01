import { useEffect, useState } from 'react';

/**
 * A step visual's internal sequence: while `active`, the phase advances
 * 0 → 1 → … at the given times (ms from activation) and then holds on the
 * last phase. Each activation starts again from 0. Under reduced motion the
 * final phase is shown at once. Timers are cleared on every change and on
 * unmount.
 */
export function useSequence(active: boolean, times: readonly number[], reduced: boolean): number {
  const last = times.length - 1;
  const [phase, setPhase] = useState(last);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setPhase(last);
      return;
    }
    setPhase(0);
    const timers = times.slice(1).map((t, i) => window.setTimeout(() => setPhase(i + 1), t));
    return () => timers.forEach((t) => window.clearTimeout(t));
    // `times` is a module constant per slide, so it is not a dependency.
  }, [active, reduced, last]);

  return phase;
}
