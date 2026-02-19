import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';

const columns = ['Clarity', 'Consistency', 'Speed', 'Longevity', 'Value'];

type CellStatus = 'yes' | 'no' | 'partial';

interface CompetitorRow {
  label: string;
  cells: CellStatus[];
  highlight?: boolean;
}

const rows: CompetitorRow[] = [
  {
    label: 'Milktree',
    cells: ['yes', 'yes', 'yes', 'yes', 'yes'],
    highlight: true,
  },
  {
    label: 'Freelance Designer',
    cells: ['no', 'no', 'yes', 'no', 'partial'],
  },
  {
    label: 'Large Agency',
    cells: ['partial', 'yes', 'no', 'yes', 'no'],
  },
  {
    label: 'In-house Team',
    cells: ['partial', 'yes', 'no', 'partial', 'no'],
  },
  {
    label: 'DIY / Templates',
    cells: ['no', 'no', 'yes', 'no', 'yes'],
  },
  {
    label: 'Brand Consultant',
    cells: ['yes', 'no', 'partial', 'partial', 'no'],
  },
];

const cellDescriptions: Record<string, Partial<Record<CellStatus, string>>> = {
  Clarity: {
    yes: 'Strategy-first positioning',
    no: 'Style over substance',
    partial: 'Depends on brief',
  },
  Consistency: {
    yes: 'Full system, always on-brand',
    no: 'One-off deliverables',
    partial: 'Only with dedicated resource',
  },
  Speed: {
    yes: 'Fixed-scope, fast delivery',
    no: 'Long timelines',
    partial: 'Varies',
  },
  Longevity: {
    yes: 'Built to scale with you',
    no: 'Needs constant redoing',
    partial: 'If budget allows',
  },
  Value: {
    yes: 'One partner, no bloat',
    no: 'High retainers',
    partial: 'Cheap up front, costly later',
  },
};

/* ── Icons matching Supafast's size and style ── */

// Green checkmark in dark green circle — "yes" for regular rows
const YesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="rgba(99,204,121,0.15)" />
    <path d="M7.5 12l3 3 6-6" stroke="#63cc79" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// X in dark red circle — "no" for regular rows
const NoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="rgba(239,136,105,0.12)" />
    <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#ef8869" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Warning triangle — "partial"
const PartialIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L22 21H2L12 3Z" fill="rgba(255,220,4,0.12)" stroke="#FFDC04" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 10v4" stroke="#FFDC04" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="#FFDC04" />
  </svg>
);

// Black checkmark in semi-transparent circle — for yellow highlight row
const HighlightYesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.18)" />
    <path d="M7.5 12l3 3 6-6" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CellIcon: React.FC<{ status: CellStatus; highlight?: boolean }> = ({ status, highlight }) => {
  if (highlight) return <HighlightYesIcon />;
  if (status === 'yes') return <YesIcon />;
  if (status === 'no') return <NoIcon />;
  return <PartialIcon />;
};

// Small brand mark for the Milktree row label
const BrandMark = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect width="20" height="20" rx="4" fill="rgba(0,0,0,0.2)" />
    <path d="M5 14V8l5 4 5-4v6" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhyMilktree: React.FC = () => {
  return (
    <section className="compare-section" id="why">
      <div className="compare-container">

        <Reveal>
          <h2 className="compare__heading">Why founders choose Milktree</h2>
        </Reveal>

        <motion.div
          className="compare__table"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Column headers */}
          <div className="compare__header-row">
            <div className="compare__row-label" />
            {columns.map(col => (
              <div key={col} className="compare__col-header">{col}</div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row) => (
            <div
              key={row.label}
              className={`compare__row${row.highlight ? ' compare__row--highlight' : ''}`}
            >
              <div className="compare__row-label">
                {row.highlight ? (
                  <>
                    <BrandMark />
                    <span className="compare__brand-logo">milktree</span>
                  </>
                ) : (
                  row.label
                )}
              </div>
              {row.cells.map((status, ci) => (
                <div key={ci} className="compare__cell">
                  <CellIcon status={status} highlight={row.highlight} />
                  <span className="compare__cell-desc">
                    {cellDescriptions[columns[ci]]?.[status] || ''}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
