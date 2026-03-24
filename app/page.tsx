"use client";

import { useState, useEffect } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Experience", "Projects", "Skills"];

const SKILLS = {
  "Programming & Data": ["Python", "Java", "SQL", "AMPL", "MATLAB", "SolidWorks", "API Integration"],
  "AI & Automation": ["Machine Learning", "Deep Learning", "LLM Workflows", "Predictive Analytics", "n8n", "Prompt Engineering"],
  "Project Management": ["Agile", "Process Mapping", "Stakeholder Communication", "Gantt / Roadmaps", "Documentation"],
};

const EXPERIENCE = [
  {
    role: "Junior Equity Analyst",
    company: "SGC Capital",
    location: "Toronto, CA",
    period: "Aug 2024 – Mar 2025",
    bullets: [
      "Leveraged automated data retrieval pipelines and financial APIs to streamline portfolio analysis",
      "Drove a 30% portfolio increase within one month via strategic analysis and market forecasting",
    ],
  },
  {
    role: "Process Optimization Intern",
    company: "The Knowledge Society",
    location: "Dubai, UAE",
    period: "Jun 2024 – Aug 2024",
    bullets: [
      "Mapped workflows, identified gaps, and implemented improved digital processes — boosting efficiency by 25%",
      "Built data-driven outreach workflows increasing reach by 10–15%",
    ],
  },
  {
    role: "Project Manager",
    company: "Premuni",
    location: "Toronto, CA",
    period: "Jan 2024 – May 2024",
    bullets: [
      "Led a 6-person team to design a sustainable refrigeration-free logistics system for frozen goods in Zambia",
      "Managed full project lifecycle: scope, timelines, budgets, Gantt charts, and stakeholder alignment",
    ],
  },
];

const PROJECTS = [
  {
    title: "Skin Cancer Detection — SE-CNN",
    period: "Aug – Nov 2025",
    description:
      "Built a Squeeze-and-Excitation CNN in PyTorch for melanoma detection on HAM10000 (10K+ images). Achieved 75% validation accuracy, outperforming baseline CNN by ~11% on key diagnostic classes via custom channel-attention and class-weighted training.",
    tags: ["PyTorch", "Deep Learning", "CNN", "Computer Vision"],
    github: "https://github.com/jaounial",
  },
  {
    title: "Fully Automated Newsletter Workflow",
    period: "Jul – Aug 2025",
    description:
      "End-to-end content pipeline using n8n with integrated APIs for content sourcing, LLM-assisted summarization, tagging, and automated email distribution — saving 10+ hours of manual work per week.",
    tags: ["n8n", "LLM", "Automation", "API"],
    github: "https://github.com/jaounial",
  },
  {
    title: "Kelly Criterion Risk Assessment Simulator",
    period: "Jan – Mar 2025",
    description:
      "Python trading simulator using yfinance APIs, automating SMA crossover backtesting to compute win rates, payoff ratios, and optimal Kelly position sizing — reducing manual research time by ~90%.",
    tags: ["Python", "Finance", "Backtesting", "yfinance"],
    github: "https://github.com/jaounial",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded border border-[#272727] text-[#888888] bg-[#141414]">
      {label}
    </span>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[#f5c518] font-mono text-sm">{"// "}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-[#e8e8e8]">{text}</h2>
      <div className="flex-1 h-px bg-[#272727]" />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur border-b border-[#1a1a1a]" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="font-mono text-[#f5c518] text-sm font-medium tracking-wider">
          AJ<span className="cursor-blink ml-0.5 text-[#888888]">_</span>
        </a>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-[#888888] hover:text-[#f5c518] transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          <a
            href="mailto:ali.jaouni@mail.utoronto.ca"
            className="text-sm px-3 py-1.5 rounded border border-[#f5c518] text-[#f5c518] hover:bg-[#f5c518] hover:text-[#0a0a0a] transition-all duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto px-6 pt-14"
    >
      <div className="animate-fade-up">
        <p className="font-mono text-[#f5c518] text-sm mb-4 tracking-widest uppercase">
          Hello, I&apos;m
        </p>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-[#e8e8e8] leading-none mb-4">
          Ali Jaouni
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-[#888888] mb-6">
          Industrial Engineering{" "}
          <span className="text-[#e8e8e8]">@ University of Toronto</span>
        </h2>
        <p className="text-[#888888] max-w-xl text-base leading-relaxed mb-10">
          Building at the intersection of{" "}
          <span className="text-[#f5c518]">AI</span>,{" "}
          <span className="text-[#f5c518]">automation</span>, and systems thinking.
          Minor in Artificial Intelligence & Engineering Business.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#projects"
            className="px-5 py-2.5 bg-[#f5c518] text-[#0a0a0a] font-semibold text-sm rounded hover:bg-[#c49a10] transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="https://linkedin.com/in/ali-jaouni"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[#272727] text-[#888888] text-sm rounded hover:border-[#f5c518] hover:text-[#f5c518] transition-all duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/jaounial"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[#272727] text-[#888888] text-sm rounded hover:border-[#f5c518] hover:text-[#f5c518] transition-all duration-200"
          >
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-auto pb-10 flex items-center gap-2 text-[#444]">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#444]" />
        <span className="font-mono text-xs rotate-90 origin-left ml-3">scroll</span>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-24">
      <SectionLabel text="About" />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4 text-[#888888] leading-relaxed">
          <p>
            I&apos;m a 3rd-year{" "}
            <span className="text-[#e8e8e8]">Industrial Engineering</span> student at
            UofT with minors in{" "}
            <span className="text-[#f5c518]">Artificial Intelligence</span> and{" "}
            <span className="text-[#f5c518]">Engineering Business</span>. I care
            about building systems that actually work — from ML models to
            automated pipelines to financial simulators.
          </p>
          <p>
            I&apos;ve worked across fintech, edtech, and logistics, always finding
            ways to cut inefficiency and add precision through data and
            automation.
          </p>
          <p>
            Outside of engineering: football, running (Dubai Marathon 2024),
            4+ years of weightlifting, and travel.
          </p>
        </div>
        <div className="space-y-3">
          {[
            { label: "Degree", value: "BASc Industrial Engineering" },
            { label: "School", value: "University of Toronto" },
            { label: "Graduation", value: "May 2028 (Expected)" },
            { label: "Minors", value: "Artificial Intelligence · Engineering Business" },
            { label: "Coursework", value: "Data Modelling · ML · Deep Learning · Data Science" },
            { label: "Languages", value: "English (Fluent) · Arabic (Native)" },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-4 py-2 border-b border-[#1a1a1a]">
              <span className="font-mono text-[#f5c518] text-xs w-24 flex-shrink-0 pt-0.5">
                {label}
              </span>
              <span className="text-[#888888] text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-24">
      <SectionLabel text="Experience" />
      <div className="space-y-6">
        {EXPERIENCE.map((exp, i) => (
          <div
            key={i}
            className="group p-6 rounded-lg bg-[#141414] border border-[#1e1e1e] hover:border-[#f5c518]/30 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
              <div>
                <h3 className="font-semibold text-[#e8e8e8] text-base">{exp.role}</h3>
                <p className="text-[#f5c518] text-sm font-mono">
                  {exp.company}{" "}
                  <span className="text-[#555] font-sans">· {exp.location}</span>
                </p>
              </div>
              <span className="font-mono text-xs text-[#555] whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <ul className="space-y-2">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex gap-3 text-sm text-[#888888]">
                  <span className="text-[#f5c518] mt-1 flex-shrink-0">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
      <SectionLabel text="Projects" />
      <div className="grid md:grid-cols-3 gap-5">
        {PROJECTS.map((proj, i) => (
          <div
            key={i}
            className="group flex flex-col p-6 rounded-lg bg-[#141414] border border-[#1e1e1e] hover:border-[#f5c518]/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="font-mono text-[#f5c518] text-xl">◆</span>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#444] hover:text-[#f5c518] transition-colors text-xs font-mono"
              >
                GitHub ↗
              </a>
            </div>
            <h3 className="font-semibold text-[#e8e8e8] text-base mb-1 leading-snug">
              {proj.title}
            </h3>
            <p className="font-mono text-[#444] text-xs mb-3">{proj.period}</p>
            <p className="text-[#777] text-sm leading-relaxed flex-1 mb-4">
              {proj.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {proj.tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-24">
      <SectionLabel text="Skills" />
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category} className="p-6 rounded-lg bg-[#141414] border border-[#1e1e1e]">
            <h3 className="font-mono text-[#f5c518] text-xs uppercase tracking-widest mb-4">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-[#888888] hover:text-[#e8e8e8] transition-colors duration-200"
                >
                  {skill}
                  {items.indexOf(skill) < items.length - 1 && (
                    <span className="text-[#2a2a2a] ml-2">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#141414] py-12 mt-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[#f5c518] text-sm mb-1">Ali Jaouni</p>
          <p className="text-[#444] text-xs">
            ali.jaouni@mail.utoronto.ca · +1 (647) 724-7737
          </p>
        </div>
        <div className="flex gap-5">
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/ali-jaouni" },
            { label: "GitHub", href: "https://github.com/jaounial" },
            { label: "Email", href: "mailto:ali.jaouni@mail.utoronto.ca" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-[#444] hover:text-[#f5c518] text-sm transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
