import { Fragment, useEffect, useRef, useState } from "react";
import { EMAIL, LINKS, NAV, PERF, STATS, JOBS, PROJECTS, STACK } from "./data.js";
import { useTheme, useScrollSpy } from "./hooks.js";

function Progress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      ref.current.style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight || 1)) * 100 + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return <div className="bar" ref={ref} aria-hidden="true" />;
}

function CopyEmail() {
  const [ok, setOk] = useState(false);
  const copy = () => {
    try { navigator.clipboard.writeText(EMAIL); } catch {}
    setOk(true);
    setTimeout(() => setOk(false), 1600);
  };
  return (
    <button className="btn" onClick={copy}>
      <span className="toast">{ok ? "Copied" : "Copy email"}</span>
    </button>
  );
}

function Tags({ items }) {
  return <ul className="tags">{items.map((t) => <li key={t}>{t}</li>)}</ul>;
}

function Perf() {
  const [run, setRun] = useState(false);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setRun(true), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!run) { setMs(0); return; }
    const start = performance.now();
    let id;
    const tick = (now) => {
      const p = Math.min((now - start) / 1200, 1);
      setMs(Math.round(PERF.legacyMs - p * (PERF.legacyMs - PERF.newMs)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [run]);

  const replay = () => { setRun(false); setTimeout(() => setRun(true), 60); };
  const newWidth = (PERF.newMs / PERF.legacyMs) * 100 + "%";

  return (
    <div className="perf">
      <h3>QVC product page: time to first byte</h3>
      <p className="sub">Legacy AEM rendering compared with the Next.js rebuild, as measured in production.</p>
      <div className="line">
        <span className="lbl">Legacy AEM</span>
        <div className="track"><div className="fill old" style={{ width: run ? "100%" : "0%" }} /></div>
        <span className="num">{PERF.legacyMs} ms</span>
      </div>
      <div className="line">
        <span className="lbl">Next.js</span>
        <div className="track"><div className="fill new" style={{ width: run ? newWidth : "0%" }} /></div>
        <span className="num">{run ? ms + " ms" : "–"}</span>
      </div>
      <div className="row" style={{ marginTop: 14 }}>
        <button className="btn" onClick={replay}>Replay</button>
      </div>
      <ul className="stats">
        {STATS.map(([value, label]) => (
          <li key={label}><b>{value}</b>{label}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const toggleTheme = useTheme();
  const active = useScrollSpy();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <Progress />
      <header>
        <div className="wrap">
          <nav aria-label="Sections">
            {NAV.map(([id, label]) => (
              <a key={id} href={"#" + id} className={active === id ? "on" : ""}>{label}</a>
            ))}
          </nav>
          <button className="icon" onClick={toggleTheme} aria-label="Toggle theme (press D)" title="Toggle theme (D)">◐</button>
        </div>
      </header>

      <main className="wrap">
        <section id="about" className="hero">
          <p className="hi">{greeting}, I'm</p>
          <h1>Jyoti Agarwal</h1>
          <p className="role">Senior frontend and full-stack engineer who leads teams and ships fast, resilient commerce experiences.</p>
          <p className="meta">Bengaluru, India · 9+ years building for the web</p>
          <div className="row">
            <a className="btn p" href={"mailto:" + EMAIL}>Get in touch</a>
            <CopyEmail />
            {LINKS.map((l) => (
              <a key={l.label} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            ))}
          </div>
          <div className="lead">
            <p>I've spent nine years turning slow, tangled frontends into fast ones, most recently moving a flagship QVC product page from AEM to Next.js.</p>
            <p>I care about the numbers users feel (load time, conversion) and the ones teams feel (bundle size, review time, how quickly a new hire ships). I now lead about a dozen engineers and enjoy growing them.</p>
          </div>
        </section>

        <section id="impact"><h2>Impact</h2><Perf /></section>

        <section id="experience">
          <h2>Experience</h2>
          <div className="tl">
            {JOBS.map((j) => (
              <div className="job" key={j.company}>
                <h3>{j.company}</h3>
                <div className="when">{j.role} · {j.when}</div>
                <p>{j.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          {PROJECTS.map((p) => (
            <div className="proj" key={p.name}>
              <h3>{p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}</h3>
              <p>{p.text}</p>
              <Tags items={p.tags} />
            </div>
          ))}
        </section>

        <section id="stack">
          <h2>Stack</h2>
          <dl className="stack" style={{ margin: 0 }}>
            {STACK.map(([group, items]) => (
              <Fragment key={group}><dt>{group}</dt><dd><Tags items={items} /></dd></Fragment>
            ))}
          </dl>
        </section>

        <footer>
          <h2>Let's talk</h2>
          <p style={{ margin: "0 0 16px", maxWidth: "32em" }}>Building something that needs to be fast and dependable? Send a note.</p>
          <div className="row">
            <a className="btn p" href={"mailto:" + EMAIL}>Email me</a>
            <CopyEmail />
          </div>
          <p style={{ marginTop: 28 }}>B.Tech in Computer Science, Brainware Group of Institutions, Kolkata. Press D to switch theme.</p>
        </footer>
      </main>
    </>
  );
}
