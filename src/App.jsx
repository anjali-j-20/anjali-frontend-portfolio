import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
  ExternalLink,
  MapPin,
  Sparkles
} from "lucide-react";
import { profile, skills, projects, education, certifications } from "./data";

const resumePath = "/Anjali-Jha-Resume.pdf";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 650);
      const ids = ["home", "skills", "projects", "education", "contact"];
      let current = "home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 180) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelectedProject(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nav = [
    ["home", "Home"], ["skills", "Skills"], ["projects", "Projects"],
    ["education", "Education"], ["contact", "Contact"]
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="app">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <div className="grid-bg" />

      <header className="nav">
        <button className="brand" onClick={() => scrollToId("home")} aria-label="Go home">
          AJ<span>.</span>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {nav.map(([id, label]) => (
            <button
              key={id}
              className={active === id ? "active" : ""}
              onClick={() => {
                scrollToId(id);
                setMenuOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main>
        <section id="home" className="hero section">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            <motion.div variants={fadeUp} className="eyebrow">
              <span className="line" /> AVAILABLE FOR FRONTEND OPPORTUNITIES
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Hi, I'm <br />
              <span className="white">Anjali</span>
              <span className="gradient-text"> Jha</span>
            </motion.h1>

            <motion.h2 variants={fadeUp}>{profile.role}</motion.h2>

            <motion.p variants={fadeUp} className="hero-summary">{profile.summary}</motion.p>
            <motion.p variants={fadeUp} className="hero-summary muted">{profile.summary2}</motion.p>

            <motion.div variants={fadeUp} className="pills">
              {["React.js", "JavaScript", "HTML5", "CSS3", "React Hooks", "Context API", "React Router", "REST APIs"].map((x) =>
                <span key={x}>{x}</span>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="hero-actions">
              <button className="btn primary" onClick={() => scrollToId("projects")}>
                View Projects <ArrowDown size={17} />
              </button>
              <button className="btn secondary" onClick={() => scrollToId("contact")}>
                Get In Touch <ArrowUpRight size={17} />
              </button>
              <a className="btn secondary" href={resumePath} download>
                <Download size={17} /> Download Resume
              </a>
            </motion.div>
          </motion.div>

          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />
            <div className="core"><Sparkles size={24} /></div>
            <span className="floating-tag tag-1">React</span>
            <span className="floating-tag tag-2">UI</span>
            <span className="floating-tag tag-3">API</span>
          </div>

          <div className="scroll-hint"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></div>
        </section>

        <section className="stats section-tight">
          {[
            ["01", "React.js", "frontend focus"],
            ["02", "3", "major projects"],
            ["03", "8.6", "MCA CGPA"],
            ["04", "8.3", "BCA CGPA"]
          ].map(([num, value, label]) => (
            <motion.div className="stat" key={num} whileHover={{ y: -4 }}>
              <span className="stat-num">{num}</span>
              <strong>{value}</strong>
              <small>{label}</small>
            </motion.div>
          ))}
        </section>

        <section id="skills" className="section content-section">
          <SectionLabel number="01" label="EXPERTISE" />
          <SectionTitle title="Technical Skills" subtitle="Tools and concepts I use to build polished, responsive frontend experiences." />

          <div className="skill-grid">
            {skills.map((skill, i) => (
              <motion.article
                className="glass-card skill-card"
                key={skill.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
              >
                <div className="card-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <div className="tag-cloud">
                  {skill.items.map(item => <span key={item}>{item}</span>)}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="section content-section">
          <SectionLabel number="02" label="SELECTED WORK" />
          <SectionTitle title="Featured Projects" subtitle="Three applications that demonstrate my frontend development capabilities." />

          <div className="project-list">
            {projects.map((project, i) => (
              <motion.article
                className="project-card"
                key={project.number}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
              >
                <div className="project-number">{project.number}</div>
                <div className="project-main">
                  <div className="project-topline">
                    <span>{project.date}</span>
                    <div className="project-actions">
                      <a href={project.github} aria-label={`${project.title} GitHub`} onClick={(e) => project.github === "#" && e.preventDefault()}><Github size={18}/></a>
                      <a href={project.live} aria-label={`${project.title} live demo`} onClick={(e) => project.live === "#" && e.preventDefault()}><ExternalLink size={18}/></a>
                    </div>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-cloud project-tags">
                    {project.tech.map(x => <span key={x}>{x}</span>)}
                  </div>
                  <button className="text-btn" onClick={() => setSelectedProject(project)}>
                    View Details <ArrowUpRight size={16}/>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="education" className="section content-section">
          <SectionLabel number="03" label="BACKGROUND" />
          <SectionTitle title="Education & Certifications" subtitle="Academic foundation and certifications supporting my development journey." />

          <div className="education-grid">
            {education.map((item) => (
              <div className="glass-card education-card" key={item.degree}>
                <span className="mini-label">EDUCATION</span>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <strong>{item.score}</strong>
                <span>{item.period}</span>
              </div>
            ))}
          </div>

          <div className="cert-grid">
            {certifications.map((item) => (
              <div className="glass-card cert-card" key={item.title}>
                <div className="cert-year">{item.year}</div>
                <h3>{item.title}</h3>
                <p className="issuer">{item.issuer}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section content-section contact-section">
          <SectionLabel number="04" label="LET'S CONNECT" />
          <div className="contact-shell">
            <div className="contact-copy">
              <h2>Let's build something <span className="gradient-text">great.</span></h2>
              <p>I'm currently seeking a Frontend Developer role where I can build scalable, high-performance, user-centric web applications using React.js and modern frontend technologies.</p>

              <div className="contact-items">
                <a href={`mailto:${profile.email}`}><Mail size={18}/><span>{profile.email}</span></a>
                <a href={`tel:+91${profile.phone}`}><Phone size={18}/><span>+91 {profile.phone}</span></a>
                <span><MapPin size={18}/><span>{profile.location}</span></span>
              </div>

              <div className="socials">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20}/></a>
                <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={20}/></a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Name<input required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} placeholder="Your name" /></label>
              <label>Email<input required type="email" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} placeholder="you@example.com" /></label>
              <label>Message<textarea required rows="5" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} placeholder="Tell me about the opportunity..." /></label>
              <button className="btn primary submit" type="submit">{sent ? <><Check size={17}/> Email client opened</> : <>Send Message <ArrowUpRight size={17}/></>}</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>AJ.</span>
        <p>© 2026 Anjali Jha — React.js Frontend Developer</p>
        <div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${profile.email}`}>Email</a></div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && setSelectedProject(null)}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 30, scale: .97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: .98 }}
              transition={{ duration: .25 }}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close"><X /></button>
              <span className="mini-label">{selectedProject.number} / {selectedProject.date}</span>
              <h2>{selectedProject.title}</h2>
              <p className="modal-description">{selectedProject.description}</p>

              <div className="modal-columns">
                <div>
                  <h4>FEATURES</h4>
                  <ul>{selectedProject.features.map(x => <li key={x}><Check size={14}/>{x}</li>)}</ul>
                </div>
                <div>
                  <h4>TECHNOLOGIES</h4>
                  <div className="tag-cloud">{selectedProject.tech.map(x => <span key={x}>{x}</span>)}</div>
                </div>
              </div>

              <div className="highlights">
                <h4>TECHNICAL HIGHLIGHTS</h4>
                {selectedProject.highlights.map(x => <p key={x}>→ {x}</p>)}
              </div>

              <div className="modal-links">
                <a className="btn secondary" href={selectedProject.github} onClick={(e) => selectedProject.github === "#" && e.preventDefault()}><Github size={17}/> GitHub</a>
                <a className="btn primary" href={selectedProject.live} onClick={(e) => selectedProject.live === "#" && e.preventDefault()}><ExternalLink size={17}/> Live Demo</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            className="top-btn"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => scrollToId("home")}
            aria-label="Back to top"
          ><ArrowUp size={18}/></motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionLabel({ number, label }) {
  return <div className="section-label">// {number} — {label}</div>;
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default App;
