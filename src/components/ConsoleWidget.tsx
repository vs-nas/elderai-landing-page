"use client";

import { useState } from "react";
import styles from "../app/page.module.css";

type PatientName = "Margaret Johnson" | "Robert Evans" | "Arthur Pendelton" | "Eleanor Vance";

interface DialogueStep {
  speaker: "ai" | "user";
  text: string;
}

interface PatientData {
  wellnessScore: string;
  medCompliance: string;
  moodTrend: string;
  nextCall: string;
  lastCallDuration: string;
  dialogue: DialogueStep[];
}

const PATIENTS: Record<PatientName, PatientData> = {
  "Margaret Johnson": {
    wellnessScore: "94%",
    medCompliance: "98%",
    moodTrend: "↗ Positive",
    nextCall: "4:00 PM",
    lastCallDuration: "02:34",
    dialogue: [
      { speaker: "ai", text: "Good morning Margaret. Have you taken your medication today?" },
      { speaker: "user", text: "Yes, after breakfast." },
      { speaker: "ai", text: "Great. How are you feeling this morning?" },
      { speaker: "user", text: "Feeling much better today." },
    ],
  },
  "Robert Evans": {
    wellnessScore: "88%",
    medCompliance: "92%",
    moodTrend: "→ Stable",
    nextCall: "6:30 PM",
    lastCallDuration: "01:50",
    dialogue: [
      { speaker: "ai", text: "Hello Robert. This is ElderAI checking in. How is your knee pain today?" },
      { speaker: "user", text: "It's a bit stiff, but I took the pain relief as prescribed." },
      { speaker: "ai", text: "Okay, make sure to rest it. Did you go for your short walk?" },
      { speaker: "user", text: "Yes, just down the driveway and back." },
    ],
  },
  "Arthur Pendelton": {
    wellnessScore: "76%",
    medCompliance: "85%",
    moodTrend: "↘ Muted",
    nextCall: "8:00 AM (Tomorrow)",
    lastCallDuration: "03:15",
    dialogue: [
      { speaker: "ai", text: "Good evening Arthur. Did you remember to drink enough water this afternoon?" },
      { speaker: "user", text: "Oh, I might have forgotten. I've only had one glass." },
      { speaker: "ai", text: "Let's pour a fresh glass right now. I'll wait on the line while you get it." },
      { speaker: "user", text: "Okay, I'm heading to the kitchen now." },
    ],
  },
  "Eleanor Vance": {
    wellnessScore: "96%",
    medCompliance: "100%",
    moodTrend: "↗ Excellent",
    nextCall: "12:00 PM",
    lastCallDuration: "01:20",
    dialogue: [
      { speaker: "ai", text: "Hi Eleanor! Hope you're having a great morning. Ready for your lunch reminder?" },
      { speaker: "user", text: "Hello! Yes, I just finished making a turkey sandwich." },
      { speaker: "ai", text: "Wonderful! Don't forget to take your Vitamin D with your meal." },
      { speaker: "user", text: "It's sitting right here on the table, thank you." },
    ],
  },
};

export default function ConsoleWidget() {
  const [selectedPatient, setSelectedPatient] = useState<PatientName>("Margaret Johnson");
  
  // Clean static wave pattern (low/flat indicating offline)
  const staticWave = [8, 6, 8, 7, 9, 7, 6, 8, 7, 8, 6, 7, 6, 8, 6];

  const currentData = PATIENTS[selectedPatient];

  return (
    <div className={styles.heroConsole}>
      {/* Console Card (Left) */}
      <div className={styles.consoleCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>
            AI Voice Agent • Live Call
          </span>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.3)" }}>
            ○ Offline
          </span>
        </div>

        {/* Patient Dropdown Selector */}
        <div className={styles.widgetBar} style={{ marginBottom: "20px" }}>
          <div className={styles.agentSelectContainer}>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value as PatientName)}
              className={styles.agentSelect}
            >
              {Object.keys(PATIENTS).map((name) => (
                <option key={name} className={styles.agentSelectOption} value={name}>
                  Monitor Target: {name}
                </option>
              ))}
            </select>
            <svg className={styles.selectChevron} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Call Summary / Status Details */}
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
          Last Call: {currentData.lastCallDuration} • Next Call Scheduled: {currentData.nextCall}
        </div>

        {/* Flat Static Waveform */}
        <div className={styles.waveform}>
          {staticWave.map((h, i) => (
            <span
              key={i}
              style={{
                height: `${h * 2}%`,
                opacity: 0.15,
                transition: "height 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Last Call Transcript */}
        <div className={styles.transcript}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
            Last Call Transcript
          </div>
          <div style={{ maxHeight: "140px", overflowY: "auto" }}>
            {currentData.dialogue.map((msg, index) => (
              <div key={index} style={{ marginBottom: "8px", fontSize: "14px" }}>
                {msg.speaker === "ai" && (
                  <span style={{ color: "#a78bfa", fontWeight: 700, marginRight: "6px" }}>AI:</span>
                )}
                {msg.speaker === "user" && (
                  <span style={{ color: "#22d3ee", fontWeight: 700, marginRight: "6px" }}>User:</span>
                )}
                <span style={{ color: "#cbd5e1" }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Card (Right) */}
      <div className={styles.metricsCard}>
        <div className={styles.metric}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
            Wellness Score
          </div>
          <h3 style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff" }}>
            {currentData.wellnessScore}
          </h3>
        </div>
        <div className={styles.metric}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
            Medication Compliance
          </div>
          <h3 style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff" }}>
            {currentData.medCompliance}
          </h3>
        </div>
        <div className={styles.metric}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
            Mood Trend
          </div>
          <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#22d3ee" }}>
            {currentData.moodTrend}
          </h3>
        </div>
        <div className={styles.metric}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
            Next Scheduled Call
          </div>
          <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff" }}>
            {currentData.nextCall}
          </h3>
        </div>
      </div>
    </div>
  );
}
