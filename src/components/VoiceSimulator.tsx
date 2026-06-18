"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../app/page.module.css";

type AgentType = "Appointment Scheduling" | "Customer Support" | "Real Estate Lead Gen" | "Front Desk Receptionist";

interface DialogueStep {
  speaker: "agent" | "user";
  text: string;
  delay: number; // delay before showing this step (ms)
}

const DIALOGUES: Record<AgentType, DialogueStep[]> = {
  "Appointment Scheduling": [
    { speaker: "agent", text: "Hi there! I'm Vapi's scheduling assistant. Would you like to book an appointment today?", delay: 1500 },
    { speaker: "user", text: "Yes, I'd like to book a demo call for tomorrow afternoon.", delay: 4000 },
    { speaker: "agent", text: "Sure! I have openings at 2:00 PM and 4:30 PM. Which one works best for you?", delay: 3500 },
    { speaker: "user", text: "Let's do 2:00 PM.", delay: 3000 },
    { speaker: "agent", text: "Perfect! I've booked your demo for tomorrow at 2:00 PM. A calendar invite has been sent to your email.", delay: 3500 },
  ],
  "Customer Support": [
    { speaker: "agent", text: "Hello! Thank you for calling customer support. How can I help you resolve your issue today?", delay: 1500 },
    { speaker: "user", text: "I'm having trouble logging in to my account. It says 'invalid credentials'.", delay: 4000 },
    { speaker: "agent", text: "Oh, sorry to hear that. I can send a password reset link to your registered email address. Would you like me to do that?", delay: 4000 },
    { speaker: "user", text: "Yes, please.", delay: 2500 },
    { speaker: "agent", text: "Done! Please check your email inbox. Is there anything else I can assist you with?", delay: 3500 },
  ],
  "Real Estate Lead Gen": [
    { speaker: "agent", text: "Hey! I saw you were looking at the 3-bedroom property on Oak Street. Are you looking to buy or rent?", delay: 1500 },
    { speaker: "user", text: "I'm looking to buy, and I wanted to know when the next open house is.", delay: 4000 },
    { speaker: "agent", text: "Awesome, that's a beautiful house! The next open house is this Saturday at 11:00 AM. Would you like me to register you?", delay: 4500 },
    { speaker: "user", text: "Yes, register me.", delay: 2500 },
    { speaker: "agent", text: "All set! You're registered. I'll text you the directions. Have a wonderful day!", delay: 3500 },
  ],
  "Front Desk Receptionist": [
    { speaker: "agent", text: "Welcome to Prime Dental Reception. How can I direct your call today?", delay: 1500 },
    { speaker: "user", text: "Hi, I need to reschedule my dental cleaning next Tuesday.", delay: 3500 },
    { speaker: "agent", text: "Certainly. Let me look up your appointment... Would Thursday at the same time work instead?", delay: 4000 },
    { speaker: "user", text: "Yes, that works great.", delay: 2500 },
    { speaker: "agent", text: "Great, I've updated your appointment to Thursday. See you then!", delay: 3500 },
  ],
};

export default function VoiceSimulator() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>("Appointment Scheduling");
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "connected">("idle");
  const [micGranted, setMicGranted] = useState(false);
  const [transcript, setTranscript] = useState<{ speaker: "agent" | "user" | "system"; text: string } | null>(null);
  const [waveHeights, setWaveHeights] = useState<number[]>([12, 8, 15, 10, 20, 14, 8, 12, 10, 16, 6, 12]);
  
  const timerRefs = useRef<NodeJS.Timeout[]>([]);
  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sound Wave Visualizer Simulation
  useEffect(() => {
    if (callStatus === "connected") {
      waveIntervalRef.current = setInterval(() => {
        setWaveHeights(prev =>
          prev.map(() => Math.floor(Math.random() * 24) + 6)
        );
      }, 120);
    } else {
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current);
      }
      setWaveHeights([12, 8, 15, 10, 20, 14, 8, 12, 10, 16, 6, 12]);
    }

    return () => {
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
    };
  }, [callStatus]);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      timerRefs.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleMicToggle = () => {
    setMicGranted(prev => !prev);
  };

  const endCall = () => {
    timerRefs.current.forEach(t => clearTimeout(t));
    timerRefs.current = [];
    setCallStatus("idle");
    setTranscript(null);
  };

  const startCallSimulation = () => {
    // End current call if active
    if (callStatus !== "idle") {
      endCall();
      return;
    }

    // Auto grant mic if not granted (to make it smooth for the user)
    if (!micGranted) {
      setMicGranted(true);
    }

    setCallStatus("connecting");
    setTranscript({ speaker: "system", text: "Connecting secure voice channel..." });

    // Step 1: Connect
    const connectTimer = setTimeout(() => {
      setCallStatus("connected");
      runDialogue();
    }, 1800);

    timerRefs.current.push(connectTimer);
  };

  const runDialogue = () => {
    const dialogue = DIALOGUES[selectedAgent];
    let totalDelay = 0;

    dialogue.forEach((step) => {
      totalDelay += step.delay;
      const stepTimer = setTimeout(() => {
        setTranscript({
          speaker: step.speaker,
          text: step.text,
        });
        
        // play simulated subtle soft beep/audio click sound for conversational feel (optional)
      }, totalDelay);

      timerRefs.current.push(stepTimer);
    });

    // Auto end call after all dialogue steps are complete
    const finishTimer = setTimeout(() => {
      setTranscript({ speaker: "system", text: "Call completed. Thank you!" });
      const closeTimer = setTimeout(() => {
        endCall();
      }, 2500);
      timerRefs.current.push(closeTimer);
    }, totalDelay + 4000);

    timerRefs.current.push(finishTimer);
  };

  return (
    <div className={styles.widgetContainer}>
      <div className={`${styles.widgetBar} ${callStatus === "connected" ? styles.widgetBarActive : ""}`}>
        {/* Dropdown Selector */}
        <div className={styles.agentSelectContainer}>
          <select
            value={selectedAgent}
            onChange={(e) => {
              if (callStatus === "idle") {
                setSelectedAgent(e.target.value as AgentType);
              }
            }}
            disabled={callStatus !== "idle"}
            className={styles.agentSelect}
          >
            <option className={styles.agentSelectOption} value="Appointment Scheduling">
              Appointment Scheduling
            </option>
            <option className={styles.agentSelectOption} value="Customer Support">
              Customer Support
            </option>
            <option className={styles.agentSelectOption} value="Real Estate Lead Gen">
              Real Estate Lead Gen
            </option>
            <option className={styles.agentSelectOption} value="Front Desk Receptionist">
              Front Desk Receptionist
            </option>
          </select>
          {/* Dropdown Chevron */}
          <svg className={styles.selectChevron} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className={styles.widgetDivider} />

        {/* Action Button */}
        <button
          onClick={startCallSimulation}
          className={`${styles.initiateCallBtn} ${callStatus !== "idle" ? styles.callActiveBtn : ""}`}
        >
          {callStatus === "idle" ? (
            <>
              {/* Play symbol */}
              <svg className={styles.playIcon} viewBox="0 0 24 24">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
              Initiate Call
            </>
          ) : (
            <>
              {/* Stop symbol */}
              <div className={styles.stopIcon} />
              End Call
            </>
          )}
        </button>
      </div>

      {/* Interactive Active Call Panel */}
      {callStatus !== "idle" && (
        <div className={styles.simulatorFeedback}>
          <div className={styles.feedbackHeader}>
            <div className={styles.statusIndicator}>
              <div
                className={`${styles.statusDot} ${
                  callStatus === "connecting" ? styles.statusDotConnecting : ""
                }`}
              />
              <span className={callStatus === "connecting" ? styles.statusTextConnecting : ""}>
                {callStatus === "connecting" ? "Connecting..." : "Voice Agent Active"}
              </span>
            </div>

            {/* Sound visualizer wave bars */}
            <div className={styles.visualizerWave}>
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  className={styles.waveBar}
                  style={{
                    height: `${h}px`,
                    backgroundColor: callStatus === "connecting" ? "#eab308" : "#22c55e",
                    transition: "height 0.1s ease-in-out",
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.transcriptContainer}>
            {transcript && (
              <p style={{ margin: 0 }}>
                {transcript.speaker === "agent" && (
                  <span className={styles.transcriptLabel} style={{ color: "#22c55e" }}>
                    Agent:
                  </span>
                )}
                {transcript.speaker === "user" && (
                  <span className={styles.transcriptLabel} style={{ color: "#3b82f6" }}>
                    You:
                  </span>
                )}
                {transcript.speaker === "system" && (
                  <span className={styles.transcriptLabel} style={{ color: "#a1a1aa", fontStyle: "italic" }}>
                    Status:
                  </span>
                )}
                <span style={{ color: transcript.speaker === "system" ? "#a1a1aa" : "#ffffff" }}>
                  {transcript.text}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Metadata links & permission switch */}
      <div className={styles.widgetMeta}>
        <div className={styles.metaLink}>
          English
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={styles.metaPermissions} onClick={handleMicToggle} title="Click to toggle permission simulator">
          <div className={`${styles.permissionDot} ${micGranted ? styles.permissionDotGranted : ""}`} />
          {micGranted ? "Mic permission active" : "Mic permissions needed"}
        </div>
      </div>
    </div>
  );
}
