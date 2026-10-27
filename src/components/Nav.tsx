import { useEffect, useRef, useState } from 'react';
import { profile } from '../data';
import type { Theme } from '../hooks';
import { ChevronIcon, DownloadIcon, MoonIcon, SunIcon } from './Icons';

interface Props {
  sections: { id: string; label: string }[];
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
}

function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > px);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [px]);
  return past;
}

export function Nav({ sections, active, theme, onToggleTheme }: Props) {
  const scrolled = useScrolledPast(8);
  const listRef = useRef<HTMLUListElement>(null);

  // On narrow screens the section tags scroll sideways; keep the current one in view.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLAnchorElement>('a.active');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: link.offsetLeft - list.clientWidth / 2 + link.offsetWidth / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <nav aria-label="Sections">
          <ul ref={listRef} className="nav-links">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? 'active' : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="theme-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <a className="btn btn-small nav-cv" href={profile.cv} download="Alan_Anto_CV.pdf">
          <DownloadIcon size={15} /> CV
        </a>
      </div>
    </header>
  );
}

/** Floating button that appears after scrolling down and returns to the top. */
export function BackToTop() {
  const visible = useScrolledPast(600);
  return (
    <button
      className={`to-top ${visible ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <span className="to-top-icon"><ChevronIcon size={18} /></span>
    </button>
  );
}
