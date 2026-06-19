"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";

// Types
type TabType = "dashboard" | "loved-ones" | "schedules" | "logs" | "alerts" | "settings";
type ToneType = "happy" | "sad" | "confused" | "low energy" | "no answer";

interface DialogueStep {
  speaker: "ai" | "user";
  text: string;
}

interface CallLog {
  id: string;
  user: string;
  dateTime: string;
  type: string;
  duration: string;
  tone: ToneType;
  outcome: "Completed" | "Missed";
  transcript?: DialogueStep[];
}

interface LovedOne {
  id: string;
  name: string;
  phone: string;
  callStart: string;
  callEnd: string;
  notes: string;
  wellness: string;
  meds: string;
  mood: string;
}

interface Reminder {
  id: string;
  user: string;
  type: string;
  message: string;
  time: string;
  repeat: string;
  active: boolean;
}

interface Alert {
  id: string;
  type: "Missed reminder" | "Concerning tone" | "Missed call" | "Confusion detected" | "Weekly summary";
  user: string;
  desc: string;
  meta: string;
  status: "Unacknowledged" | "Acknowledged";
  priority: "High" | "Normal";
}

// Initial Mock Data
const INITIAL_LOVED_ONES: LovedOne[] = [
  {
    id: "lo1",
    name: "Eleanor Johnson",
    phone: "+1 (555) 123-4567",
    callStart: "09:00 AM",
    callEnd: "08:00 PM",
    notes: "Gets dizzy when standing. Hearing aid user. Allergic to penicillin.",
    wellness: "94%",
    meds: "98%",
    mood: "↗ Positive"
  },
  {
    id: "lo2",
    name: "Robert Evans",
    phone: "+1 (555) 987-6543",
    callStart: "08:30 AM",
    callEnd: "07:30 PM",
    notes: "Knee arthritis, takes pain relief daily. Prefers slow, loud tone.",
    wellness: "88%",
    meds: "92%",
    mood: "→ Stable"
  }
];

const INITIAL_REMINDERS: Reminder[] = [
  { id: "rem1", user: "Eleanor Johnson", type: "Medication", message: "Morning medication", time: "9:00 AM", repeat: "Daily", active: true },
  { id: "rem2", user: "Eleanor Johnson", type: "Meal", message: "Lunch reminder", time: "12:00 PM", repeat: "Daily", active: true },
  { id: "rem3", user: "Robert Evans", type: "Check-in", message: "Evening check-in", time: "7:00 PM", repeat: "Daily", active: true },
  { id: "rem4", user: "Eleanor Johnson", type: "Companionship", message: "Morning chat", time: "9:05 AM", repeat: "Daily", active: true },
  { id: "rem5", user: "Robert Evans", type: "Hydration", message: "Afternoon hydration", time: "3:00 PM", repeat: "Daily", active: true },
  { id: "rem6", user: "Eleanor Johnson", type: "Sleep", message: "Bedtime reminder", time: "8:00 PM", repeat: "Daily", active: false }
];

const INITIAL_LOGS: CallLog[] = [
  {
    id: "log1",
    user: "Eleanor Johnson",
    dateTime: "Today 9:02 AM",
    type: "Medication",
    duration: "3m 14s",
    tone: "happy",
    outcome: "Completed",
    transcript: [
      { speaker: "ai", text: "Good morning Eleanor. Have you taken your medication today?" },
      { speaker: "user", text: "Yes, after breakfast." },
      { speaker: "ai", text: "Great. How are you feeling this morning?" },
      { speaker: "user", text: "Feeling much better today." }
    ]
  },
  {
    id: "log2",
    user: "Eleanor Johnson",
    dateTime: "Today 12:00 PM",
    type: "Meal",
    duration: "—",
    tone: "no answer",
    outcome: "Missed"
  },
  {
    id: "log3",
    user: "Robert Evans",
    dateTime: "Today 7:00 PM",
    type: "Check-in",
    duration: "2m 48s",
    tone: "sad",
    outcome: "Completed",
    transcript: [
      { speaker: "ai", text: "Hello Robert. How are you doing tonight?" },
      { speaker: "user", text: "A bit lonely. My knee has been hurting quite a bit." },
      { speaker: "ai", text: "I'm sorry to hear that, Robert. Have you taken your pain relief?" },
      { speaker: "user", text: "Yes, about an hour ago." }
    ]
  },
  {
    id: "log4",
    user: "Eleanor Johnson",
    dateTime: "Yesterday 9:05 AM",
    type: "Companionship",
    duration: "5m 22s",
    tone: "happy",
    outcome: "Completed",
    transcript: [
      { speaker: "ai", text: "Hi Eleanor! How was your walk yesterday?" },
      { speaker: "user", text: "It was wonderful. The weather was lovely and I saw some neighbors." },
      { speaker: "ai", text: "That sounds nice. Did you remember your sunhat?" },
      { speaker: "user", text: "I did!" }
    ]
  },
  {
    id: "log5",
    user: "Robert Evans",
    dateTime: "Yesterday 3:00 PM",
    type: "Hydration",
    duration: "1m 55s",
    tone: "confused",
    outcome: "Completed",
    transcript: [
      { speaker: "ai", text: "Hi Robert. Just reminding you to drink some water." },
      { speaker: "user", text: "Yes... what time is it? Did you call me already?" },
      { speaker: "ai", text: "It's 3:00 PM. This is our scheduled hydration reminder." },
      { speaker: "user", text: "Ah, yes. Let me get a glass." }
    ]
  },
  {
    id: "log6",
    user: "Eleanor Johnson",
    dateTime: "Yesterday 8:00 PM",
    type: "Sleep",
    duration: "2m 10s",
    tone: "low energy",
    outcome: "Completed",
    transcript: [
      { speaker: "ai", text: "Hello Eleanor, getting ready for bed?" },
      { speaker: "user", text: "Yes, I am rather tired tonight." },
      { speaker: "ai", text: "Alright. Make sure the stove is turned off and door is locked." },
      { speaker: "user", text: "All locked, thank you. Good night." }
    ]
  }
];

const INITIAL_ALERTS: Alert[] = [
  {
    id: "al1",
    type: "Missed reminder",
    user: "Eleanor Johnson",
    desc: "Eleanor did not answer the 12:00 PM lunch reminder. This is her 2nd missed call today.",
    meta: "Today · 12:01 PM · No answer after 60 seconds",
    status: "Unacknowledged",
    priority: "High"
  },
  {
    id: "al2",
    type: "Concerning tone",
    user: "Robert Evans",
    desc: "Robert's tone was detected as Sad during the 7:00 PM check-in. He mentioned feeling lonely.",
    meta: "Today · 7:04 PM · AI tone detection",
    status: "Unacknowledged",
    priority: "High"
  },
  {
    id: "al3",
    type: "Missed call",
    user: "Eleanor Johnson",
    desc: "Eleanor did not answer the 3:00 PM hydration reminder. 60 seconds of silence before auto-hangup.",
    meta: "Today · 3:01 PM · 60s inactivity rule",
    status: "Unacknowledged",
    priority: "Normal"
  },
  {
    id: "al4",
    type: "Confusion detected",
    user: "Robert Evans",
    desc: "Robert appeared confused during yesterday's hydration reminder. He asked the same question three times.",
    meta: "Yesterday · 3:02 PM · AI tone detection",
    status: "Acknowledged",
    priority: "High"
  },
  {
    id: "al5",
    type: "Weekly summary",
    user: "Eleanor Johnson",
    desc: "7 out of 10 scheduled calls completed this week. Average mood: Happy. 1 concerning tone detected.",
    meta: "Yesterday · 11:59 PM · Weekly digest",
    status: "Acknowledged",
    priority: "Normal"
  }
];

export default function DashboardPage() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [activeLovedOne, setActiveLovedOne] = useState<string>("Eleanor Johnson");

  // Core Data States
  const [lovedOnes, setLovedOnes] = useState<LovedOne[]>(INITIAL_LOVED_ONES);
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [logs, setLogs] = useState<CallLog[]>(INITIAL_LOGS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  // Filter States
  const [alertFilter, setAlertFilter] = useState<"all" | "unacknowledged" | "high">("all");
  const [logToneFilter, setLogToneFilter] = useState<"all" | ToneType>("all");
  const [logSearchQuery, setLogSearchQuery] = useState("");

  // Modal Dialog States
  const [isLovedOneModalOpen, setIsLovedOneModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedLogTranscript, setSelectedLogTranscript] = useState<CallLog | null>(null);

  // Form Fields
  const [newLOneName, setNewLOneName] = useState("");
  const [newLOnePhone, setNewLOnePhone] = useState("");
  const [newLOneStart, setNewLOneStart] = useState("09:00 AM");
  const [newLOneEnd, setNewLOneEnd] = useState("08:00 PM");
  const [newLOneNotes, setNewLOneNotes] = useState("");

  const [newRemUser, setNewRemUser] = useState("Eleanor Johnson");
  const [newRemType, setNewRemType] = useState("Medication");
  const [newRemMsg, setNewRemMsg] = useState("");
  const [newRemTime, setNewRemTime] = useState("");
  const [newRemRepeat, setNewRemRepeat] = useState("Daily");

  // Acknowledged alerts counter (sidebar notification count)
  const unacknowledgedCount = alerts.filter(a => a.status === "Unacknowledged").length;

  // Actions
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "Acknowledged" } : a));
  };

  const handleAcknowledgeAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, status: "Acknowledged" })));
  };

  const handleToggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleAddLovedOneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLOneName || !newLOnePhone) return;

    const newLOne: LovedOne = {
      id: `lo_${Date.now()}`,
      name: newLOneName,
      phone: newLOnePhone,
      callStart: newLOneStart,
      callEnd: newLOneEnd,
      notes: newLOneNotes || "No care notes added.",
      wellness: "—",
      meds: "—",
      mood: "Stable"
    };

    setLovedOnes(prev => [...prev, newLOne]);
    setIsLovedOneModalOpen(false);
    // Reset Form
    setNewLOneName("");
    setNewLOnePhone("");
    setNewLOneStart("09:00 AM");
    setNewLOneEnd("08:00 PM");
    setNewLOneNotes("");
  };

  const handleAddReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRemMsg || !newRemTime) return;

    const newRem: Reminder = {
      id: `rem_${Date.now()}`,
      user: newRemUser,
      type: newRemType,
      message: newRemMsg,
      time: newRemTime,
      repeat: newRemRepeat,
      active: true
    };

    setReminders(prev => [...prev, newRem]);
    setIsReminderModalOpen(false);
    // Reset Form
    setNewRemMsg("");
    setNewRemTime("");
  };

  return (
    <div className={styles.dashboardLayout}>
      {/* SIDEBAR PANEL */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.sidebarBrand}>
            {/* <div className={styles.sidebarIconContainer}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
                <path d="M9 22v-2" />
              </svg>
            </div> */}
            <span>ElderAI</span>
          </div>

          <div className={styles.sidebarMenu}>
            <div>
              <div className={styles.menuGroupTitle}>Overview</div>
              <ul className={styles.menuList}>
                <li>
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`${styles.menuItem} ${activeTab === "dashboard" ? styles.menuItemActive : ""}`}
                  >
                    <div className={styles.menuItemContent}>
                      <span className={styles.menuIcon}>📊</span>
                      Dashboard
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("loved-ones")}
                    className={`${styles.menuItem} ${activeTab === "loved-ones" ? styles.menuItemActive : ""}`}
                  >
                    <div className={styles.menuItemContent}>
                      <span className={styles.menuIcon}>👤</span>
                      My Loved Ones
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("schedules")}
                    className={`${styles.menuItem} ${activeTab === "schedules" ? styles.menuItemActive : ""}`}
                  >
                    <div className={styles.menuItemContent}>
                      <span className={styles.menuIcon}>🗓</span>
                      Schedules
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className={styles.menuGroupTitle}>Activity</div>
              <ul className={styles.menuList}>
                <li>
                  <button
                    onClick={() => setActiveTab("logs")}
                    className={`${styles.menuItem} ${activeTab === "logs" ? styles.menuItemActive : ""}`}
                  >
                    <div className={styles.menuItemContent}>
                      <span className={styles.menuIcon}>📞</span>
                      Call Logs
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("alerts")}
                    className={`${styles.menuItem} ${activeTab === "alerts" ? styles.menuItemActive : ""}`}
                  >
                    <div className={styles.menuItemContent}>
                      <span className={styles.menuIcon}>🚨</span>
                      Alerts
                    </div>
                    {unacknowledgedCount > 0 && (
                      <span className={styles.badge}>{unacknowledgedCount}</span>
                    )}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className={styles.menuGroupTitle}>Account</div>
              <ul className={styles.menuList}>
                <li>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`${styles.menuItem} ${activeTab === "settings" ? styles.menuItemActive : ""}`}
                  >
                    <div className={styles.menuItemContent}>
                      <span className={styles.menuIcon}>⚙️</span>
                      Settings
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.userAvatar}>MJ</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Michael Johnson</span>
            <span className={styles.userRole}>Family Admin</span>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <div className={styles.mainContent}>
        {/* TOPBAR HEADER */}
        <header className={styles.topBar}>
          <h2 className={styles.viewTitle} style={{ textTransform: "capitalize" }}>
            {activeTab.replace("-", " ")}
          </h2>

          <div className={styles.topBarActions}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input type="text" placeholder="Search calls, reminders..." className={styles.searchInput} />
            </div>

            <button className={styles.bellButton} onClick={() => setActiveTab("alerts")}>
              <span>🔔</span>
              {unacknowledgedCount > 0 && <span className={styles.bellDot} />}
            </button>

            <div className={styles.lovedOneDropdown}>
              <div className={styles.lovedOneAvatar}>EJ</div>
              <select
                value={activeLovedOne}
                onChange={(e) => setActiveLovedOne(e.target.value)}
                style={{ background: "transparent", border: "none", fontWeight: 700, outline: "none", cursor: "pointer" }}
              >
                {lovedOnes.map(lo => (
                  <option key={lo.id} value={lo.name}>{lo.name}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* VIEW BODY PANEL */}
        <main className={styles.viewBody}>

          {/* VIEW: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div>
              {/* Metrics Grid */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Calls This Week</span>
                    <span className={styles.statValue}>14</span>
                    <span className={`${styles.statTrend} ${styles.trendUp}`}>↗ +2 vs last week</span>
                  </div>
                  <div className={`${styles.statIcon} ${styles.iconPhone}`}>📞</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Reminders Completed</span>
                    <span className={styles.statValue}>11</span>
                    <span className={styles.statTrend} style={{ color: "#64748b" }}>79% completion rate</span>
                  </div>
                  <div className={`${styles.statIcon} ${styles.iconCheck}`}>✓</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Active Alerts</span>
                    <span className={styles.statValue}>{unacknowledgedCount}</span>
                    <span className={`${styles.statTrend} ${styles.trendDown}`} style={{ color: "#f97316" }}>
                      {unacknowledgedCount > 0 ? `+${unacknowledgedCount} active now` : "No pending alerts"}
                    </span>
                  </div>
                  <div className={`${styles.statIcon} ${styles.iconCaution}`}>⚠</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statHeader}>
                    <span className={styles.statLabel}>Avg. Mood Score</span>
                    <span className={styles.statValue}>7.4</span>
                    <span className={`${styles.statTrend} ${styles.trendUp}`}>↗ +0.3 this week</span>
                  </div>
                  <div className={`${styles.statIcon} ${styles.iconMood}`}>😊</div>
                </div>
              </div>

              {/* Columns Section */}
              <div className={styles.dashboardColumns}>
                {/* Left Card: Recent Calls */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Recent Calls</h3>
                    <button onClick={() => setActiveTab("logs")} className={styles.viewAllBtn}>
                      View all →
                    </button>
                  </div>

                  <div className={styles.callsList}>
                    {logs.slice(0, 5).map((log) => (
                      <div key={log.id} className={styles.callRow}>
                        <div className={styles.callProfile}>
                          <div className={styles.callToneIcon} style={{
                            backgroundColor: log.tone === "happy" ? "#ecfdf5" : log.tone === "sad" ? "#fef2f2" : log.tone === "confused" ? "#fff7ed" : log.tone === "low energy" ? "#fffbeb" : "#f1f5f9",
                            color: log.tone === "happy" ? "#059669" : log.tone === "sad" ? "#dc2626" : log.tone === "confused" ? "#d97706" : log.tone === "low energy" ? "#d97706" : "#475569"
                          }}>
                            {log.tone === "happy" ? "😊" : log.tone === "sad" ? "🙁" : log.tone === "confused" ? "😕" : log.tone === "low energy" ? "🥱" : "🔇"}
                          </div>
                          <div className={styles.callProfileText}>
                            <span className={styles.callTypeTitle}>{log.type} reminder</span>
                            <span className={styles.callMetadata}>
                              {log.user.split(" ")[0]} · {log.dateTime} {log.duration !== "—" ? `· ${log.duration}` : ""}
                            </span>
                          </div>
                        </div>
                        <span className={`${styles.toneBadge} ${log.tone === "happy" ? styles.badgeHappy : log.tone === "sad" ? styles.badgeSad : log.tone === "confused" ? styles.badgeConfused : log.tone === "low energy" ? styles.badgeLowEnergy : styles.badgeNoAnswer
                          }`}>
                          {log.tone}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column (Mood Chart & Timeline) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Mood Chart Card */}
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Weekly Mood — Eleanor</h3>
                    <div className={styles.moodChartSubtitle}>AI-detected tone across all calls this week</div>

                    <div className={styles.moodBarsStack}>
                      <div className={styles.moodBarRow}>
                        <div className={styles.moodBarLabel}>😊 Happy</div>
                        <div className={styles.progressBarContainer}>
                          <div className={`${styles.progressBar} ${styles.barHappy}`} style={{ width: "90%" }} />
                        </div>
                        <span className={styles.moodBarCount}>9</span>
                      </div>
                      <div className={styles.moodBarRow}>
                        <div className={styles.moodBarLabel}>🙁 Sad</div>
                        <div className={styles.progressBarContainer}>
                          <div className={`${styles.progressBar} ${styles.barSad}`} style={{ width: "20%" }} />
                        </div>
                        <span className={styles.moodBarCount}>2</span>
                      </div>
                      <div className={styles.moodBarRow}>
                        <div className={styles.moodBarLabel}>😕 Confused</div>
                        <div className={styles.progressBarContainer}>
                          <div className={`${styles.progressBar} ${styles.barConfused}`} style={{ width: "10%" }} />
                        </div>
                        <span className={styles.moodBarCount}>1</span>
                      </div>
                      <div className={styles.moodBarRow}>
                        <div className={styles.moodBarLabel}>🥱 Low energy</div>
                        <div className={styles.progressBarContainer}>
                          <div className={`${styles.progressBar} ${styles.barLowEnergy}`} style={{ width: "10%" }} />
                        </div>
                        <span className={styles.moodBarCount}>1</span>
                      </div>
                      <div className={styles.moodBarRow}>
                        <div className={styles.moodBarLabel}>🔇 No answer</div>
                        <div className={styles.progressBarContainer}>
                          <div className={`${styles.progressBar} ${styles.barNoAnswer}`} style={{ width: "10%" }} />
                        </div>
                        <span className={styles.moodBarCount}>1</span>
                      </div>
                    </div>

                    <h3 className={styles.cardTitle} style={{ fontSize: "14px", marginTop: "28px", marginBottom: "14px" }}>Today&apos;s Schedule</h3>
                    <div className={styles.timeline}>
                      <div className={styles.timelineItem}>
                        <span className={styles.timelineTime}>9:00 AM</span>
                        <div className={`${styles.timelineStatus} ${styles.statusChecked}`}>✓</div>
                        <span className={styles.timelineLabel}>Morning medication</span>
                      </div>
                      <div className={styles.timelineItem}>
                        <span className={styles.timelineTime}>12:00 PM</span>
                        <div className={`${styles.timelineStatus} ${styles.statusMissed}`}>✕</div>
                        <span className={styles.timelineLabel} style={{ color: "#ef4444" }}>Lunch reminder — no answer</span>
                      </div>
                      <div className={styles.timelineItem}>
                        <span className={styles.timelineTime}>3:00 PM</span>
                        <div className={`${styles.timelineStatus} ${styles.statusEmpty}`} />
                        <span className={styles.timelineLabel}>Afternoon hydration</span>
                      </div>
                      <div className={styles.timelineItem}>
                        <span className={styles.timelineTime}>8:00 PM</span>
                        <div className={`${styles.timelineStatus} ${styles.statusEmpty}`} />
                        <span className={styles.timelineLabel}>Evening companionship</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Alerts Row */}
              {alerts.filter(a => a.status === "Unacknowledged").length > 0 && (
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Active Alerts</h3>
                    <button onClick={() => setActiveTab("alerts")} className={styles.viewAllBtn}>
                      View all alerts →
                    </button>
                  </div>
                  <div className={styles.alertsGrid}>
                    {alerts.filter(a => a.status === "Unacknowledged").slice(0, 2).map((alert) => (
                      <div key={alert.id} className={styles.alertCard}>
                        <div className={styles.alertCardContent}>
                          <div className={`${styles.alertBadgeIcon} ${alert.type === "Missed reminder" ? styles.iconRed : alert.type === "Concerning tone" ? styles.iconOrange : styles.iconPurple
                            }`}>
                            {alert.type === "Missed reminder" ? "🚨" : alert.type === "Concerning tone" ? "🙁" : "📞"}
                          </div>
                          <div className={styles.alertText}>
                            <span className={styles.alertTitle}>{alert.type} — {alert.user}</span>
                            <p className={styles.alertDesc}>{alert.desc}</p>
                            <span className={styles.alertMeta}>{alert.meta}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                          className={styles.ackBtn}
                        >
                          Acknowledge
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW: MY LOVED ONES */}
          {activeTab === "loved-ones" && (
            <div>
              <div className={styles.lovedOnesHeader}>
                <h3 className={styles.cardTitle} style={{ fontSize: "18px" }}>Monitored Family Members</h3>
                <button className={styles.addBtn} onClick={() => setIsLovedOneModalOpen(true)}>
                  <span>＋</span> Add Loved One
                </button>
              </div>

              <div className={styles.lovedOnesGrid}>
                {lovedOnes.map(lo => (
                  <div key={lo.id} className={styles.lovedOneCard}>
                    <div className={styles.lovedOneProfile}>
                      <div className={styles.lovedOneProfileAvatar}>
                        {lo.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className={styles.lovedOneProfileText}>
                        <span className={styles.lovedOneName}>{lo.name}</span>
                        <span className={styles.lovedOnePhone}>{lo.phone}</span>
                        <span className={styles.lovedOneStatus}>
                          <span className={styles.lovedOneStatusDot} /> Active Monitoring
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                        Care Notes
                      </div>
                      <p className={styles.lovedOneBlockText}>{lo.notes}</p>
                    </div>

                    <div style={{ fontSize: "12px", color: "#64748b", margin: "10px 0" }}>
                      ⏰ Call Window: <strong>{lo.callStart} - {lo.callEnd}</strong>
                    </div>

                    <div className={styles.lovedOneCardStats}>
                      <div className={styles.lovedOneMiniMetric}>
                        <span className={styles.lovedOneMiniMetricNum}>{lo.wellness}</span>
                        <span className={styles.lovedOneMiniMetricLabel}>Wellness</span>
                      </div>
                      <div className={styles.lovedOneMiniMetric}>
                        <span className={styles.lovedOneMiniMetricNum}>{lo.meds}</span>
                        <span className={styles.lovedOneMiniMetricLabel}>Compliance</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: SCHEDULES */}
          {activeTab === "schedules" && (
            <div>
              <div className={styles.schedulesHeader}>
                <h3 className={styles.cardTitle} style={{ fontSize: "18px" }}>Automated Reminders & Calls</h3>
                <button className={styles.addBtn} onClick={() => setIsReminderModalOpen(true)}>
                  <span>＋</span> Add Reminder
                </button>
              </div>

              <div className={styles.schedulesList}>
                {reminders.map(rem => (
                  <div key={rem.id} className={styles.scheduleRow}>
                    <div className={styles.scheduleInfo}>
                      <div className={styles.scheduleTypeIcon}>
                        {rem.type === "Medication" ? "💊" : rem.type === "Meal" ? "🍽️" : rem.type === "Hydration" ? "💧" : rem.type === "Sleep" ? "🌙" : "💬"}
                      </div>
                      <div className={styles.scheduleText}>
                        <span className={styles.scheduleMsg}>{rem.message}</span>
                        <span className={styles.scheduleMeta}>
                          Target: {rem.user} · Frequency: {rem.repeat}
                        </span>
                      </div>
                    </div>

                    <div className={styles.scheduleActions}>
                      <span className={styles.scheduleTimeBadge}>{rem.time}</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={rem.active}
                          onChange={() => handleToggleReminder(rem.id)}
                        />
                        <span className={styles.slider} />
                      </label>
                      <button
                        onClick={() => handleDeleteReminder(rem.id)}
                        className={styles.deleteBtn}
                        title="Delete Schedule"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: CALL LOGS */}
          {activeTab === "logs" && (
            <div>
              <div className={styles.filterRow}>
                <div className={styles.filterPills}>
                  <button
                    onClick={() => setLogToneFilter("all")}
                    className={`${styles.filterPill} ${logToneFilter === "all" ? styles.filterPillActive : ""}`}
                  >
                    All tones
                  </button>
                  <button
                    onClick={() => setLogToneFilter("happy")}
                    className={`${styles.filterPill} ${logToneFilter === "happy" ? styles.filterPillActive : ""}`}
                  >
                    Happy
                  </button>
                  <button
                    onClick={() => setLogToneFilter("sad")}
                    className={`${styles.filterPill} ${logToneFilter === "sad" ? styles.filterPillActive : ""}`}
                  >
                    Sad
                  </button>
                  <button
                    onClick={() => setLogToneFilter("confused")}
                    className={`${styles.filterPill} ${logToneFilter === "confused" ? styles.filterPillActive : ""}`}
                  >
                    Confused
                  </button>
                  <button
                    onClick={() => setLogToneFilter("no answer")}
                    className={`${styles.filterPill} ${logToneFilter === "no answer" ? styles.filterPillActive : ""}`}
                  >
                    No answer
                  </button>
                </div>

                <div className={styles.searchBar}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={logSearchQuery}
                    onChange={(e) => setLogSearchQuery(e.target.value)}
                    className={styles.searchInput}
                    style={{ width: "200px" }}
                  />
                </div>
              </div>

              <div className={styles.logsTableContainer}>
                <table className={styles.logsTable}>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Date & Time</th>
                      <th>Type</th>
                      <th>Duration</th>
                      <th>Tone</th>
                      <th>Outcome</th>
                      <th>Transcript</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs
                      .filter(log => {
                        const matchesTone = logToneFilter === "all" || log.tone === logToneFilter;
                        const matchesSearch = log.user.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                          log.type.toLowerCase().includes(logSearchQuery.toLowerCase());
                        return matchesTone && matchesSearch;
                      })
                      .map((log) => (
                        <tr key={log.id}>
                          <td style={{ fontWeight: 600 }}>{log.user.split(" ")[0]}</td>
                          <td>{log.dateTime}</td>
                          <td>{log.type}</td>
                          <td>{log.duration}</td>
                          <td>
                            <span className={`${styles.toneBadge} ${log.tone === "happy" ? styles.badgeHappy : log.tone === "sad" ? styles.badgeSad : log.tone === "confused" ? styles.badgeConfused : log.tone === "low energy" ? styles.badgeLowEnergy : styles.badgeNoAnswer
                              }`}>
                              {log.tone}
                            </span>
                          </td>
                          <td>
                            {log.outcome === "Completed" ? (
                              <span className={styles.outcomeCompleted}>
                                <span style={{ fontSize: "10px" }}>✓</span> Completed
                              </span>
                            ) : (
                              <span className={styles.outcomeMissed}>
                                <span style={{ fontSize: "10px" }}>✕</span> Missed
                              </span>
                            )}
                          </td>
                          <td>
                            {log.transcript ? (
                              <button
                                onClick={() => setSelectedLogTranscript(log)}
                                className={styles.viewTranscriptLink}
                                style={{ background: "transparent", border: "none", fontStyle: "inherit", padding: 0 }}
                              >
                                &gt; View
                              </button>
                            ) : (
                              <span style={{ color: "#94a3b8" }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: ALERTS */}
          {activeTab === "alerts" && (
            <div>
              <div className={styles.filterRow}>
                <div className={styles.filterPills}>
                  <button
                    onClick={() => setAlertFilter("all")}
                    className={`${styles.filterPill} ${alertFilter === "all" ? styles.filterPillActive : ""}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setAlertFilter("unacknowledged")}
                    className={`${styles.filterPill} ${alertFilter === "unacknowledged" ? styles.filterPillActive : ""}`}
                  >
                    Unacknowledged
                  </button>
                  <button
                    onClick={() => setAlertFilter("high")}
                    className={`${styles.filterPill} ${alertFilter === "high" ? styles.filterPillActive : ""}`}
                  >
                    High priority
                  </button>
                </div>

                {unacknowledgedCount > 0 && (
                  <button
                    onClick={handleAcknowledgeAllAlerts}
                    className={styles.addBtn}
                    style={{ backgroundColor: "transparent", border: "1.5px solid #451a03", color: "#451a03", boxShadow: "none" }}
                  >
                    ✓ Acknowledge all
                  </button>
                )}
              </div>

              <div className={styles.alertsGrid}>
                {alerts
                  .filter(alert => {
                    if (alertFilter === "unacknowledged") return alert.status === "Unacknowledged";
                    if (alertFilter === "high") return alert.priority === "High";
                    return true;
                  })
                  .map((alert) => (
                    <div key={alert.id} className={styles.alertCard} style={{ opacity: alert.status === "Acknowledged" ? 0.7 : 1 }}>
                      <div className={styles.alertCardContent}>
                        <div className={`${styles.alertBadgeIcon} ${alert.type === "Missed reminder" ? styles.iconRed : alert.type === "Concerning tone" ? styles.iconOrange : alert.type === "Missed call" ? styles.iconPurple : alert.type === "Confusion detected" ? styles.iconOrange : styles.iconGreen
                          }`}>
                          {alert.type === "Missed reminder" ? "🚨" : alert.type === "Concerning tone" ? "🙁" : alert.type === "Missed call" ? "🔇" : alert.type === "Confusion detected" ? "❓" : "✓"}
                        </div>
                        <div className={styles.alertText}>
                          <span className={styles.alertTitle}>{alert.type} — {alert.user}</span>
                          <p className={styles.alertDesc}>{alert.desc}</p>
                          <span className={styles.alertMeta}>{alert.meta}</span>
                        </div>
                      </div>

                      {alert.status === "Unacknowledged" ? (
                        <button
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                          className={styles.ackBtn}
                        >
                          Acknowledge
                        </button>
                      ) : (
                        <button className={`${styles.ackBtn} ${styles.ackBtnDisabled}`} disabled>
                          Acknowledged
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS */}
          {activeTab === "settings" && (
            <div className={styles.card} style={{ maxWidth: "600px" }}>
              <h3 className={styles.cardTitle} style={{ marginBottom: "20px" }}>Account Settings</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Administrator Full Name</label>
                  <input type="text" defaultValue="Michael Johnson" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Notification Email</label>
                  <input type="email" defaultValue="michael.johnson@family.com" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Designated Emergency Contact Number</label>
                  <input type="tel" defaultValue="+1 (555) 999-1122" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>AI Voice Accent Preferences</label>
                  <select className={styles.formSelect}>
                    <option>Standard Warm American (Male)</option>
                    <option>Standard Warm American (Female)</option>
                    <option>British Gentle (Female)</option>
                  </select>
                </div>
                <button className={styles.addBtn} style={{ marginTop: "12px" }}>
                  Save Account Profiles
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD LOVED ONE */}
      {isLovedOneModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Add Loved One</h3>
              <button className={styles.closeBtn} onClick={() => setIsLovedOneModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddLovedOneSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full name *</label>
                <input
                  type="text"
                  placeholder="e.g. Margaret Williams"
                  value={newLOneName}
                  onChange={(e) => setNewLOneName(e.target.value)}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Existing phone number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={newLOnePhone}
                  onChange={(e) => setNewLOnePhone(e.target.value)}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Preferred call start</label>
                  <input
                    type="text"
                    value={newLOneStart}
                    onChange={(e) => setNewLOneStart(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Preferred call end</label>
                  <input
                    type="text"
                    value={newLOneEnd}
                    onChange={(e) => setNewLOneEnd(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Care notes (optional)</label>
                <textarea
                  placeholder="e.g. Gets dizzy when standing. Hearing aid user. Allergic to penicillin."
                  value={newLOneNotes}
                  onChange={(e) => setNewLOneNotes(e.target.value)}
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={() => setIsLovedOneModalOpen(false)} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Add Loved One
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD REMINDER */}
      {isReminderModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Add Reminder</h3>
              <button className={styles.closeBtn} onClick={() => setIsReminderModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddReminderSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Elderly user *</label>
                <select
                  value={newRemUser}
                  onChange={(e) => setNewRemUser(e.target.value)}
                  className={styles.formSelect}
                >
                  {lovedOnes.map(lo => (
                    <option key={lo.id} value={lo.name}>{lo.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Reminder type *</label>
                <select
                  value={newRemType}
                  onChange={(e) => setNewRemType(e.target.value)}
                  className={styles.formSelect}
                >
                  <option>Medication</option>
                  <option>Meal</option>
                  <option>Hydration</option>
                  <option>Sleep</option>
                  <option>Companionship / Chat</option>
                  <option>Custom</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Reminder message</label>
                <input
                  type="text"
                  placeholder="e.g. Time for your Metformin 500mg!"
                  value={newRemMsg}
                  onChange={(e) => setNewRemMsg(e.target.value)}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Call time *</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:00 AM"
                    value={newRemTime}
                    onChange={(e) => setNewRemTime(e.target.value)}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Repeat</label>
                  <select
                    value={newRemRepeat}
                    onChange={(e) => setNewRemRepeat(e.target.value)}
                    className={styles.formSelect}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={() => setIsReminderModalOpen(false)} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW TRANSCRIPT */}
      {selectedLogTranscript && (
        <div className={styles.modalOverlay} onClick={() => setSelectedLogTranscript(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "550px" }}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle} style={{ fontSize: "16px" }}>
                Transcript: {selectedLogTranscript.type} Call ({selectedLogTranscript.user.split(" ")[0]})
              </h3>
              <button className={styles.closeBtn} onClick={() => setSelectedLogTranscript(null)}>×</button>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              padding: "10px 0",
              maxHeight: "350px",
              overflowY: "auto"
            }}>
              {selectedLogTranscript.transcript?.map((msg, index) => (
                <div key={index} style={{
                  display: "flex",
                  flexDirection: msg.speaker === "ai" ? "row" : "row-reverse",
                  alignItems: "flex-start",
                  gap: "10px"
                }}>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: msg.speaker === "ai" ? "#fffbeb" : "#ecfdf5",
                    color: msg.speaker === "ai" ? "#d97706" : "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {msg.speaker === "ai" ? "AI" : "EJ"}
                  </div>
                  <div style={{
                    maxWidth: "75%",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    fontSize: "13.5px",
                    lineHeight: "1.5",
                    backgroundColor: msg.speaker === "ai" ? "#f3e8ff" : "#d1fae5",
                    color: msg.speaker === "ai" ? "#5b21b6" : "#065f46",
                    border: msg.speaker === "ai" ? "1px solid #e9d5ff" : "1px solid #a7f3d0"
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.modalFooter}>
              <button onClick={() => setSelectedLogTranscript(null)} className={styles.cancelBtn}>
                Close Transcript
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
