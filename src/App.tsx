import { profile } from './data';
import { useActiveSection, useTheme } from './hooks';
import { BackToTop, Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { About, Contact, Certifications, Education, Experience, Hero, Publications, Section, Skills } from './components/Sections';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav sections={SECTIONS} active={active} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Section id="about" title="About">
          <About />
        </Section>
        <Section id="experience" title="Experience" tone="alt">
          <Experience />
        </Section>
        <Section id="education" title="Education">
          <Education />
        </Section>
        <Section id="skills" title="Skills" tone="alt">
          <Skills />
        </Section>
        <Section id="projects" title="Projects" intro="Choose an area to see its projects.">
          <Projects />
        </Section>
        <Section id="publications" title="Publications" tone="alt">
          <Publications />
        </Section>
        <Section id="certifications" title="Certifications">
          <Certifications />
        </Section>
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
