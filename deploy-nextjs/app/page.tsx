"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  COPY,
  PROJECTS,
  EDU,
  CERTS,
  PILLARS,
  LINKS,
  Lang,
} from "@/lib/content";

/* ---------- helpers ---------- */

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Imagem com fallback elegante enquanto o arquivo não existe em /public */
function Shot({
  src,
  alt,
  label,
  style,
}: {
  src: string;
  alt: string;
  label: string;
  style?: CSSProperties;
}) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="img-slot" style={style}>
        {label}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setOk(false)}
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
    />
  );
}

/* ---------- page ---------- */

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = COPY[lang];
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

    // Reveals no scroll
    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let io: IntersectionObserver | undefined;
    if (reduce) {
      revealEls.forEach((el) => (el.style.opacity = "1"));
    } else {
      revealEls.forEach((el) => {
        const kind = el.getAttribute("data-reveal");
        el.style.opacity = "0";
        el.style.transform =
          kind === "left" ? "translateX(-44px)" : "translateY(40px)";
        el.style.transition = `opacity 1s ${ease}, transform 1s ${ease}`;
      });
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translate(0, 0)";
            }, delay);
            io!.unobserve(el);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      revealEls.forEach((el) => io!.observe(el));
    }

    // Cenas dirigidas pelo scroll
    const introWrap = document.querySelector<HTMLElement>('[data-scene="intro"]');
    const introTarget = document.querySelector<HTMLElement>(
      '[data-scene-target="intro"]'
    );
    const filmWrap = document.querySelector<HTMLElement>('[data-scene="film"]');
    const filmCard = document.querySelector<HTMLElement>(
      '[data-scene-target="filmCard"]'
    );
    const frames = document.querySelectorAll<HTMLElement>("[data-film-frame]");
    const dots = document.querySelectorAll<HTMLElement>("[data-film-dot]");

    const sceneProgress = (wrap: HTMLElement) => {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return total > 0 ? clamp01(-r.top / total) : 0;
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vh = window.innerHeight;

        if (navRef.current) {
          const show = window.scrollY > vh * 1.1;
          navRef.current.style.opacity = show ? "1" : "0";
          navRef.current.style.pointerEvents = show ? "auto" : "none";
        }

        if (!reduce && introWrap && introTarget) {
          const p = sceneProgress(introWrap);
          introTarget.style.opacity = String(clamp01(1 - p * 1.6));
          introTarget.style.transform = `translateY(${-p * 90}px) scale(${
            1 - p * 0.1
          })`;
        }

        if (filmWrap && filmCard && frames.length) {
          const p = sceneProgress(filmWrap);
          if (!reduce) {
            const entry = clamp01(p * 3.2);
            filmCard.style.transform = `scale(${0.9 + entry * 0.1})`;
            filmCard.style.borderRadius = `${44 - entry * 12}px`;
          }
          const n = frames.length;
          const active = Math.min(n - 1, Math.floor(p * n));
          frames.forEach((f) => {
            const i = parseInt(f.getAttribute("data-film-frame")!, 10);
            let d = p * n - (i + 0.5);
            if (i === 0) d = Math.max(d, 0);
            if (i === n - 1) d = Math.min(d, 0);
            const op = clamp01(1 - Math.abs(d) * 2.4);
            f.style.opacity = String(op);
            f.style.transform = reduce ? "none" : `translateY(${-d * 70}px)`;
            f.style.zIndex = i === active ? "2" : "1";
          });
          dots.forEach((dot) => {
            const i = parseInt(dot.getAttribute("data-film-dot")!, 10);
            const dark = active === 2;
            dot.style.background =
              i === active
                ? dark
                  ? "#F6F5F1"
                  : "#16161A"
                : dark
                ? "rgba(246,245,241,0.3)"
                : "rgba(22,22,26,0.22)";
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const films = [
    { h: t.film1H, p: t.film1P, n: "01 / 03", bg: "linear-gradient(150deg, #FFE8D6, #FFD0E8 55%, #E4D9FF)", dark: false },
    { h: t.film2H, p: t.film2P, n: "02 / 03", bg: "linear-gradient(150deg, #D6E7FF, #C9D4FF 55%, #E8F4FF)", dark: false },
    { h: t.film3H, p: t.film3P, n: "03 / 03", bg: "linear-gradient(150deg, #16161A, #232336 60%, #1C2B26)", dark: true },
  ];

  return (
    <main>
      {/* ---------- nav ---------- */}
      <nav ref={navRef} className="nav">
        <a href="#top" className="nav-brand">
          Arthur Nilo<span style={{ color: "var(--accent)" }}>.</span>
        </a>
        <div className="nav-links">
          <a href="#projetos" className="nav-link">{t.navProjects}</a>
          <a href="#sobre" className="nav-link">{t.navAbout}</a>
          <a href="#trajetoria" className="nav-link">{t.navJourney}</a>
          <a
            href="#contato"
            className="btn btn-dark"
            style={{ fontSize: 14, padding: "9px 20px" }}
          >
            {t.navContact}
          </a>
          <button
            className="lang-btn"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>
      </nav>

      {/* ---------- intro ---------- */}
      <div id="top" data-scene="intro" style={{ height: "220vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-12%",
              right: "-8%",
              width: "46vw",
              height: "46vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,199,166,0.5), transparent 68%)",
              animation: "blobDrift 11s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-16%",
              left: "-10%",
              width: "52vw",
              height: "52vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(196,190,255,0.45), transparent 68%)",
              animation: "blobDrift 14s ease-in-out infinite reverse",
              pointerEvents: "none",
            }}
          />
          <div
            data-scene-target="intro"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 24px",
              position: "relative",
            }}
          >
            {/* Logo: coloque seu arquivo em /public/logo.png */}
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: "50%",
                overflow: "hidden",
                marginBottom: 40,
              }}
            >
              <Shot src="/logo.png" alt="Logo" label="logo" />
            </div>
            <h1
              style={{
                fontSize: "clamp(56px, 9vw, 128px)",
                fontWeight: 600,
                letterSpacing: "-0.045em",
                lineHeight: 1,
              }}
            >
              Arthur Nilo
            </h1>
            <p style={{ marginTop: 26, fontSize: 18, color: "var(--muted)" }}>
              {t.introTag1}{" "}
              <span className="em" style={{ color: "var(--ink)", fontSize: 20 }}>
                {t.introTagEm}
              </span>
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                animation: "floaty 2.6s ease-in-out infinite",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--faint)",
                }}
              >
                {t.scrollHint}
              </span>
              <span style={{ fontSize: 16 }}>↓</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- hero ---------- */}
      <section style={{ padding: "8vh 40px 14vh" }}>
        <div className="container">
          <div
            data-reveal
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(22,22,26,0.12)",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--muted)",
              marginBottom: 44,
              background: "var(--surface)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
            {t.heroBadge}
          </div>
          <h2
            style={{
              fontSize: "clamp(48px, 7.4vw, 104px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
            }}
          >
            <span data-reveal data-delay="60" style={{ display: "block" }}>
              {t.hero1}{" "}
              <span className="em" style={{ color: "var(--accent)" }}>
                {t.heroEm1}
              </span>
            </span>
            <span data-reveal data-delay="180" style={{ display: "block" }}>
              {t.hero2} <span className="em">{t.heroEm2}</span>
            </span>
          </h2>
          <p
            data-reveal
            data-delay="300"
            style={{
              maxWidth: 520,
              fontSize: 19,
              lineHeight: 1.65,
              color: "var(--muted)",
              marginTop: 44,
            }}
          >
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ---------- filme (cena fixa com scroll) ---------- */}
      <div data-scene="film" style={{ height: "380vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          <div
            data-scene-target="filmCard"
            style={{
              position: "relative",
              width: "min(1180px, 94vw)",
              height: "min(680px, 82vh)",
              borderRadius: 36,
              overflow: "hidden",
              background: "#16161A",
              boxShadow: "0 40px 90px rgba(22,22,26,0.22)",
              willChange: "transform",
            }}
          >
            {films.map((f, i) => (
              <div
                key={i}
                data-film-frame={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 40,
                  background: f.bg,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: f.dark
                      ? "rgba(246,245,241,0.4)"
                      : "rgba(22,22,26,0.45)",
                    marginBottom: 22,
                  }}
                >
                  {f.n}
                </span>
                <div
                  className="em"
                  style={{
                    fontSize: "clamp(64px, 9vw, 130px)",
                    color: f.dark ? "#F6F5F1" : "#16161A",
                    lineHeight: 1,
                  }}
                >
                  {f.h}
                </div>
                <p
                  style={{
                    maxWidth: 440,
                    fontSize: 18,
                    lineHeight: 1.6,
                    color: f.dark
                      ? "rgba(246,245,241,0.62)"
                      : "rgba(22,22,26,0.62)",
                    marginTop: 28,
                  }}
                >
                  {f.p}
                </p>
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 8,
                zIndex: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  data-film-dot={i}
                  style={{
                    width: 26,
                    height: 4,
                    borderRadius: 2,
                    background: "rgba(127,127,132,0.5)",
                    transition: "background 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- projetos ---------- */}
      <section id="projetos" style={{ padding: "16vh 40px 10vh" }}>
        <div className="container" style={{ maxWidth: 1180 }}>
          <div
            data-reveal
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 70,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
              }}
            >
              {t.projectsH1}
              <br />
              <span className="em" style={{ color: "var(--accent)" }}>
                {t.projectsH2}
              </span>
            </h2>
            <p
              style={{
                maxWidth: 340,
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              {t.projectsSub}
            </p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <article key={p.slug} className="card" data-reveal data-delay={(i % 2) * 120}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 10",
                    borderRadius: 18,
                    overflow: "hidden",
                  }}
                >
                  <Shot
                    src={`/projects/${p.slug}.png`}
                    alt={p.title[lang]}
                    label={t.shotPlaceholder}
                  />
                </div>
                <div style={{ padding: "26px 10px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 23,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.title[lang]}
                    </h3>
                    <span className="tag">{p.tag[lang]}</span>
                  </div>
                  <p
                    style={{
                      marginBottom: 18,
                      fontSize: 15.5,
                      lineHeight: 1.6,
                      color: "var(--muted)",
                    }}
                  >
                    {p.desc[lang]}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    {p.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--accent)",
                          textDecoration: "none",
                          marginLeft: "auto",
                        }}
                      >
                        {t.visitLive} ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- sobre ---------- */}
      <section id="sobre" style={{ padding: "14vh 40px" }}>
        <div className="container about-grid">
          <div data-reveal="left" style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 130,
                height: 130,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,199,166,0.7), transparent 70%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/foto-arthur.jpg"
              alt="Arthur Nilo"
              style={{
                width: "100%",
                display: "block",
                borderRadius: 30,
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "50% 18%",
                position: "relative",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {t.photoBadge}
            </div>
          </div>
          <div>
            <h2
              data-reveal
              style={{
                marginBottom: 32,
                fontSize: "clamp(36px, 4.6vw, 58px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {t.aboutH1}{" "}
              <span className="em" style={{ color: "var(--accent)" }}>
                {t.aboutHEm}
              </span>
            </h2>
            <p
              data-reveal
              data-delay="100"
              style={{
                fontSize: 18,
                lineHeight: 1.75,
                color: "#3E3E44",
                marginBottom: 22,
              }}
            >
              {t.aboutP1}
            </p>
            <p
              data-reveal
              data-delay="200"
              style={{
                fontSize: 16.5,
                lineHeight: 1.75,
                color: "var(--muted)",
                marginBottom: 40,
              }}
            >
              {t.aboutP2}
            </p>
            <div
              data-reveal
              data-delay="300"
              style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
            >
              {PILLARS[lang].map((pl) => (
                <span key={pl} className="pill-dark">
                  {pl}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- trajetória ---------- */}
      <section
        id="trajetoria"
        style={{
          padding: "12vh 40px",
          background: "var(--surface)",
          borderTop: "1px solid rgba(22,22,26,0.06)",
          borderBottom: "1px solid rgba(22,22,26,0.06)",
        }}
      >
        <div className="container">
          <h2
            data-reveal
            style={{
              marginBottom: 64,
              fontSize: "clamp(36px, 4.6vw, 58px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            {t.journeyH}{" "}
            <span className="em" style={{ color: "var(--accent)" }}>
              {t.journeyHEm}
            </span>
          </h2>
          <div className="journey-grid">
            <div>
              <div
                data-reveal
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--faint)",
                  marginBottom: 28,
                }}
              >
                {t.eduH}
              </div>
              {EDU.map((e, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={i * 120}
                  style={{ padding: "24px 0", borderTop: "1px solid var(--line)" }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--accent)",
                      marginBottom: 8,
                    }}
                  >
                    {e.period}
                  </div>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      marginBottom: 4,
                    }}
                  >
                    {e.title[lang]}
                  </div>
                  <div style={{ fontSize: 14.5, color: "var(--muted)" }}>
                    {e.org[lang]}
                  </div>
                </div>
              ))}
              <p
                data-reveal
                data-delay="260"
                style={{
                  fontSize: 14.5,
                  color: "var(--faint)",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  marginTop: 18,
                }}
              >
                {t.eduNote}
              </p>
            </div>
            <div>
              <div
                data-reveal
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--faint)",
                  marginBottom: 28,
                }}
              >
                {t.certsH}
              </div>
              {CERTS.map((c, i) => (
                <div
                  key={c.name}
                  data-reveal
                  data-delay={i * 60}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 20,
                    padding: "17px 0",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {c.name}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--muted)" }}>
                      {" "}
                      — {c.org}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--faint)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.date[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- contato ---------- */}
      <section
        id="contato"
        style={{
          padding: "20vh 40px 8vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70vw",
            height: "60vh",
            background:
              "radial-gradient(ellipse, rgba(196,190,255,0.35), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="container"
          style={{ textAlign: "center", position: "relative" }}
        >
          <h2
            data-reveal
            style={{
              marginBottom: 30,
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            {t.contactH1}
            <br />
            <span className="em" style={{ color: "var(--accent)" }}>
              {t.contactHEm}
            </span>
          </h2>
          <p
            data-reveal
            data-delay="120"
            style={{
              maxWidth: 460,
              margin: "0 auto 52px",
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--muted)",
            }}
          >
            {t.contactSub}
          </p>
          <div
            data-reveal
            data-delay="220"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 120,
            }}
          >
            <a
              href={`mailto:${LINKS.email}`}
              className="btn btn-dark"
              style={{ fontSize: 16, padding: "18px 36px" }}
            >
              {LINKS.email}
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: 16, padding: "18px 32px" }}
            >
              GitHub ↗
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: 16, padding: "18px 32px" }}
            >
              LinkedIn ↗
            </a>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(22,22,26,0.08)",
              paddingTop: 26,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--faint)" }}>
              © 2026 Arthur Nilo
            </span>
            <span style={{ fontSize: 13, color: "var(--faint)" }}>
              {t.footerNote}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
