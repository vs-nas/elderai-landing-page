"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../app/page.module.css";

const ElderAILogo = () => (
  <div className={styles.logoContainer} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    {/* <div style={{
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      backgroundColor: "#451a03",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fbbf24",
      boxShadow: "0 0 12px rgba(251, 191, 36, 0.2)"
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
        <path d="M9 22v-2" />
      </svg>
    </div> */}
    <span style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em" }}>ElderAI</span>
  </div>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      const headerOffset = scrolled ? 70 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <Link href="/">
        <ElderAILogo />
      </Link>

      <nav className={styles.nav}>
        <a href="#how" onClick={(e) => handleNavClick(e, "how")} className={styles.navLink}>How it works</a>
        <a href="#features" onClick={(e) => handleNavClick(e, "features")} className={styles.navLink}>Features</a>
        <a href="#pricing" onClick={(e) => handleNavClick(e, "pricing")} className={styles.navLink}>Pricing</a>
      </nav>

      <div className={styles.headerActions}>
        <Link href="https://elder-ai-dashboard.vercel.app/signin" className={styles.loginBtn}>
          Sign in
        </Link>
        <Link href="https://elder-ai-dashboard.vercel.app/" className={styles.getStartedBtn}>
          Get Started
        </Link>
      </div>
    </header>
  );
}
