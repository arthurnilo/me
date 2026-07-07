"use client";

import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { COPY, LINKS, LINKHUB, Lang } from "@/lib/content";

export default function LinksPage() {
  const [lang, setLang] = useState<Lang>("pt");
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const t = COPY[lang];
  const l = LINKHUB[lang];

  // Relógio local (Vila Velha — ES)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  // Spotlight do card destaque segue o cursor
  const onFeaturedMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const copyEmail = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard indisponível — o clique na linha ainda abre o mailto */
    }
  };

  const rows = [
    { n: "01", title: "GitHub", desc: l.githubDesc, href: LINKS.github },
    { n: "02", title: "LinkedIn", desc: l.linkedinDesc, href: LINKS.linkedin },
  ];

  return (
    <main className="lh-main">
      {/* blobs de fundo — mesmo vocabulário da intro do site */}
      <div
        style={{
          position: "absolute",
          top: "-14%",
          right: "-12%",
          width: "max(44vw, 320px)",
          height: "max(44vw, 320px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,199,166,0.45), transparent 68%)",
          animation: "blobDrift 11s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-18%",
          left: "-14%",
          width: "max(50vw, 360px)",
          height: "max(50vw, 360px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,190,255,0.4), transparent 68%)",
          animation: "blobDrift 14s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      <div className="lh-wrap">
        {/* topo */}
        <div className="lh-top lh-enter">
          <Link href="/" className="lh-back">
            ← {l.backToSite}
          </Link>
          <button
            className="lang-btn"
            onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>

        {/* identidade */}
        <header style={{ marginBottom: "clamp(40px, 6vh, 60px)" }}>
          <div className="lh-avatar lh-enter" style={{ animationDelay: "80ms" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/foto-arthur-2.jpg" alt="Arthur Nilo" />
            <span className="lh-avatar-dot" aria-hidden />
          </div>
          <h1
            className="lh-enter"
            style={{
              animationDelay: "160ms",
              fontSize: "clamp(38px, 8vw, 56px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            Arthur Nilo<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p
            className="lh-enter"
            style={{
              animationDelay: "240ms",
              marginTop: 14,
              fontSize: 17,
              color: "var(--muted)",
            }}
          >
            {t.introTag1}{" "}
            <span className="em" style={{ color: "var(--ink)", fontSize: 19 }}>
              {t.introTagEm}
            </span>
          </p>
          <div
            className="lh-enter"
            style={{
              animationDelay: "320ms",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(22,22,26,0.12)",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--muted)",
              background: "var(--surface)",
              marginTop: 26,
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
        </header>

        {/* card destaque — leva ao site principal */}
        <Link
          href="/"
          className="lh-featured lh-enter"
          style={{ animationDelay: "400ms" }}
          onMouseMove={onFeaturedMove}
        >
          <div className="lh-spot" aria-hidden />
          <span className="lh-featured-arrow" aria-hidden>
            ↗
          </span>
          <span
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(246,245,241,0.45)",
              marginBottom: 20,
            }}
          >
            {l.featuredLabel}
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(32px, 6.4vw, 46px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
            }}
          >
            {l.featuredH1}{" "}
            <span className="em" style={{ color: "#C4BEFF" }}>
              {l.featuredHEm}
            </span>
          </span>
          <span
            style={{
              display: "block",
              maxWidth: 380,
              marginTop: 16,
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "rgba(246,245,241,0.6)",
            }}
          >
            {l.featuredSub}
          </span>
          <span className="lh-cta">
            {l.featuredCta} <span aria-hidden>→</span>
          </span>
        </Link>

        {/* índice de conexões */}
        <div
          className="lh-enter"
          style={{
            animationDelay: "500ms",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--faint)",
            margin: "clamp(40px, 6vh, 56px) 0 14px",
          }}
        >
          {l.sectionLabel}
        </div>

        <nav className="lh-enter" style={{ animationDelay: "580ms" }}>
          {rows.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lh-row"
            >
              <span className="lh-row-num">{r.n}</span>
              <span>
                <span className="lh-row-title" style={{ display: "block" }}>
                  {r.title}
                </span>
                <span className="lh-row-desc" style={{ display: "block" }}>
                  {r.desc}
                </span>
              </span>
              <span className="lh-row-arrow" aria-hidden>
                ↗
              </span>
            </a>
          ))}
          <a href={`mailto:${LINKS.email}`} className="lh-row">
            <span className="lh-row-num">03</span>
            <span style={{ minWidth: 0 }}>
              <span className="lh-row-title" style={{ display: "block" }}>
                E-mail
              </span>
              <span className="lh-row-desc" style={{ display: "block" }}>
                {l.emailDesc}
              </span>
            </span>
            <button className="lh-copy-btn" onClick={copyEmail}>
              {copied ? l.copied : l.copy}
            </button>
          </a>
        </nav>

        {/* rodapé */}
        <footer className="lh-footer lh-enter" style={{ animationDelay: "660ms" }}>
          <span style={{ fontSize: 13, color: "var(--faint)" }}>
            {l.localLabel}
            {time && <span> · {time}</span>}
          </span>
          <span style={{ fontSize: 13, color: "var(--faint)" }}>
            © 2026 Arthur Nilo
          </span>
        </footer>
      </div>
    </main>
  );
}
