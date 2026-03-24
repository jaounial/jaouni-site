"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Download,
  Brain,
  Workflow,
  TrendingUp,
  GitFork,
  ExternalLink,
  Terminal,
  Cpu,
  Network,
  BarChart3,
  Activity,
  Zap,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Experience", "Projects", "Skills"];

const HERO_ROLES = [
  "Industrial Engineer",
  "AI / ML Builder",
  "Automation Engineer",
  "Systems Thinker",
];

const SKILLS = {
  "Programming & Data": {
    icon: Cpu,
    items: [
      { name: "Python", level: 92 },
      { name: "SQL", level: 80 },
      { name: "Java", level: 72 },
      { name: "MATLAB", level: 68 },
      { name: "AMPL", level: 60 },
      { name: "API Integration", level: 85 },
    ],
  },
  "AI & Automation": {
    icon: Brain,
    items: [
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 80 },
      { name: "LLM Workflows", level: 88 },
      { name: "n8n Automation", level: 90 },
      { name: "Prompt Engineering", level: 87 },
      { name: "Predictive Analytics", level: 78 },
    ],
  },
  "Project Management": {
    icon: BarChart3,
    items: [
      { name: "Agile", level: 85 },
      { name: "Process Mapping", level: 82 },
      { name: "Stakeholder Comms", level: 88 },
      { name: "Gantt / Roadmaps", level: 80 },
      { name: "Documentation", level: 83 },
    ],
  },
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
    metric: { value: 30, suffix: "%", label: "Portfolio Growth" },
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
    metric: { value: 25, suffix: "%", label: "Efficiency Gain" },
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
    metric: { value: 6, suffix: "", label: "Team Size Led" },
  },
];

const PROJECTS = [
  {
    title: "Skin Cancer Detection — SE-CNN",
    period: "Aug – Nov 2025",
    description:
      "Built a Squeeze-and-Excitation CNN in PyTorch for melanoma detection on HAM10000 (10K+ images). Achieved 75% validation accuracy, outperforming baseline CNN by ~11% via custom channel-attention and class-weighted training.",
    tags: ["PyTorch", "Deep Learning", "CNN", "Computer Vision"],
    github: "https://github.com/jaounial/skin-cancer-detection",
    stat: "75% acc",
    Icon: Brain,
  },
  {
    title: "Fully Automated Newsletter Workflow",
    period: "Jul – Aug 2025",
    description:
      "End-to-end content pipeline using n8n with integrated APIs for content sourcing, LLM-assisted summarization, tagging, and automated email distribution — saving 10+ hrs of manual work per week.",
    tags: ["n8n", "LLM", "Automation", "API"],
    github: "https://github.com/jaounial/newsletter-automation",
    stat: "10+ hrs/wk saved",
    Icon: Workflow,
  },
  {
    title: "Kelly Criterion Risk Simulator",
    period: "Jan – Mar 2025",
    description:
      "Python trading simulator using yfinance APIs, automating SMA crossover backtesting to compute win rates, payoff ratios, and optimal Kelly position sizing — reducing manual research time by ~90%.",
    tags: ["Python", "Finance", "Backtesting", "yfinance"],
    github: "https://github.com/jaounial/Trading",
    stat: "90% less research",
    Icon: TrendingUp,
  },
  {
    title: "WHOOP Health Dashboard",
    period: "Mar 2026",
    description:
      "Full-stack FastAPI backend integrating WHOOP's OAuth2 API to aggregate and visualize 7-day recovery scores, workout strain, and sleep performance into a unified personal health dashboard.",
    tags: ["FastAPI", "Python", "OAuth2", "WHOOP API"],
    github: "https://github.com/jaounial/whoop-backend",
    stat: "7-day health sync",
    Icon: Activity,
  },
  {
    title: "CLawTrader — Polymarket HFT Bot",
    period: "Mar 2026",
    description:
      "High-frequency trading bot exploiting pricing discrepancies between Binance BTC feeds and Polymarket prediction contracts. Executes limit orders in <100ms using 4 weighted signals: MACD, order-book imbalance, VWAP divergence, and volatility-adjusted strike distance.",
    tags: ["Python", "HFT", "Polymarket", "Binance API"],
    github: "https://github.com/jaounial/CLawTrader",
    stat: "<100ms execution",
    Icon: Zap,
  },
];

const TERMINAL_LINES = [
  { prefix: "$ ", text: "whoami", delay: 0 },
  { prefix: "", text: "ali_jaouni — Industrial Engineer + AI builder", delay: 400 },
  { prefix: "$ ", text: "cat interests.txt", delay: 900 },
  { prefix: "", text: "→ ML / Deep Learning · Automation · Financial Systems", delay: 1300 },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      t = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { setDisplay(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ─── Neural Network Canvas ────────────────────────────────────────────────────

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const W = () => canvas.width;
    const H = () => canvas.height;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 55;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.5 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      for (let i = 0; i < N; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > 1) a.vx *= -1;
        if (a.y < 0 || a.y > 1) a.vy *= -1;
        a.pulse += 0.015;

        for (let j = i + 1; j < N; j++) {
          const b = nodes[j];
          const dx = (a.x - b.x) * W();
          const dy = (a.y - b.y) * H();
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245,197,24,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x * W(), a.y * H());
            ctx.lineTo(b.x * W(), b.y * H());
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(n.x * W(), n.y * H(), n.r + glow * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,197,24,${0.35 + glow * 0.35})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}

// ─── Glitch Text ──────────────────────────────────────────────────────────────

function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block glitch-wrap" data-text={text}>
      {text}
    </span>
  );
}

// ─── Scroll Fade ──────────────────────────────────────────────────────────────

function FadeSection({
  children,
  id,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </section>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const val = useCounter(target, inView);
  return <>{val}{suffix}</>;
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ text, sub }: { text: string; sub?: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[#f5c518] font-mono text-sm">{"// "}</span>
        <h2 className="text-2xl font-bold tracking-tight text-[#e8e8e8]">{text}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#272727] to-transparent" />
      </div>
      {sub && <p className="text-[#555] font-mono text-xs ml-8">{sub}</p>}
    </div>
  );
}

// ─── Tag ──────────────────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="text-xs font-mono px-2 py-0.5 rounded border border-[#272727] text-[#888888] bg-[#0f0f0f] hover:border-[#f5c518]/40 hover:text-[#f5c518] transition-colors duration-200">
      {label}
    </span>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#080808]/90 backdrop-blur-md border-b border-[#1a1a1a]" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="font-mono text-[#f5c518] text-sm font-bold tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5c518] animate-pulse" />
          AJ<span className="cursor-blink ml-0.5 text-[#888]">_</span>
        </a>
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-sm text-[#666] hover:text-[#f5c518] transition-colors duration-200 font-mono">
              {link}
            </a>
          ))}
          <a href="mailto:ali.jaouni@mail.utoronto.ca"
            className="text-sm px-3 py-1.5 rounded border border-[#f5c518]/60 text-[#f5c518] hover:bg-[#f5c518] hover:text-[#0a0a0a] transition-all duration-200 font-mono">
            contact()
          </a>
        </div>
        <button className="sm:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(o => !o)}>
          <span className={`block w-5 h-px bg-[#e8e8e8] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-[#e8e8e8] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#e8e8e8] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <div className="sm:hidden bg-[#080808]/95 backdrop-blur border-b border-[#1a1a1a] px-6 pb-4 flex flex-col gap-3">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="text-sm text-[#888] hover:text-[#f5c518] transition-colors py-1 font-mono">{link}</a>
          ))}
          <a href="mailto:ali.jaouni@mail.utoronto.ca" className="text-sm text-[#f5c518] py-1 font-mono">contact()</a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const role = useTypewriter(HERO_ROLES);
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center max-w-5xl mx-auto px-6 pt-14 overflow-hidden">
      <NeuralCanvas />

      {/* Radial vignette */}
      <div className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, #080808 100%)" }} />

      <div className="relative z-10 animate-fade-up">
        <p className="font-mono text-[#555] text-sm mb-3 tracking-widest uppercase">Hello, I&apos;m</p>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-[#e8e8e8] leading-none mb-4">
          <GlitchText text="Ali Jaouni" />
        </h1>

        <h2 className="text-xl md:text-2xl font-light text-[#555] mb-8 h-8 font-mono">
          <span className="text-[#f5c518]">&gt; </span>
          <span className="text-[#e8e8e8]">{role}</span>
          <span className="cursor-blink text-[#f5c518] ml-0.5">▋</span>
        </h2>

        <p className="text-[#666] max-w-lg text-sm leading-relaxed mb-10 font-mono border-l-2 border-[#f5c518]/30 pl-4">
          Building at the intersection of{" "}
          <span className="text-[#f5c518]">AI</span>,{" "}
          <span className="text-[#f5c518]">automation</span>, and systems thinking.
          <br />Industrial Eng @ UofT · Minor in AI & Engineering Business.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a href="#projects"
            className="px-5 py-2.5 bg-[#f5c518] text-[#0a0a0a] font-bold text-sm rounded hover:bg-[#e0b015] transition-colors duration-200 font-mono">
            ./projects
          </a>
          <a href="/Ali_Jaouni_Resume.pdf" download
            className="flex items-center gap-2 px-5 py-2.5 border border-[#272727] text-[#888] text-sm rounded hover:border-[#f5c518]/60 hover:text-[#f5c518] transition-all duration-200 font-mono">
            <Download size={13} /> resume.pdf
          </a>
          <a href="https://linkedin.com/in/ali-jaouni" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[#272727] text-[#888] text-sm rounded hover:border-[#f5c518]/60 hover:text-[#f5c518] transition-all duration-200 font-mono">
            LinkedIn ↗
          </a>
          <a href="https://github.com/jaounial" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[#272727] text-[#888] text-sm rounded hover:border-[#f5c518]/60 hover:text-[#f5c518] transition-all duration-200 font-mono">
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="mt-auto pb-8 flex items-center gap-2 text-[#333] relative z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#333]" />
        <span className="font-mono text-[10px] rotate-90 origin-left ml-3 tracking-widest">scroll_down</span>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function TerminalBlock() {
  const [visible, setVisible] = useState<number[]>([]);
  const { ref, inView } = useInView(0.2);

  useEffect(() => {
    if (!inView) return;
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisible(v => [...v, i]), line.delay);
    });
  }, [inView]);

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className="rounded-lg bg-[#0d0d0d] border border-[#222] overflow-hidden font-mono text-sm"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#151515] border-b border-[#222]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[#444] text-xs">ali@jaouni-site ~ bash</span>
      </div>
      <div className="p-5 space-y-1.5">
        {TERMINAL_LINES.map((line, i) => (
          <div key={i} className={`transition-opacity duration-300 ${visible.includes(i) ? "opacity-100" : "opacity-0"}`}>
            {line.prefix && <span className="text-[#f5c518]">{line.prefix}</span>}
            <span className={line.prefix ? "text-[#e8e8e8]" : "text-[#666]"}>{line.text}</span>
          </div>
        ))}
        {visible.length === TERMINAL_LINES.length && (
          <div>
            <span className="text-[#f5c518]">$ </span>
            <span className="cursor-blink text-[#f5c518]">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

function About() {
  return (
    <FadeSection id="about" className="max-w-5xl mx-auto px-6 py-28">
      <SectionLabel text="About" sub="// who I am" />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-5">
          <div className="space-y-4 text-[#666] leading-relaxed text-sm">
            <p>
              I&apos;m a 3rd-year{" "}
              <span className="text-[#e8e8e8] font-medium">Industrial Engineering</span> student at
              UofT with minors in{" "}
              <span className="text-[#f5c518]">Artificial Intelligence</span> and{" "}
              <span className="text-[#f5c518]">Engineering Business</span>. I care
              about building systems that actually work — from ML models to
              automated pipelines to financial simulators.
            </p>
            <p>
              I&apos;ve worked across fintech, edtech, and logistics, always finding
              ways to cut inefficiency and add precision through data and automation.
            </p>
            <p>
              Outside: football, running (Dubai Marathon 2024 finisher),
              4+ years of weightlifting, and travel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { label: "Degree", value: "BASc Industrial Eng." },
              { label: "School", value: "University of Toronto" },
              { label: "Grad", value: "May 2028" },
              { label: "Languages", value: "English · Arabic" },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded bg-[#0f0f0f] border border-[#1a1a1a]">
                <p className="font-mono text-[#f5c518] text-[10px] uppercase tracking-widest mb-1">{label}</p>
                <p className="text-[#888] text-xs">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <TerminalBlock />
      </div>
    </FadeSection>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function MetricCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const val = useCounter(target, inView);
  return <>{val}{suffix}</>;
}

function Experience() {
  const { ref, inView } = useInView(0.1);
  return (
    <section ref={ref} id="experience" className="max-w-5xl mx-auto px-6 py-28"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
      <SectionLabel text="Experience" sub="// where I've worked" />
      <div className="space-y-5">
        {EXPERIENCE.map((exp, i) => (
          <div key={i}
            className="group relative p-6 rounded-lg bg-[#0d0d0d] border border-[#1e1e1e] hover:border-[#f5c518]/25 transition-all duration-400 overflow-hidden">
            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,197,24,0.04) 0%, transparent 70%)" }} />

            <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <div>
                <h3 className="font-bold text-[#e8e8e8] text-base mb-0.5">{exp.role}</h3>
                <p className="text-[#f5c518] text-sm font-mono">
                  {exp.company} <span className="text-[#444] font-sans">· {exp.location}</span>
                </p>
              </div>
              <div className="flex items-center gap-5 flex-shrink-0">
                <div className="text-right">
                  <p className="text-[#f5c518] font-black font-mono text-2xl leading-none tabular-nums">
                    {i === 2 ? `${exp.metric.value}${exp.metric.suffix}` : (
                      <MetricCounter target={exp.metric.value} suffix={exp.metric.suffix} inView={inView} />
                    )}
                  </p>
                  <p className="text-[#444] text-[10px] mt-0.5 uppercase tracking-wider">{exp.metric.label}</p>
                </div>
                <span className="font-mono text-xs text-[#444] whitespace-nowrap border-l border-[#222] pl-5">
                  {exp.period}
                </span>
              </div>
            </div>
            <ul className="relative space-y-2.5">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex gap-3 text-sm text-[#666]">
                  <span className="text-[#f5c518] mt-0.5 flex-shrink-0 font-mono">›</span>
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
    <FadeSection id="projects" className="max-w-5xl mx-auto px-6 py-28">
      <SectionLabel text="Projects" sub="// things I've built" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((proj, i) => (
          <div key={i}
            className="group flex flex-col p-6 rounded-lg bg-[#0d0d0d] border border-[#1e1e1e] hover:border-[#f5c518]/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,197,24,0.05) 0%, transparent 70%)" }} />

            <div className="relative flex items-start justify-between mb-4">
              <div className="p-2 rounded-md bg-[#141414] border border-[#272727] text-[#f5c518] group-hover:border-[#f5c518]/40 transition-colors">
                <proj.Icon size={17} strokeWidth={1.5} />
              </div>
              <a href={proj.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#333] hover:text-[#f5c518] transition-colors font-mono text-xs">
                <GitFork size={12} />
                <ExternalLink size={10} />
              </a>
            </div>

            <div className="relative mb-1 flex items-start justify-between gap-2">
              <h3 className="font-bold text-[#e8e8e8] text-sm leading-snug flex-1">{proj.title}</h3>
            </div>
            <p className="font-mono text-[#333] text-[10px] mb-1">{proj.period}</p>

            {/* Stat badge */}
            <span className="inline-block font-mono text-[10px] text-[#f5c518] bg-[#f5c518]/8 border border-[#f5c518]/20 px-2 py-0.5 rounded mb-3 w-fit">
              {proj.stat}
            </span>

            <p className="text-[#555] text-xs leading-relaxed flex-1 mb-4">{proj.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map(t => <Tag key={t} label={t} />)}
            </div>
          </div>
        ))}
      </div>
    </FadeSection>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillBar({ name, level, inView, delay }: { name: string; level: number; inView: boolean; delay: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-[#888] font-mono">{name}</span>
        <span className="text-[10px] text-[#444] font-mono">{level}%</span>
      </div>
      <div className="h-px bg-[#1a1a1a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#f5c518] to-[#c49a10]"
          style={{
            width: inView ? `${level}%` : "0%",
            transition: `width 1s ease ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const { ref, inView } = useInView(0.1);
  return (
    <section ref={ref} id="skills" className="max-w-5xl mx-auto px-6 py-28"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
      <SectionLabel text="Skills" sub="// tech stack" />
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(SKILLS).map(([category, { icon: Icon, items }]) => (
          <div key={category} className="p-6 rounded-lg bg-[#0d0d0d] border border-[#1e1e1e] space-y-4">
            <div className="flex items-center gap-2 mb-5">
              <Icon size={14} className="text-[#f5c518]" strokeWidth={1.5} />
              <h3 className="font-mono text-[#f5c518] text-xs uppercase tracking-widest">{category}</h3>
            </div>
            <div className="space-y-3">
              {items.map((skill, idx) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} inView={inView} delay={idx * 80} />
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
    <footer className="border-t border-[#111] py-12 mt-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[#f5c518] text-sm mb-1 font-bold">Ali Jaouni</p>
          <p className="text-[#333] text-xs font-mono">ali.jaouni@mail.utoronto.ca</p>
        </div>
        <div className="flex gap-6">
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/ali-jaouni" },
            { label: "GitHub", href: "https://github.com/jaounial" },
            { label: "Email", href: "mailto:ali.jaouni@mail.utoronto.ca" },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-[#333] hover:text-[#f5c518] text-sm transition-colors duration-200 font-mono">
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
    <main className="bg-[#080808] min-h-screen">
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
