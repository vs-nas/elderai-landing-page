"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────────
   All injected styles are scoped inside .ch-root to avoid
   colliding with the rest of the page.
───────────────────────────────────────────────────────────────── */
const INJECTED_STYLES = `
  .ch-root { isolation: isolate; }
  .gsap-reveal { visibility: hidden; }

  /* Ambient floating orbs */
  .ch-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    z-index: 1;
    animation: chOrbFloat 8s ease-in-out infinite;
  }
  .ch-orb-1 {
    width: 420px; height: 420px;
    top: -8%; left: -6%;
    background: radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%);
    animation-delay: 0s;
  }
  .ch-orb-2 {
    width: 360px; height: 360px;
    bottom: -10%; right: -4%;
    background: radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 70%);
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .ch-orb-3 {
    width: 280px; height: 280px;
    top: 40%; left: 55%;
    background: radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%);
    animation-delay: -5s;
    animation-duration: 12s;
  }
  @keyframes chOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(24px, -18px) scale(1.06); }
    66% { transform: translate(-16px, 12px) scale(0.96); }
  }

  .ch-grain {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 5; opacity: 0.025;
    mix-blend-mode: multiply;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4t5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Tg77NL4jIa9/DQsz0eRoWaqwQiQJ7e4TRbMoTeSp");
    background-size: 128px 128px;
  }

  .ch-grid {
    background-size: 40px 40px;
    background-image: radial-gradient(circle, rgba(15,23,42,0.07) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 0%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 0%, transparent 100%);
  }

  .ch-tagline {
    color: #0f172a;
    text-shadow: 0 2px 24px rgba(15,23,42,0.06);
  }

  .ch-silver {
    background: linear-gradient(135deg, #0f172a 0%, #16a34a 55%, #0ea5e9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }

  .ch-card-silver {
    background: linear-gradient(158deg, #0f172a 0%, #334155 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
  }

  .ch-card {
    background: linear-gradient(148deg, #ffffff 0%, #f8fafc 100%);
    box-shadow:
      0 50px 100px -24px rgba(15,23,42,0.12),
      0 24px 48px -12px rgba(15,23,42,0.08),
      inset 0 1px 0 rgba(255,255,255,1);
    border: 1px solid rgba(15,23,42,0.08);
  }

  .ch-sheen {
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 1;
    background: radial-gradient(
      650px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(74,222,128,0.06) 0%,
      transparent 40%
    );
  }

  .ch-browser {
    border-radius: 11px;
    overflow: hidden;
    background: #ffffff;
    box-shadow:
      0 0 0 1px rgba(15,23,42,0.08),
      0 40px 80px -20px rgba(15,23,42,0.18),
      0 16px 32px -8px rgba(15,23,42,0.1);
    transform-style: preserve-3d;
  }

  .ch-chrome {
    background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
    border-bottom: 1px solid rgba(15,23,42,0.08);
    height: 33px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    gap: 7px;
    flex-shrink: 0;
  }

  .ch-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  .ch-url-bar {
    flex: 1;
    background: #ffffff;
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: 4px;
    height: 18px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 8.5px;
    color: rgba(15,23,42,0.45);
    font-family: ui-monospace, monospace;
    letter-spacing: 0.01em;
    user-select: none;
  }

  .ch-dash-wrap { display: flex; overflow: hidden; flex: 1; min-height: 0; }

  .ch-sidebar {
    width: 42px;
    flex-shrink: 0;
    background: #f8fafc;
    border-right: 1px solid rgba(15,23,42,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0 8px;
    gap: 3px;
  }

  .ch-sb-logo {
    width: 25px; height: 25px;
    border-radius: 7px;
    background: #dcfce7;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 9px;
    box-shadow: 0 0 10px rgba(74,222,128,0.15);
    flex-shrink: 0;
  }

  .ch-sb-item {
    width: 29px; height: 29px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(15,23,42,0.35);
    flex-shrink: 0;
  }
  .ch-sb-item.on { background: rgba(74,222,128,0.15); color: #16a34a; }

  .ch-main {
    flex: 1;
    overflow: hidden;
    padding: 11px 11px 9px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    background: #ffffff;
  }

  .ch-dash-header { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
  .ch-dash-title { font-size: 11.5px; font-weight: 700; color: #0f172a; }
  .ch-dash-sub   { font-size: 7.5px; color: rgba(15,23,42,0.45); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1px; }
  .ch-live-badge {
    font-size: 7.5px; padding: 2px 7px; border-radius: 99px;
    background: rgba(74,222,128,0.12); color: #16a34a;
    font-weight: 700; letter-spacing: 0.04em;
    border: 1px solid rgba(74,222,128,0.25);
  }

  .ch-metrics { display: grid; grid-template-columns: repeat(3,1fr); gap: 5px; flex-shrink: 0; }
  .ch-metric {
    background: #f8fafc;
    border: 1px solid rgba(15,23,42,0.06);
    border-radius: 7px;
    padding: 7px 8px;
  }
  .ch-metric-val { font-size: 15px; font-weight: 800; line-height: 1; margin-bottom: 2px; }
  .ch-metric-lbl { font-size: 6.5px; text-transform: uppercase; letter-spacing: 0.07em; color: rgba(15,23,42,0.45); }

  .ch-chart {
    background: #f8fafc;
    border: 1px solid rgba(15,23,42,0.06);
    border-radius: 7px;
    padding: 7px 8px;
    flex-shrink: 0;
  }
  .ch-chart-title { font-size: 7px; text-transform: uppercase; letter-spacing: 0.07em; color: rgba(15,23,42,0.45); margin-bottom: 5px; }
  .ch-bars { display: flex; align-items: flex-end; gap: 3px; height: 26px; }
  .ch-bar {
    flex: 1; border-radius: 2px 2px 0 0;
    background: rgba(74,222,128,0.25);
    transform-origin: bottom center;
  }
  .ch-bar.hi { background: #22c55e; box-shadow: 0 -3px 8px rgba(74,222,128,0.35); }
  .ch-days { display: flex; gap: 3px; margin-top: 3px; }
  .ch-day { flex: 1; text-align: center; font-size: 6px; color: rgba(15,23,42,0.35); }
  .ch-day.now { color: #16a34a; }

  .ch-calls {
    background: #f8fafc;
    border: 1px solid rgba(15,23,42,0.06);
    border-radius: 7px;
    padding: 7px 8px;
    flex: 1;
    overflow: hidden;
  }
  .ch-call { display: flex; align-items: center; gap: 6px; padding: 3.5px 0; border-bottom: 1px solid rgba(15,23,42,0.05); }
  .ch-call:last-child { border-bottom: none; padding-bottom: 0; }
  .ch-avatar {
    width: 19px; height: 19px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 6px; font-weight: 700; flex-shrink: 0;
  }
  .ch-call-name { font-size: 8px; font-weight: 600; color: #0f172a; }
  .ch-call-meta { font-size: 6.5px; color: rgba(15,23,42,0.45); }
  .ch-tone {
    font-size: 6px; padding: 1.5px 5px; border-radius: 99px;
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
    flex-shrink: 0; margin-left: auto;
  }
  .t-happy { background: rgba(74,222,128,0.18); color: #16a34a; }
  .t-sad   { background: rgba(251,146,60,0.18);  color: #ea580c; }
  .t-conf  { background: rgba(167,139,250,0.18); color: #7c3aed; }

  .ch-badge {
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow:
      0 0 0 1px rgba(15,23,42,0.08),
      0 14px 30px -6px rgba(15,23,42,0.12);
  }

  .ch-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(180deg, #16a34a 0%, #15803d 100%);
    color: #ffffff;
    padding: 14px 32px;
    border-radius: 999px;
    font-size: 15px; font-weight: 700;
    box-shadow: 0 10px 28px -4px rgba(22,163,74,0.35);
    transition: transform 0.28s cubic-bezier(0.25,1,0.5,1), box-shadow 0.28s cubic-bezier(0.25,1,0.5,1);
  }
  .ch-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -4px rgba(22,163,74,0.45);
  }
  .ch-btn-primary:active { transform: translateY(0); }

  .ch-btn-secondary {
    display: inline-flex; align-items: center;
    background: #ffffff;
    border: 1px solid rgba(15,23,42,0.12);
    color: #334155;
    padding: 14px 32px;
    border-radius: 999px;
    font-size: 15px; font-weight: 600;
    transition: all 0.28s cubic-bezier(0.25,1,0.5,1);
  }
  .ch-btn-secondary:hover {
    background: #f8fafc;
    border-color: rgba(15,23,42,0.2);
    transform: translateY(-2px);
  }
  .ch-btn-secondary:active { transform: translateY(0); }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  ctaHeading?: string;
  ctaDescription?: string;
}

/* ── Inline SVG icon helpers (no external icon lib needed) ──────── */
const I = {
  Leaf: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"/><path d="M9 22v-2"/>
    </svg>
  ),
  Grid: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  Users: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Cal: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Phone: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Bell: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  PhoneBadge: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  AlertBadge: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
};

const BAR_H   = [52, 75, 40, 86, 60, 70, 94]; // last = today
const DAYS    = ["M","T","W","T","F","S","S"];
const CALLS   = [
  { init: "EJ", color: "#4ade80", bg: "rgba(74,222,128,0.10)", name: "Eleanor Johnson", meta: "9:02 AM · 3m 14s", tone: "Happy",   cls: "t-happy" },
  { init: "RE", color: "#fb923c", bg: "rgba(251,146,60,0.10)",  name: "Robert Evans",    meta: "7:00 PM · 2m 48s", tone: "Sad",     cls: "t-sad"   },
  { init: "EJ", color: "#a78bfa", bg: "rgba(167,139,250,0.10)",name: "Eleanor Johnson", meta: "Yesterday · 5m 22s",tone: "Confused",cls: "t-conf"  },
];

export function CinematicHero({
  tagline1      = "AI Voice Agents For",
  tagline2      = "Elder Care Monitoring",
  cardHeading   = "Wellness, checked.",
  cardDescription = (
    <><span className="text-emerald-600 font-semibold">ElderAI</span> conducts automated
    wellness check-ins, tracks medication compliance, and alerts family
    members immediately when assistance is needed.</>
  ),
  metricValue = 94,
  ctaHeading    = "Start your free trial.",
  ctaDescription = "Set up automated voice calls for your elderly loved ones and receive real-time wellness reports today.",
  className,
  ...props
}: CinematicHeroProps) {
  const rootRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);

  const [isDebug, setIsDebug] = React.useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsDebug(!!params.get("debug"));
    }
  }, []);

  /* ── Mouse parallax tilt on the browser frame ─────── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current || !browserRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
        cardRef.current.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
        const xv = (e.clientX / window.innerWidth  - 0.5) * 2;
        const yv = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(browserRef.current, {
          rotationY: xv * 7,
          rotationX: -yv * 7,
          ease: "power3.out",
          duration: 1.4,
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Auto-scroll utility for testing/screenshots ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const scrollVal = params.get("scroll");
    if (scrollVal) {
      const target = parseInt(scrollVal, 10);
      const doScroll = () => {
        window.scrollTo(0, target);
        if (typeof window !== "undefined" && ScrollTrigger) {
          ScrollTrigger.refresh();
          ScrollTrigger.update();
        }
      };
      const t1 = setTimeout(doScroll, 800);
      const t2 = setTimeout(doScroll, 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  /* ── Cinematic scroll timeline ─────────────────────── */
  useEffect(() => {
    const mobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("nospin")) {
          gsap.set(".ch-hero-text", { autoAlpha: 0 });
          gsap.set(".ch-main-card", { y: 0, width: "100%", height: "100%", borderRadius: "0px", autoAlpha: 1 });
          gsap.set(".ch-mockup-wrap", { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1 });
          gsap.set(".ch-dash-item", { y: 0, autoAlpha: 1, scale: 1 });
          gsap.set(".ch-float-badge", { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0 });
          gsap.set(".ch-left-text", { x: 0, autoAlpha: 1 });
          return;
        }
      }

      /* Initial states */
      gsap.set(".ch-orb",        { autoAlpha: 0, scale: 0.6 });
      gsap.set(".ch-tagline-1",  { autoAlpha: 0, y: 55, scale: 0.88, filter: "blur(16px)", rotationX: -16 });
      gsap.set(".ch-tagline-2",  { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".ch-main-card",  { y: window.innerHeight + 180, autoAlpha: 1 });
      gsap.set([".ch-left-text", ".ch-mockup-wrap", ".ch-float-badge", ".ch-dash-item"], { autoAlpha: 0 });
      gsap.set(".ch-bar", { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(".ch-cta-wrap",   { autoAlpha: 0, scale: 0.88, filter: "blur(24px)" });

      /* Page load intro */
      const intro = gsap.timeline({ delay: 0.15 })
        .to(".ch-orb", {
          duration: 2.2, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "power2.out",
        })
        .to(".ch-tagline-1", {
          duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out",
        }, "-=1.6")
        .to(".ch-tagline-2", {
          duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut",
        }, "-=1.0");

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("scroll")) {
          intro.progress(1).kill();
        }
      }

       /* Scroll-driven cinematic sequence */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl
        /* Step 1 — tagline blurs away, card rises */
        .fromTo([".ch-hero-text", ".ch-grid"],
          { scale: 1, filter: "blur(0px)", opacity: 1 },
          { scale: 1.10, filter: "blur(16px)", opacity: 0.12, ease: "power2.inOut", duration: 2 },
          0
        )
        .fromTo(".ch-tagline-1",
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0 },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, duration: 2 },
          0
        )
        .fromTo(".ch-tagline-2",
          { clipPath: "inset(0 0% 0 0)", autoAlpha: 1 },
          { clipPath: "inset(0 0% 0 0)", autoAlpha: 1, duration: 2 },
          0
        )
        .to(".ch-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)

        /* Step 2 — card expands to full screen */
        .to(".ch-main-card", {
          width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5,
        })

        /* Step 3 — browser mockup swoops in */
        .fromTo(".ch-mockup-wrap",
          { y: 260, z: -400, rotationX: 42, rotationY: -20, autoAlpha: 0, scale: 0.65 },
          { y: 0,   z: 0,    rotationX: 0,  rotationY: 0,   autoAlpha: 1, scale: 1,   ease: "expo.out", duration: 2.4 },
          "-=0.6")

        /* Step 4 — dashboard widgets stagger in */
        .fromTo(".ch-dash-item",
          { y: 14, autoAlpha: 0, scale: 0.96 },
          { y: 0,  autoAlpha: 1, scale: 1, stagger: 0.09, ease: "back.out(1.2)", duration: 1.1 },
          "-=1.6")

        /* Step 4b — chart bars grow on scroll reveal */
        .fromTo(".ch-bar",
          { scaleY: 0 },
          { scaleY: 1, stagger: 0.06, ease: "power3.out", duration: 0.9, transformOrigin: "bottom center" },
          "-=1.4")

        /* Step 5 — counter ticks up */
        .to(".ch-counter",
          { innerHTML: metricValue.toString(), snap: { innerHTML: 1 }, duration: 1.8, ease: "expo.out" },
          "-=1.6")

        /* Step 6 — floating badges pop in */
        .fromTo(".ch-float-badge",
          { y: 50, autoAlpha: 0, scale: 0.78, rotationZ: -6 },
          { y: 0,  autoAlpha: 1, scale: 1,    rotationZ: 0,  ease: "back.out(1.4)", duration: 1.3, stagger: 0.18 },
          "-=1.6")

        /* Step 7 — left text slides in */
        .fromTo(".ch-left-text",
          { x: -40, autoAlpha: 0 },
          { x: 0,   autoAlpha: 1, ease: "power4.out", duration: 1.3 },
          "-=1.3")

        /* Hold */
        .to({}, { duration: 0.5 })

        /* Step 8 — CTA reveal */
        .set(".ch-hero-text", { autoAlpha: 0 })
        .set(".ch-cta-wrap",  { autoAlpha: 1 })
        .to({}, { duration: 0.3 })
        .to([".ch-mockup-wrap", ".ch-float-badge", ".ch-left-text"], {
          scale: 0.93, y: -32, z: -160, autoAlpha: 0, ease: "power3.in", duration: 1.1, stagger: 0.04,
        })
        .to(".ch-main-card", {
          width: mobile ? "92vw" : "80vw",
          height: mobile ? "92vh" : "80vh",
          borderRadius: mobile ? "28px" : "36px",
          ease: "expo.inOut", duration: 1.8,
        }, "pull")
        .to(".ch-cta-wrap", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pull")

        /* Step 9 — card exits upward */
        .to(".ch-main-card", {
          y: -window.innerHeight - 260, ease: "power3.in", duration: 1.4,
        });

    }, rootRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "ch-root relative w-full h-screen flex items-center justify-center",
        "bg-white text-slate-900 font-sans antialiased overflow-hidden",
        className,
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-slate-50 to-white" aria-hidden />
      <div className="ch-orb ch-orb-1" aria-hidden />
      <div className="ch-orb ch-orb-2" aria-hidden />
      <div className="ch-orb ch-orb-3" aria-hidden />
      <div className="ch-grain" aria-hidden />
      <div className="ch-grid absolute inset-0 z-[1] pointer-events-none" aria-hidden />

      {/* ── Taglines (background layer) ─────────────── */}
      {/* NOTE: ch-tagline-1 starts invisible via gsap.set(); ch-tagline-2 clipped via gsap.set() */}
      <div className="ch-hero-text absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h1 className="ch-tagline-1 ch-tagline gsap-reveal text-5xl md:text-7xl lg:text-[5.75rem] font-bold tracking-tight leading-none mb-3">
          {tagline1}
        </h1>
        <h1 className="ch-tagline-2 ch-silver text-5xl md:text-7xl lg:text-[5.75rem] font-extrabold tracking-tighter leading-none" style={{ clipPath: "inset(0 100% 0 0)" }}>
          {tagline2}
        </h1>
      </div>

      {/* ── CTA section (revealed at end of timeline) ── */}
      <div className="ch-cta-wrap absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 gsap-reveal pointer-events-auto">
        <h2 className="ch-silver text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5">
          {ctaHeading}
        </h2>
        <p className="text-slate-500 text-lg md:text-xl mb-10 max-w-lg mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="ch-btn-primary">Start Free Trial</Link>
          <Link href="/dashboard" className="ch-btn-secondary">View Dashboard →</Link>
        </div>
      </div>

      {/* ── Deep card (foreground) ─────────────────────── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={cardRef}
          className="ch-main-card ch-card relative overflow-hidden gsap-reveal pointer-events-auto flex items-center justify-center"
          style={{
            width: "min(88vw, 1100px)",
            height: "min(88vh, 700px)",
            borderRadius: "32px",
          }}
        >
          <div className="ch-sheen" aria-hidden />

          {/* ── 2-column layout: text left | dashboard right ── */}
          <div className={cn(
            "relative w-full max-w-[1100px] mx-auto h-full z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1.5fr] items-center gap-6 lg:gap-12 px-6 md:px-10 lg:px-8 py-8 lg:py-10",
            isDebug && "border-2 border-red-500"
          )}>

            {/* LEFT — brand label + heading + description */}
            <div className="ch-left-text gsap-reveal flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 mt-5 lg:mt-0">
              {/* ElderAI wordmark */}
              <div className="flex items-center gap-2.5 mb-5 justify-center lg:justify-start">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shadow-[0_0_12px_rgba(74,222,128,0.2)] flex-shrink-0">
                  <I.Leaf />
                </div>
                <span className="text-slate-500 text-xs font-bold tracking-[0.18em] uppercase">ElderAI</span>
              </div>

              <h3 className="ch-card-silver text-[2rem] md:text-[2.4rem] lg:text-[2.75rem] font-black tracking-tight leading-[1.08] mb-5">
                {cardHeading}
              </h3>

              <p className="text-slate-500 text-sm md:text-base font-normal leading-relaxed max-w-sm mx-auto lg:mx-0">
                {cardDescription}
              </p>

              {/* Live status pill */}
              <div className="mt-7 flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(74,222,128,0.9)] animate-pulse" />
                <span className="text-emerald-600/80 text-[11px] font-semibold tracking-wide">All agents active</span>
              </div>
            </div>

            {/* RIGHT — browser frame + dashboard */}
            <div
              className="ch-mockup-wrap order-1 lg:order-2 relative flex items-center justify-center lg:justify-end w-full"
              style={{ perspective: "900px" }}
            >
              {/* Relative container for the browser and its floating badges */}
              <div
                className={cn(
                  "relative w-full flex justify-center lg:justify-end",
                  isDebug && "border-2 border-green-500"
                )}
                style={{ maxWidth: "580px" }}
              >
                {/* ── Browser frame ──────────────────────── */}
                <div
                  ref={browserRef}
                  className="ch-browser w-full flex flex-col"
                  style={{
                    height: "360px",
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Chrome bar */}
                  <div className="ch-chrome">
                    <div className="ch-dot" style={{ background: "#ff5f57" }} />
                    <div className="ch-dot" style={{ background: "#febc2e" }} />
                    <div className="ch-dot" style={{ background: "#28c840" }} />
                    <div className="ch-url-bar">app.elderai.co/dashboard</div>
                  </div>

                  {/* Dashboard body */}
                  <div className="ch-dash-wrap">
                    {/* Sidebar */}
                    <div className="ch-sidebar">
                      <div className="ch-sb-logo"><I.Leaf /></div>
                      <div className="ch-sb-item on" title="Dashboard"><I.Grid /></div>
                      <div className="ch-sb-item"    title="Loved Ones"><I.Users /></div>
                      <div className="ch-sb-item"    title="Schedules"><I.Cal /></div>
                      <div className="ch-sb-item"    title="Call Logs"><I.Phone /></div>
                      <div className="ch-sb-item"    title="Alerts"><I.Bell /></div>
                    </div>

                    {/* Main content */}
                    <div className="ch-main">
                      {/* Header */}
                      <div className="ch-dash-item ch-dash-header">
                        <div>
                          <div className="ch-dash-sub">Today · Jun 18</div>
                          <div className="ch-dash-title">Overview</div>
                        </div>
                        <div className="ch-live-badge">● Live</div>
                      </div>

                      {/* Metric cards */}
                      <div className="ch-dash-item ch-metrics">
                        <div className="ch-metric">
                          <div className="ch-metric-val" style={{ color: "#4ade80" }}>
                            <span className="ch-counter">0</span>%
                          </div>
                          <div className="ch-metric-lbl">Wellness</div>
                        </div>
                        <div className="ch-metric">
                          <div className="ch-metric-val" style={{ color: "#a78bfa" }}>98%</div>
                          <div className="ch-metric-lbl">Meds</div>
                        </div>
                        <div className="ch-metric">
                          <div className="ch-metric-val" style={{ color: "#38bdf8" }}>3/3</div>
                          <div className="ch-metric-lbl">Calls</div>
                        </div>
                      </div>

                      {/* Mood chart */}
                      <div className="ch-dash-item ch-chart">
                        <div className="ch-chart-title">Weekly Mood Trend</div>
                        <div className="ch-bars">
                          {BAR_H.map((h, i) => (
                            <div
                              key={i}
                              className={`ch-bar${i === 6 ? " hi" : ""}`}
                              style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                            />
                          ))}
                        </div>
                        <div className="ch-days">
                          {DAYS.map((d, i) => (
                            <div key={i} className={`ch-day${i === 6 ? " now" : ""}`}>{d}</div>
                          ))}
                        </div>
                      </div>

                      {/* Recent calls */}
                      <div className="ch-dash-item ch-calls">
                        <div className="ch-chart-title">Recent Calls</div>
                        {CALLS.map((c, i) => (
                          <div key={i} className="ch-call">
                            <div className="ch-avatar" style={{ background: c.bg, color: c.color }}>{c.init}</div>
                            <div className="flex-1 min-w-0">
                              <div className="ch-call-name">{c.name}</div>
                              <div className="ch-call-meta">{c.meta}</div>
                            </div>
                            <span className={`ch-tone ${c.cls}`}>{c.tone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Floating badges ─────────────────────── */}
                <div
                  className="ch-float-badge ch-badge gsap-reveal absolute flex items-center gap-3 rounded-2xl p-3 z-30"
                  style={{ top: "-15px", right: "-8px" }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                    style={{ background: "rgba(74,222,128,0.10)", borderColor: "rgba(74,222,128,0.2)", color: "#4ade80" }}>
                    <I.PhoneBadge />
                  </div>
                  <div>
                    <p className="text-slate-900 text-xs font-bold leading-tight">Eleanor Johnson</p>
                    <p className="text-[10px] font-medium mt-0.5 text-emerald-600">Wellness Call · Completed</p>
                  </div>
                </div>

                <div
                  className="ch-float-badge ch-badge gsap-reveal absolute flex items-center gap-3 rounded-2xl p-3 z-30"
                  style={{ bottom: "-15px", left: "-8px" }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                    style={{ background: "rgba(251,146,60,0.10)", borderColor: "rgba(251,146,60,0.2)", color: "#fb923c" }}>
                    <I.AlertBadge />
                  </div>
                  <div>
                    <p className="text-slate-900 text-xs font-bold leading-tight">2 Active Alerts</p>
                    <p className="text-[10px] font-medium mt-0.5 text-orange-500">Requires attention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
