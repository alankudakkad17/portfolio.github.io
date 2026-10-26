import { useEffect, useState } from 'react';
import { profile } from '../data';
import type { Theme } from '../hooks';
import { DownloadIcon, MoonIcon, SunIcon } from './Icons';

interface Props {
  sections: { id: string; label: string }[];
  active: string;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Nav({ sections, active, theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">AA</span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav aria-label="Main">
          <ul id="nav-menu" className={`nav-links ${open ? 'open' : ''}`}>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? 'active' : undefined} onClick={() => setOpen(false)}>
                  {s.label}
                </a>
              </li>
            ))}
            <li className="nav-cv-mobile">
              <a href={profile.cv} download="Alan_Anto_CV.pdf">Download CV</a>
            </li>
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

        <button
          className="menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
