import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { projects, type Category, type Project } from '../data';
import { ChevronIcon, GitHubIcon } from './Icons';
import { LinkRow } from './LinkRow';

/** Cards shown per area before the "Show more" toggle (two rows of two on desktop). */
const INITIAL_COUNT = 4;

const AREAS: Category[] = ['Agents', 'RAG', 'ML/DL', 'Vision', 'NLP'];

function inArea(area: Category) {
  return projects.filter((p) => p.categories.includes(area));
}

/** Description clamped to three lines, with a toggle only when it actually overflows. */
function Description({ text, id }: { text: string; id: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const clampedHeight = useRef(0);
  const startHeight = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || open) return;
    const measure = () => {
      clampedHeight.current = el.clientHeight;
      setOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  // Animate the height between the clamped and full text.
  useLayoutEffect(() => {
    const el = ref.current;
    const from = startHeight.current;
    startHeight.current = null;
    if (!el || from === null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const to = open ? el.scrollHeight : clampedHeight.current;
    el.style.height = `${from}px`;
    void el.offsetHeight; // commit the start height before transitioning
    el.style.height = `${to}px`;
    const done = () => { el.style.height = ''; };
    el.addEventListener('transitionend', done, { once: true });
    const fallback = window.setTimeout(done, 400);
    return () => window.clearTimeout(fallback);
  }, [open]);

  const toggle = () => {
    startHeight.current = ref.current?.offsetHeight ?? null;
    setOpen(!open);
  };

  return (
    <div className="desc">
      <p id={id} ref={ref} className={open ? undefined : 'clamped'}>{text}</p>
      {(overflows || open) && (
        <button className="read-more" aria-expanded={open} aria-controls={id} onClick={toggle}>
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const id = `desc-${project.title.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      {project.badge && <span className="badge">{project.badge}</span>}
      <Description text={project.summary} id={id} />
      <ul className="tags">
        {project.tags.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <LinkRow
        className="project-links"
        links={[{ label: 'View on GitHub', href: project.github, icon: <GitHubIcon size={15} /> }]}
      />
    </article>
  );
}

type Box = { left: number; top: number; width: number; height: number };

export function Projects() {
  const [area, setArea] = useState<Category>(AREAS[0]);
  const [expanded, setExpanded] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<Box | null>(null);

  const visible = useMemo(() => inArea(area), [area]);
  const shown = expanded ? visible : visible.slice(0, INITIAL_COUNT);
  const hiddenCount = visible.length - INITIAL_COUNT;

  // Slide the highlight behind the selected area button.
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const place = () => {
      const btn = bar.querySelector<HTMLButtonElement>('.chip.on');
      if (btn) setIndicator({ left: btn.offsetLeft, top: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [area]);

  const collapse = () => {
    setExpanded(false);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div ref={barRef} className="filters" role="toolbar" aria-label="Project areas">
        {indicator && (
          <span
            className="chip-indicator"
            aria-hidden="true"
            style={{ transform: `translate(${indicator.left}px, ${indicator.top}px)`, width: indicator.width, height: indicator.height }}
          />
        )}
        {AREAS.map((a) => (
          <button key={a} className={`chip ${area === a ? 'on' : ''}`} aria-pressed={area === a} onClick={() => { setArea(a); setExpanded(false); }}>
            {a} <span className="chip-count">{inArea(a).length}</span>
          </button>
        ))}
      </div>
      {/* key={area} remounts the grid so it cross-fades on every switch */}
      <div id="project-grid" key={area} className="project-grid">
        {shown.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>
      {hiddenCount > 0 && (
        <div className="more-wrap">
          <button
            className={`more-btn ${expanded ? 'open' : ''}`}
            aria-expanded={expanded}
            aria-controls="project-grid"
            onClick={expanded ? collapse : () => setExpanded(true)}
          >
            {expanded ? 'Show fewer projects' : `Show ${hiddenCount} more project${hiddenCount > 1 ? 's' : ''}`}
            <ChevronIcon size={16} />
          </button>
        </div>
      )}
    </>
  );
}
