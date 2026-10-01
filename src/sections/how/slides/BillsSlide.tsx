import { UpcomingTable } from '../../../components/product/UpcomingTable';
import { HOW } from '../../../content/home';
import { useSequence } from '../useSequence';

/** 0 empty · 1 rows arrive one by one · 2 the overdue bill is picked out. */
const TIMES = [0, 120, 1500] as const;

/** Step 2 — Upcoming payments (Figma 544:406), rows in urgency order. */
export function BillsSlide({ active, reduced }: { active: boolean; reduced: boolean }) {
  const phase = useSequence(active, TIMES, reduced);
  const t = HOW.table;
  return (
    <div className="bills" data-phase={phase}>
      <p className="bills__title p-ui">{t.title}</p>
      <UpcomingTable rows={t.rows} filters={t.filters} focusId={phase >= 2 ? 'att' : undefined} />
    </div>
  );
}
