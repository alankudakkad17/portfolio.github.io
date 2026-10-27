import { useState, type ReactNode } from 'react';
import { about, certifications, issuers, profile, publications, skills, timeline } from '../data';
import { OrgLogo } from './Logo';
import { ArrowIcon, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PaperIcon } from './Icons';
import { LinkRow } from './LinkRow';

/** Renders **bold** segments from plain strings in data.ts. */
function Rich({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
  )}</>;
}

/** A section with its heading in a left-hand column and content on the right. */
export function Section({ id, title, intro, tone, children }: {
  id: string; title: string; intro?: string; tone?: 'alt'; children: ReactNode;
}) {
  return (
    <section id={id} className={tone === 'alt' ? 'alt' : undefined} aria-labelledby={`${id}-title`}>
      <div className="container section-grid">
        <header className="section-head">
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p>{intro}</p>}
        </header>
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-body">
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role} in {profile.location}</p>
          <p className="hero-lead">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="btn" href={`mailto:${profile.email}`}><MailIcon /> Email me</a>
            <a className="btn btn-ghost" href={profile.cv} download="Alan_Anto_CV.pdf"><DownloadIcon /> Download CV</a>
          </div>
          <div className="hero-foot">
            <p className="status"><span className="dot" aria-hidden="true" /> {profile.availability}</p>
            <div className="hero-social">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon size={18} /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon size={18} /></a>
            </div>
          </div>
        </div>
        <div className="hero-photo">
          <picture>
            <source srcSet={profile.photo} type="image/webp" />
            <img src={profile.photoFallback} alt={`Portrait of ${profile.name}`} width={720} height={720} />
          </picture>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const facts = [
    { k: 'Based in', v: profile.location },
    { k: 'Studying', v: 'MSc Artificial Intelligence, BTU Cottbus' },
    { k: 'Focus', v: 'Agentic AI, retrieval (RAG), computer vision' },
    { k: 'Published', v: 'IEEE ICTEST 2025' },
  ];
  return (
    <div className="about">
      <div className="prose">
        {about.map((p) => <p key={p}><Rich text={p} /></p>)}
      </div>
      <dl className="facts">
        {facts.map((f) => (
          <div key={f.k}>
            <dt>{f.k}</dt>
            <dd>{f.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Experience() {
  return (
    <div className="entries">
      {timeline.filter((t) => t.kind === 'work').map((t) => (
        <article key={t.title} className="entry">
          <div className="entry-head">
            <OrgLogo src={t.logo} short={t.orgShort} name={t.org} />
            <div>
              <h3>{t.title}</h3>
              <p className="entry-org">{t.org}</p>
            </div>
            <span className="entry-date">{t.period}</span>
          </div>
          {t.points && <ul className="points indented">{t.points.map((p) => <li key={p}>{p}</li>)}</ul>}
          {t.tags && <ul className="tags indented">{t.tags.map((x) => <li key={x}>{x}</li>)}</ul>}
        </article>
      ))}
    </div>
  );
}

export function Education() {
  return (
    <div className="entries">
      {timeline.filter((t) => t.kind === 'education').map((t) => (
        <article key={t.title} className="entry">
          <div className="entry-head">
            <OrgLogo src={t.logo} short={t.orgShort} name={t.org} />
            <div>
              <h3>{t.title}</h3>
              <p className="entry-org">{t.org}</p>
            </div>
            <span className="entry-date">{t.period}</span>
          </div>
          {t.note && <p className="entry-note indented">{t.note}</p>}
        </article>
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <dl className="skill-rows">
      {skills.map((g) => (
        <div key={g.group}>
          <dt>{g.group}</dt>
          <dd><ul className="tags">{g.items.map((s) => <li key={s}>{s}</li>)}</ul></dd>
        </div>
      ))}
    </dl>
  );
}

export function Publications() {
  return (
    <div className="entries">
      {publications.map((p) => (
        <article key={p.title} className="entry">
          <div className="entry-head">
            <OrgLogo src={p.logo} short="IEEE" name={p.venueShort} />
            <div>
              <h3>{p.title}</h3>
              <p className="entry-org">{p.venue}</p>
            </div>
            <span className="entry-date">{p.date}</span>
          </div>
          <LinkRow
            className="indented"
            links={[
              { label: 'Read paper', href: p.paper, icon: <PaperIcon /> },
              { label: 'DOI', href: p.doi, icon: <ArrowIcon /> },
            ]}
          />
        </article>
      ))}
    </div>
  );
}

export function Certifications() {
  return (
    <ul className="cert-list">
      {certifications.map((c) => (
        <li key={c.name}>
          <OrgLogo src={issuers[c.issuer]?.logo} short={issuers[c.issuer]?.short ?? c.issuer.slice(0, 2)} name={c.issuer} size="sm" />
          <span className="cert-name">{c.name}</span>
          <span className="cert-issuer">{c.issuer}</span>
          <span className="cert-year">{c.year}</span>
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <div>
          <h2 id="contact-title">Get in touch</h2>
          <p>{profile.availability}. Email is the quickest way to reach me.</p>
        </div>
        <div className="contact-actions">
          <div className="contact-email">
            <a className="btn btn-light" href={`mailto:${profile.email}`}><MailIcon /> {profile.email}</a>
            <button className="btn btn-outline-light copy-btn" onClick={copy} aria-live="polite" title="Copy email">
              <CopyIcon /> <span className="copy-label">{copied ? 'Email copied' : 'Copy email'}</span>
            </button>
          </div>
          <div className="contact-social">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><GitHubIcon /> GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
