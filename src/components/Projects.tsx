import { useMemo, useState } from 'react';
import { projects, type Category, type Project } from '../data';
import { ChevronIcon, GitHubIcon } from './Icons';
import { LinkRow } from './LinkRow';

/** Cards shown before the "Show more" toggle (three rows of two on desktop). */
const INITIAL_COUNT = 6;

const FILTERS: ('All' | Category)[] = ['All', 'Agents', 'RAG', 'ML/DL', 'Vision', 'NLP'];

function count(filter: 'All' | Category) {
  return filter === 'All' ? projects.length : projects.filter((p) => p.categories.includes(filter)).length;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <h3>{project.title}</h3>
      {project.badge && <span className="badge">{project.badge}</span>}
      <p>{project.summary}</p>
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

export function Projects() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const shown = expanded ? visible : visible.slice(0, INITIAL_COUNT);
  const hiddenCount = visible.length - INITIAL_COUNT;

  const collapse = () => {
    setExpanded(false);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="filters" role="toolbar" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button key={f} className={`chip ${filter === f ? 'on' : ''}`} aria-pressed={filter === f} onClick={() => { setFilter(f); setExpanded(false); }}>
            {f} <span className="chip-count">{count(f)}</span>
          </button>
        ))}
      </div>
      <div id="project-grid" className="project-grid">
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
