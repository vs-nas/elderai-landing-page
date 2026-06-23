"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../app/page.module.css";

const ElderAILogo = () => (
  <div className={styles.logoContainer} style={{ display: "flex", alignItems: "center" }}>
    <Image
      src="/logo.png"
      alt="ElderAI Logo"
      width={130}
      height={32}
      priority
      style={{ objectFit: "contain", height: "38px", width: "auto" }}
    />
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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <Link href="/" onClick={handleLogoClick}>
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
