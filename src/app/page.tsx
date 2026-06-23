"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import HeroPhoto from "@/components/HeroPhoto";
import { FloatingPaths } from "@/components/ui/background-paths";
import styles from "./page.module.css";

// --- PROFESSIONAL SVG ICONS ---

const IconPill = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </svg>
);

const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </svg>
);

const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconUserAdd = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
);

const IconClock = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconPhone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconReport = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconLineChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

// Health emblems for Marquee Logos
const LogoHospital = () => (
  <svg className={styles.marqueeLogoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const LogoHeart = () => (
  <svg className={styles.marqueeLogoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const LogoLeaf = () => (
  <svg className={styles.marqueeLogoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
    <path d="M9 22v-2" />
  </svg>
);

const LogoAtom = () => (
  <svg className={styles.marqueeLogoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);

export default function Home() {
  const [expandedCallId, setExpandedCallId] = useState<number | null>(null);
  const [alertAcknowledged, setAlertAcknowledged] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const toggleCallExpand = (id: number) => {
    setExpandedCallId(prev => prev === id ? null : id);
  };

  return (
    <main className={styles.container}>
      {/* Navigation Header */}
      <Header />

      {/* Photo Hero Section */}
      <HeroPhoto />

      {/* Showcase Section (Replacing Giphy Gifs with Modern CSS illustrations) */}
      <section className={styles.showcaseSection}>
        <div className={styles.sectionEyebrow}>
          <span className={styles.eyebrowLine} />
          Real-Time Insights
          <span className={styles.eyebrowLine} />
        </div>
        <h2 className={styles.sectionTitle}>Technical Reliability. Human Warmth.</h2>
        <div className={styles.gifGrid}>
          {/* Card 1: AI Call Simulation Visualizer */}
          <div className={styles.gifCard}>
            <div className={styles.illustrationContainer}>
              <div className={styles.voicePulseCircle}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
                <div className={styles.pulseRing1} />
                <div className={styles.pulseRing2} />
                <div className={styles.pulseRing3} />
              </div>
            </div>
            <div className={styles.showcaseMeta}>
              <h3 className={styles.showcaseTitle}>AI Voice Agent</h3>
              <p className={styles.showcaseDesc}>Intelligent wellness check-ins that sound as natural as family.</p>
            </div>
          </div>

          {/* Card 2: Interactive Floating Notifications list */}
          <div className={styles.gifCard}>
            <div className={styles.illustrationContainer}>
              <div className={styles.notifShowcaseViewport}>
                <div className={styles.notifShowcaseList}>
                  {/* 1. Item C (duplicate) */}
                  <div className={styles.notifShowcaseItem}>
                    <div className={styles.widgetIconWrap} style={{ width: "24px", height: "24px", minWidth: "24px", backgroundColor: "rgba(148, 163, 184, 0.08)", borderColor: "rgba(148, 163, 184, 0.15)", color: "#64748b" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <span>Weekly Wellness Report ready</span>
                  </div>

                  {/* 2. Item A (Item 1) */}
                  <div className={styles.notifShowcaseItem}>
                    <div className={styles.widgetIconWrap} style={{ width: "24px", height: "24px", minWidth: "24px", backgroundColor: "rgba(34, 197, 94, 0.08)", borderColor: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>Mom answered morning call: <strong style={{ color: "#22c55e" }}>Healthy</strong></span>
                  </div>

                  {/* 3. Item B (Item 2) */}
                  <div className={styles.notifShowcaseItem}>
                    <div className={styles.widgetIconWrap} style={{ width: "24px", height: "24px", minWidth: "24px", backgroundColor: "rgba(6, 182, 212, 0.08)", borderColor: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                        <path d="m8.5 8.5 7 7" />
                      </svg>
                    </div>
                    <span>Meds Compliance logged: <strong style={{ color: "#3b82f6" }}>100%</strong></span>
                  </div>

                  {/* 4. Item C (Item 3) */}
                  <div className={styles.notifShowcaseItem}>
                    <div className={styles.widgetIconWrap} style={{ width: "24px", height: "24px", minWidth: "24px", backgroundColor: "rgba(148, 163, 184, 0.08)", borderColor: "rgba(148, 163, 184, 0.15)", color: "#64748b" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <span>Weekly Wellness Report ready</span>
                  </div>

                  {/* 5. Item A (duplicate) */}
                  <div className={styles.notifShowcaseItem}>
                    <div className={styles.widgetIconWrap} style={{ width: "24px", height: "24px", minWidth: "24px", backgroundColor: "rgba(34, 197, 94, 0.08)", borderColor: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>Mom answered morning call: <strong style={{ color: "#22c55e" }}>Healthy</strong></span>
                  </div>

                  {/* 6. Item B (duplicate) */}
                  <div className={styles.notifShowcaseItem}>
                    <div className={styles.widgetIconWrap} style={{ width: "24px", height: "24px", minWidth: "24px", backgroundColor: "rgba(6, 182, 212, 0.08)", borderColor: "rgba(6, 182, 212, 0.15)", color: "#06b6d4" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                        <path d="m8.5 8.5 7 7" />
                      </svg>
                    </div>
                    <span>Meds Compliance logged: <strong style={{ color: "#3b82f6" }}>100%</strong></span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.showcaseMeta}>
              <h3 className={styles.showcaseTitle}>Instant Family Feed</h3>
              <p className={styles.showcaseDesc}>Stay connected with automated logging and real-time status updates.</p>
            </div>
          </div>

          {/* Card 3: Dashboard Mockup Graphic */}
          <div className={styles.gifCard}>
            <div className={styles.illustrationContainer}>
              <div className={styles.dashboardVisual}>
                <div className={styles.dashboardVisualHeader}>
                  <div className={styles.dashCircle} />
                  <div className={styles.dashCircle} />
                  <div className={styles.dashCircle} />
                  <div className={styles.dashLine} />
                </div>
                <div className={styles.dashboardVisualGrid}>
                  <div className={styles.dashBlock}>
                    <span className={styles.dashLabel}>WELLNESS</span>
                    <span className={styles.dashValue} style={{ color: "#3b82f6" }}>94%</span>
                    <div className={styles.dashUnderline} style={{ backgroundColor: "#3b82f6" }} />
                  </div>
                  <div className={styles.dashBlock}>
                    <span className={styles.dashLabel}>MEDS LOG</span>
                    <span className={styles.dashValue} style={{ color: "#0f172a" }}>98%</span>
                    <div className={styles.dashUnderline} style={{ backgroundColor: "#0f172a" }} />
                  </div>
                </div>
                <div className={styles.dashChart}>
                  <div className={styles.dashBar} style={{ height: "20px", backgroundColor: "#e0f2fe" }} />
                  <div className={styles.dashBar} style={{ height: "32px", backgroundColor: "#e0f2fe" }} />
                  <div className={styles.dashBar} style={{ height: "24px", backgroundColor: "#e0f2fe" }} />
                  <div className={styles.dashBar} style={{ height: "48px", backgroundColor: "#3b82f6" }} />
                  <div className={styles.dashBar} style={{ height: "60px", backgroundColor: "#1d4ed8" }} />
                </div>
              </div>
            </div>
            <div className={styles.showcaseMeta}>
              <h3 className={styles.showcaseTitle}>Modern Dashboard</h3>
              <p className={styles.showcaseDesc}>Powerful visualization of wellness trends and medical adherence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section id="trust" className={styles.trustSection}>
        <div className={styles.trustStatsContainer}>
          <div className={styles.trustContainer}>
            <div className={styles.trustStats}>
              <div className={styles.trustStat}>
                <div className={styles.trustStatNum}>2,500+</div>
                <div className={styles.trustStatLabel}>Families Protected</div>
              </div>
              <div className={styles.trustStat}>
                <div className={styles.trustStatNum}>85,000+</div>
                <div className={styles.trustStatLabel}>Wellness Calls Made</div>
              </div>
              <div className={styles.trustStat}>
                <div className={styles.trustStatNum}>99.2%</div>
                <div className={styles.trustStatLabel}>Reminder Success Rate</div>
              </div>
              <div className={styles.trustStat}>
                <div className={styles.trustStatNum}>24/7</div>
                <div className={styles.trustStatLabel}>AI Availability</div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.trustLogosContainer}>
          <div className={styles.marqueeLabel}>Trusted by families across healthcare networks</div>

          <div className={styles.marqueeWrap}>
            <div className={styles.marqueeTrack}>
              <div className={styles.marqueeLogo}><LogoHospital /> MedCare Network</div>
              <div className={styles.marqueeLogo}><LogoHeart /> SeniorLiving Co</div>
              <div className={styles.marqueeLogo}><LogoLeaf /> WellnessFirst</div>
              <div className={styles.marqueeLogo}><LogoAtom /> HealthBridge</div>
              <div className={styles.marqueeLogo}><LogoHeart /> FamilyCare Plus</div>
              <div className={styles.marqueeLogo}><LogoHospital /> CarePoint Health</div>
              <div className={styles.marqueeLogo}><LogoAtom /> HomeComfort AI</div>
              <div className={styles.marqueeLogo}><LogoLeaf /> ElderGuard</div>
              <div className={styles.marqueeLogo}><LogoHospital /> MedCare Network</div>
              <div className={styles.marqueeLogo}><LogoHeart /> SeniorLiving Co</div>
              <div className={styles.marqueeLogo}><LogoLeaf /> WellnessFirst</div>
              <div className={styles.marqueeLogo}><LogoAtom /> HealthBridge</div>
              <div className={styles.marqueeLogo}><LogoHeart /> FamilyCare Plus</div>
              <div className={styles.marqueeLogo}><LogoHospital /> CarePoint Health</div>
              <div className={styles.marqueeLogo}><LogoAtom /> HomeComfort AI</div>
              <div className={styles.marqueeLogo}><LogoLeaf /> ElderGuard</div>
            </div>
          </div>
        </div> */}
      </section>

      {/* How It Works Section */}
      <section id="how" className={styles.howSection}>
        <div className={styles.sectionEyebrow}>
          <span className={styles.eyebrowLine} />
          Simple Setup
          <span className={styles.eyebrowLine} />
        </div>
        <h2 className={styles.sectionTitle}>Up and running in minutes</h2>
        <p className={styles.sectionSub}>
          No apps for your loved ones to install. No tech skills required. Just real phone calls, powered by compassionate AI.
        </p>

        <div className={styles.stepsRow}>
          <div className={styles.stepCard}>
            <div className={styles.stepCardNumberWatermark}>01</div>
            <span className={styles.stepBadge}>Step 01</span>
            <div className={styles.stepNum}><IconUserAdd /></div>
            <div className={styles.stepTitle}>Add Loved Ones</div>
            <div className={styles.stepDesc}>Enter their phone number, name, and any health notes. Takes under two minutes.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepCardNumberWatermark}>02</div>
            <span className={styles.stepBadge}>Step 02</span>
            <div className={styles.stepNum}><IconCalendar /></div>
            <div className={styles.stepTitle}>Schedule Reminders</div>
            <div className={styles.stepDesc}>Set medication times, wellness check-ins, and appointment reminders on your schedule.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepCardNumberWatermark}>03</div>
            <span className={styles.stepBadge}>Step 03</span>
            <div className={styles.stepNum}><IconPhone /></div>
            <div className={styles.stepTitle}>AI Makes Calls</div>
            <div className={styles.stepDesc}>ElderAI&apos;s voice agents place natural phone check-ins exactly when scheduled — no apps needed.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepCardNumberWatermark}>04</div>
            <span className={styles.stepBadge}>Step 04</span>
            <div className={styles.stepNum}><IconLineChart /></div>
            <div className={styles.stepTitle}>Receive Insights</div>
            <div className={styles.stepDesc}>Get reports on mood, wellness trends, and medication adherence delivered to your dashboard.</div>
          </div>
        </div>

        <div className={styles.calloutCard}>
          {/* Section Background Paths */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none z-0">
            <FloatingPaths position={1} className="w-full h-full" />
            <FloatingPaths position={-1} className="w-full h-full" />
          </div>

          <div className={styles.calloutLeft} style={{ zIndex: 1 }}>
            <h3 className={styles.calloutTitle}>
              Compassionate Care, <br />
              <span className={styles.calloutTitleMuted}>Always Remembered.</span>
            </h3>
            <p className={styles.calloutDesc}>
              Our AI understands context and emotion, adapting its tone to provide genuine comfort and clear guidance.
            </p>

            <div className={styles.calloutWidgetList}>
              <div className={styles.widgetItem}>
                <div className={styles.widgetIconWrap}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className={styles.widgetText}>
                  <div className={styles.widgetTitle}>Automated Wellness Check</div>
                  <div className={styles.widgetSub}>&quot;Hi Sarah! Have you taken your vitamins today?&quot;</div>
                </div>
                <div className={styles.widgetActiveStatus}>
                  <span className={styles.activeDot} />
                  ACTIVE
                </div>
              </div>

              <div className={styles.widgetItem}>
                <div className={styles.widgetIconWrap} style={{ backgroundColor: "#ffffff", borderColor: "rgba(15, 23, 42, 0.08)", color: "#94a3b8" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <div className={styles.widgetText}>
                  <div className={styles.widgetTitle}>Medication Reminder</div>
                  <div className={styles.widgetSub}>Next scheduled check-in: 4:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.calloutRight} style={{ zIndex: 1 }}>
            <div className={styles.dashMockupCard}>
              <div className={styles.dashMockupHeader}>
                <h4 className={styles.dashMockupTitle}>Recent Calls</h4>
                <span className={styles.dashMockupLink}>View all →</span>
              </div>              <div className={styles.dashTimelineList}>
                {/* Call 1 */}
                <div className={styles.dashTimelineItem} onClick={() => toggleCallExpand(1)}>
                  <div className={styles.dashTimelineHeaderRow}>
                    <div className={`${styles.dashTimelineIcon} ${styles.dashIconHappy}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <div className={styles.dashTimelineContent}>
                      <div className={styles.dashTimelineTitleRow}>
                        <span className={styles.dashTimelineTitle}>Morning medication</span>
                        <span className={`${styles.dashBadge} ${styles.dashBadgeGreen}`}>Happy</span>
                      </div>
                      <span className={styles.dashTimelineMeta}>Eleanor • Today 9:02 AM • 3m 14s</span>
                    </div>
                  </div>
                  {expandedCallId === 1 && (
                    <div className={styles.dashTimelineExpandedContent} onClick={(e) => e.stopPropagation()}>
                      <p style={{ margin: 0, fontStyle: "italic" }}>
                        <strong>AI:</strong> &quot;Hi Eleanor! Hope you&apos;re having a great morning. Have you taken your morning blood pressure medication?&quot;
                      </p>
                      <p style={{ margin: "4px 0 0 0", fontStyle: "italic" }}>
                        <strong>Eleanor:</strong> &quot;Hello! Yes, dear, I just took it with my glass of water after breakfast.&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Call 2 */}
                <div className={styles.dashTimelineItem} onClick={() => toggleCallExpand(2)}>
                  <div className={styles.dashTimelineHeaderRow}>
                    <div className={`${styles.dashTimelineIcon} ${styles.dashIconSad}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <div className={styles.dashTimelineContent}>
                      <div className={styles.dashTimelineTitleRow}>
                        <span className={styles.dashTimelineTitle}>Evening check-in</span>
                        <span className={`${styles.dashBadge} ${styles.dashBadgeRed}`}>Sad</span>
                      </div>
                      <span className={styles.dashTimelineMeta}>Robert • Today 7:00 PM • 2m 48s</span>
                    </div>
                  </div>
                  {expandedCallId === 2 && (
                    <div className={styles.dashTimelineExpandedContent} onClick={(e) => e.stopPropagation()}>
                      <p style={{ margin: 0, fontStyle: "italic" }}>
                        <strong>AI:</strong> &quot;Hello Robert. How is your knee pain today?&quot;
                      </p>
                      <p style={{ margin: "4px 0 0 0", fontStyle: "italic" }}>
                        <strong>Robert:</strong> &quot;It&apos;s a bit stiff, but I took the pain relief. It should get better soon.&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Call 3 */}
                <div className={styles.dashTimelineItem} onClick={() => toggleCallExpand(3)}>
                  <div className={styles.dashTimelineHeaderRow}>
                    <div className={`${styles.dashTimelineIcon} ${styles.dashIconNeutral}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className={styles.dashTimelineContent}>
                      <div className={styles.dashTimelineTitleRow}>
                        <span className={styles.dashTimelineTitle}>Lunch reminder</span>
                        <span className={`${styles.dashBadge} ${styles.dashBadgeGrey}`}>No answer</span>
                      </div>
                      <span className={styles.dashTimelineMeta}>Eleanor • Today 12:00 PM</span>
                    </div>
                  </div>
                  {expandedCallId === 3 && (
                    <div className={styles.dashTimelineExpandedContent} onClick={(e) => e.stopPropagation()}>
                      <p style={{ margin: 0, fontStyle: "italic", color: "#64748b" }}>
                        <strong>System Log:</strong> Call placed at 12:00 PM. No answer after 60 seconds. Auto-hangup completed. Emergency contacts notified via SMS.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* High-fidelity Alert Box */}
              <div className={`${styles.dashAlertBox} ${alertAcknowledged ? styles.dashAlertBoxAcknowledged : ''}`}>
                <div className={styles.dashAlertHeader}>
                  <div className={`${styles.dashAlertIcon} ${alertAcknowledged ? styles.dashAlertIconGreen : ''}`}>
                    {alertAcknowledged ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    )}
                  </div>
                  <div className={styles.dashAlertMeta}>
                    <div className={`${styles.dashAlertTitle} ${alertAcknowledged ? styles.dashAlertTitleGreen : ''}`}>
                      {alertAcknowledged ? "Alert Acknowledged" : "Missed reminder — Eleanor Johnson"}
                    </div>
                    <div className={`${styles.dashAlertDesc} ${alertAcknowledged ? styles.dashAlertDescGreen : ''}`}>
                      {alertAcknowledged ? "Family contacts notified. Rescheduling call for 1:00 PM." : "Eleanor did not answer the 12:00 PM lunch reminder. This is her 2nd missed call today."}
                    </div>
                    <button
                      onClick={() => setAlertAcknowledged(true)}
                      className={alertAcknowledged ? styles.dashAlertAcknowledgeBtnGreen : styles.dashAlertAcknowledgeBtn}
                      style={{ marginTop: "10px", width: "fit-content" }}
                    >
                      {alertAcknowledged ? "Acknowledged ✓" : "Acknowledge"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionEyebrow}>
          <span className={styles.eyebrowLine} />
          Everything Included
          <span className={styles.eyebrowLine} />
        </div>
        <h2 className={styles.sectionTitle}>Built for families who care deeply</h2>
        <p className={styles.sectionSub}>
          Every feature is designed around one goal: making sure your loved one is safe, remembered, and never alone.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featCard}>
            <div className={styles.featIcon}><IconPill /></div>
            <div className={styles.featTitle}>Medication Reminders</div>
            <div className={styles.featDesc}>Daily calls at exact prescription times. The AI confirms medications were taken and logs compliance automatically.</div>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}><IconChat /></div>
            <div className={styles.featTitle}>Wellness Check-ins</div>
            <div className={styles.featDesc}>Natural conversations that go beyond yes/no questions. The AI listens for mood changes and physical discomfort cues.</div>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}><IconAlert /></div>
            <div className={styles.featTitle}>Emergency Escalation</div>
            <div className={styles.featDesc}>If a call is unanswered, or a loved one reports pain or confusion, ElderAI immediately alerts designated family members.</div>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}><IconChart /></div>
            <div className={styles.featTitle}>Insight Dashboard</div>
            <div className={styles.featDesc}>Track health metrics, mood fluctuations, and daily transcripts over time in a secure family portal.</div>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}><IconCalendar /></div>
            <div className={styles.featTitle}>Flexible Scheduling</div>
            <div className={styles.featDesc}>Easily set one-off check-ins or complex recurring schedules to match any care plan.</div>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}><IconLock /></div>
            <div className={styles.featTitle}>Private & Secure</div>
            <div className={styles.featDesc}>Enterprise-grade encryption keeps all call recordings, transcripts, and personal health data safe.</div>
          </div>
        </div>
      </section>

      {/* Analytics Section Note / Header */}
      {/* <section id="analytics" className={styles.featuresSection} style={{ borderTop: "1px solid rgba(15, 23, 42, 0.06)" }}>
        <div className={styles.sectionEyebrow}>
          <span className={styles.eyebrowLine} />
          Real-Time Reporting
          <span className={styles.eyebrowLine} />
        </div>
        <h2 className={styles.sectionTitle}>Stay connected, from anywhere</h2>
        <p className={styles.sectionSub} style={{ marginBottom: "0" }}>
          Gain actionable insights through sentiment evaluation, wellness tracking, and automated summaries logged after each conversation.
        </p>
      </section> */}

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Simple, transparent pricing</h2>
        <p className={styles.sectionSub}>
          Choose the billing option that fits your family&apos;s care needs.
        </p>

        <div className={styles.pricingGrid}>
          {/* Monthly Plan */}
          <div className={styles.priceCard}>
            <div className={styles.priceName}>Monthly Plan</div>
            <div className={styles.priceAmount}>
              <span className={styles.priceDollar}>$</span>
              <span className={styles.priceNum}>39</span>
              <span className={styles.pricePeriod}>/mo</span>
            </div>
            <p className={styles.priceDesc}>Flexible month-to-month coverage. Cancel anytime.</p>
            <div className={styles.priceDivider} />
            <div className={styles.priceFeatures}>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Up to 3 Calls Daily
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Dynamic Wellness Dialogues
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Medication & Pill Reminders
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Immediate Emergency Alerts
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Unlimited Family Access
              </div>
            </div>
            <Link href="https://elder-ai-dashboard.vercel.app/signup?plan=monthly" className={`${styles.btnPrice} ${styles.btnPriceGhost}`}>
              Choose Monthly
            </Link>
          </div>

          {/* Yearly Plan */}
          <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
            <div className={styles.priceBadge}>SAVE 25%</div>
            <div className={styles.priceName}>Yearly Plan</div>
            <div className={styles.priceAmount}>
              <span className={styles.priceDollar}>$</span>
              <span className={styles.priceNum}>29</span>
              <span className={styles.pricePeriod}>/mo</span>
            </div>
            <p className={styles.priceDesc}>Billed annually ($348/yr). Best value for long-term care.</p>
            <div className={styles.priceDivider} />
            <div className={styles.priceFeatures}>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Everything in Monthly Plan
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Save 25% (2 Months Free)
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Priority Support & Setup
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Advanced Weekly PDF Reports
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Customizable Call Schedules
              </div>
            </div>
            <Link href="https://elder-ai-dashboard.vercel.app/signup?plan=yearly" className={`${styles.btnPrice} ${styles.btnPriceFilled}`}>
              Choose Yearly
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Image
                src="/logo.png"
                alt="ElderAI Logo"
                width={130}
                height={32}
                style={{ objectFit: "contain", height: "32px", width: "auto", filter: "grayscale(100%) brightness(0.7)", opacity: 0.8 }}
              />
            </div>
            <p style={{ marginTop: "12px" }}>
              ElderAI — AI-powered wellness calls that remind, care, and keep families informed. Stay connected with elderly loved ones through intelligent voice calls.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Product</h4>
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className={styles.footerCol}>
            <h4>Company</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <a href="#">Support Center</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomText}>
            &copy; {currentYear} ElderAI Inc. All rights reserved.
          </div>
          <div className={styles.footerBottomText} style={{ color: "rgba(15, 23, 42, 0.35)" }}>
            {/* Made with Next.js and ❤️ for families. */}
          </div>
        </div>
      </footer>
    </main>
  );
}
