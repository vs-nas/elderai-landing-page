"use client";

import Link from "next/link";
import styles from "../app/page.module.css";

export default function HeroPhoto() {
  return (
    <section className={styles.photoHero}>
      {/* Background video + legibility scrim */}
      <video
        className={styles.photoHeroBg}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      >
        <source src="/bgVideoWeb.webm" type="video/webm" />
        <source src="/bgVideo.mp4" type="video/mp4" />
      </video>
      <div className={styles.photoHeroScrim} aria-hidden />

      <div className={styles.photoHeroInner}>
        <h1 className={styles.photoHeadline}>
          AI voice agent for
          <br />
          elder care monitoring
        </h1>

        <p className={styles.photoSub}>
          Ensure safety, well-being, and companionship for your loved ones with
          proactive, personalized AI monitoring.
        </p>

        <div className={styles.photoCtaRow}>
          <Link href="https://elder-ai-dashboard.vercel.app/" className={styles.photoContactBtn}>
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
