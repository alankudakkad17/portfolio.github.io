import { useEffect, useRef, useState } from 'react';

export type Theme = 'light' | 'dark';

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Light/dark theme, remembered across visits. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))] as const;
}

/**
 * Subscribe to scroll at most once per animation frame. All scroll-driven
 * state on the page goes through this, so scrolling never does extra work.
 */
export function useFrameScroll(onFrame: () => void) {
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        cb.current();
      });
    };
    cb.current();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}

/** True once the page is scrolled further than `px`. */
export function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);
  useFrameScroll(() => setPast(window.scrollY > px));
  return past;
}

/** Returns the id of the section currently in the upper part of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useFrameScroll(() => {
    // At the very bottom, short final sections can never reach the line, so pick the last one.
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      setActive(ids[ids.length - 1]);
      return;
    }
    const line = window.innerHeight * 0.35;
    let current = '';
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < line) current = id;
    }
    setActive(current);
  });
  return active;
}
