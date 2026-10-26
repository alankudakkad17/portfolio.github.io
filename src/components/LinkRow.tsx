import type { ReactNode } from 'react';

export interface LinkItem {
  label: string;
  href?: string;
  icon: ReactNode;
}

/**
 * Renders the links that have a URL. While developing locally, empty links are
 * shown as dashed placeholders so you can see where they will appear; they are
 * never rendered in the production build.
 */
export function LinkRow({ links, className = '' }: { links: LinkItem[]; className?: string }) {
  const filled = links.filter((l) => l.href);
  const empty = import.meta.env.DEV ? links.filter((l) => !l.href) : [];
  if (!filled.length && !empty.length) return null;

  return (
    <div className={`link-row ${className}`}>
      {filled.map((l) => (
        <a key={l.label} className="link-btn" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.icon} {l.label}
        </a>
      ))}
      {empty.map((l) => (
        <span key={l.label} className="link-btn placeholder" title="Add this URL in src/data.ts">
          {l.icon} {l.label}
        </span>
      ))}
    </div>
  );
}
