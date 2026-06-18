import Link from "next/link";
import Header from "@/components/Header";
import ConsoleWidget from "@/components/ConsoleWidget";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
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
  return (
    <main className={styles.container}>
      {/* Navigation Header */}
      <Header />

      {/* Hero Section with Kokonut UI Geometric Shapes */}
      <HeroGeometric
        badge="Live AI Wellness Calls · Now Available"
        title1="AI Voice Agents For"
        title2="Elder Care Monitoring"
      >
        <p className={styles.subheading} style={{ zIndex: 10, position: "relative", marginBottom: "32px", marginTop: "12px" }}>
          Autonomous voice agents that call, monitor, and report on the wellbeing of elderly family members — 24/7.
        </p>

        <div className={styles.heroCta} style={{ zIndex: 10, position: "relative", marginBottom: "48px" }}>
          <Link href="/dashboard" className={`${styles.getStartedBtn} ${styles.btnHero}`}>
            Start Free Trial
          </Link>
          <Link href="/dashboard" className={`${styles.loginBtn} ${styles.btnHero}`}>
            ▶ Watch Demo
          </Link>
        </div>

        {/* Console and Metrics Widget */}
        <ConsoleWidget />
      </HeroGeometric>

      {/* Showcase Section (Replacing Giphy Gifs with Modern CSS illustrations) */}
      <section className={styles.showcaseSection}>
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
            <div className={styles.gifCaption}>
              AI Voice Agent conducting wellness check-ins
            </div>
          </div>

          {/* Card 2: Interactive Floating Notifications list */}
          <div className={styles.gifCard}>
            <div className={styles.illustrationContainer}>
              <div className={styles.notifShowcaseList}>
                <div className={styles.notifShowcaseItem}>
                  <div className={styles.notifDot} style={{ backgroundColor: "#22c55e" }} />
                  <span>Mom answered morning call: <strong>Healthy</strong></span>
                </div>
                <div className={styles.notifShowcaseItem}>
                  <div className={styles.notifDot} style={{ backgroundColor: "#a78bfa" }} />
                  <span>Meds Compliance logged: <strong>100%</strong></span>
                </div>
                <div className={styles.notifShowcaseItem}>
                  <div className={styles.notifDot} style={{ backgroundColor: "#38bdf8" }} />
                  <span>Weekly Wellness Report ready</span>
                </div>
              </div>
            </div>
            <div className={styles.gifCaption}>
              Real-time family updates and insights
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
                    <span className={styles.dashValue}>94%</span>
                  </div>
                  <div className={styles.dashBlock}>
                    <span className={styles.dashLabel}>MEDS LOG</span>
                    <span className={styles.dashValue} style={{ color: "#a78bfa" }}>98%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.gifCaption}>
              Modern analytics dashboard with wellness tracking
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section id="trust" className={styles.trustSection}>
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
              {/* Duplicate track for seamless loop */}
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
        </div>
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
          No apps for your loved ones to install. No tech skills required. Just real phone calls, powered by AI.
        </p>

        <div className={styles.stepsRow}>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}><IconUserAdd /></div>
            <div className={styles.stepTitle}>Add Loved Ones</div>
            <div className={styles.stepDesc}>Enter their phone number, name, and any health notes. Takes under two minutes.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}><IconClock /></div>
            <div className={styles.stepTitle}>Schedule Reminders</div>
            <div className={styles.stepDesc}>Set medication times, wellness check-ins, and appointment reminders on your schedule.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}><IconPhone /></div>
            <div className={styles.stepTitle}>AI Makes Calls</div>
            <div className={styles.stepDesc}>ElderAI&apos;s voice agents place natural phone check-ins exactly when scheduled — no apps needed.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}><IconReport /></div>
            <div className={styles.stepTitle}>Receive Insights</div>
            <div className={styles.stepDesc}>Get reports on mood, wellness trends, and medication adherence delivered to your dashboard.</div>
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
      <section id="analytics" className={styles.featuresSection} style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div className={styles.sectionEyebrow}>
          <span className={styles.eyebrowLine} />
          Real-Time Reporting
          <span className={styles.eyebrowLine} />
        </div>
        <h2 className={styles.sectionTitle}>Stay connected, from anywhere</h2>
        <p className={styles.sectionSub} style={{ marginBottom: "0" }}>
          Gain actionable insights through sentiment evaluation, wellness tracking, and automated summaries logged after each conversation.
        </p>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Simple, transparent pricing</h2>
        <p className={styles.sectionSub}>
          Choose the plan that fits your family&apos;s care needs.
        </p>

        <div className={styles.pricingGrid}>
          {/* Starter */}
          <div className={styles.priceCard}>
            <div className={styles.priceName}>Starter</div>
            <div className={styles.priceAmount}>
              <span className={styles.priceDollar}>$</span>
              <span className={styles.priceNum}>19</span>
              <span className={styles.pricePeriod}>/mo</span>
            </div>
            <p className={styles.priceDesc}>Perfect for basic reminders and check-ins.</p>
            <div className={styles.priceDivider} />
            <div className={styles.priceFeatures}>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                1 Daily Wellness Call
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Medication Reminders
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Simple SMS Alerts
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                1 Family Member Access
              </div>
            </div>
            <Link href="/dashboard" className={`${styles.btnPrice} ${styles.btnPriceGhost}`}>
              Choose Starter
            </Link>
          </div>

          {/* Family */}
          <div className={`${styles.priceCard} ${styles.priceCardFeatured}`}>
            <div className={styles.priceBadge}>POPULAR</div>
            <div className={styles.priceName}>Family</div>
            <div className={styles.priceAmount}>
              <span className={styles.priceDollar}>$</span>
              <span className={styles.priceNum}>39</span>
              <span className={styles.pricePeriod}>/mo</span>
            </div>
            <p className={styles.priceDesc}>Our most popular plan for complete peace of mind.</p>
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
                Emergency Escalation Protocol
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Sentiment Analysis & Dashboard
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                5 Family Members Access
              </div>
            </div>
            <Link href="/dashboard" className={`${styles.btnPrice} ${styles.btnPriceFilled}`}>
              Choose Family
            </Link>
          </div>

          {/* Professional */}
          <div className={styles.priceCard}>
            <div className={styles.priceName}>Healthcare</div>
            <div className={styles.priceAmount}>
              <span className={styles.priceDollar}>$</span>
              <span className={styles.priceNum}>89</span>
              <span className={styles.pricePeriod}>/mo</span>
            </div>
            <p className={styles.priceDesc}>Designed for care managers and senior networks.</p>
            <div className={styles.priceDivider} />
            <div className={styles.priceFeatures}>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Unlimited Daily Calls
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Custom AI Voices & Prompts
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Full API Integrations
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Dedicated Support Manager
              </div>
              <div className={styles.pfItem}>
                <div className={styles.pfCheck}>✓</div>
                Unlimited Members Access
              </div>
            </div>
            <Link href="/dashboard" className={`${styles.btnPrice} ${styles.btnPriceGhost}`}>
              Choose Healthcare
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "#113f26",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4ade80",
                padding: "4px"
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
                </svg>
              </div>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "white" }}>ElderAI</span>
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
            <a href="#analytics">Reporting</a>
          </div>

          <div className={styles.footerCol}>
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <a href="#">Support Center</a>
            <a href="#">Sales Inquiry</a>
            <a href="#">Media Kit</a>
            <a href="#">API Docs</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerBottomText}>
            &copy; 2026 ElderAI Inc. All rights reserved.
          </div>
          <div className={styles.footerBottomText} style={{ color: "rgba(255, 255, 255, 0.2)" }}>
            Made with Next.js and ❤️ for families.
          </div>
        </div>
      </footer>
    </main>
  );
}
