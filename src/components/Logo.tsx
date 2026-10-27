import { useState } from 'react';

/**
 * Organisation logo. Shows the image when a path is given and loads;
 * otherwise falls back to a neutral badge with the short name.
 */
export function OrgLogo({ src, short, name, size = 'md' }: {
  src?: string; short: string; name: string; size?: 'sm' | 'md';
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <span className={`org-logo ${size}`} aria-hidden={!showImage}>
      {showImage
        ? <img src={src} alt={`${name} logo`} onError={() => setFailed(true)} />
        : <span className="org-short">{short}</span>}
    </span>
  );
}

/** Personal monogram: two A's sharing one stroke. */
export function Monogram({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 25 10.25 7 16 25 21.75 7 27.5 25" />
      <path d="M7.4 18.5h5.7M18.9 18.5h5.7" />
    </svg>
  );
}
