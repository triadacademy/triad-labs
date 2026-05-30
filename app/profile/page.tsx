"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Award,
  Clock,
  Edit3,
  Camera,
  TrendingUp,
  Target,
  Flame,
} from "lucide-react";
import AppShell from "@/components/AppShell";

const PROFILE = {
  name: "Yash Grover",
  email: "gfxyashgrover@gmail.com",
  role: "Student",
  joined: "January 2026",
  avatar: "Y",
  bio: "Passionate about trading and technology. Currently focused on learning technical analysis and AI-based trading systems.",
};

const STATS = [
  { label: "Courses Enrolled", value: "4", icon: BookOpen, color: "#3b82f6", bg: "#dbeafe" },
  { label: "Courses Completed", value: "1", icon: Award, color: "#22c55e", bg: "#dcfce7" },
  { label: "Learning Hours", value: "47", icon: Clock, color: "#8b5cf6", bg: "#ede9fe" },
  { label: "Current Streak", value: "5 days", icon: Flame, color: "#f59e0b", bg: "#fef3c7" },
];

const ACHIEVEMENTS = [
  { name: "First Course", description: "Enrolled in your first course", earned: true },
  { name: "Fast Learner", description: "Completed 5 lessons in one day", earned: true },
  { name: "Streak Master", description: "Maintained a 7-day learning streak", earned: false },
  { name: "Course Champion", description: "Completed 5 courses", earned: false },
];

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);

  return (
    <AppShell>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Profile Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff7628, #ff9a5c)",
            borderRadius: 16,
            padding: "40px 32px 32px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, position: "relative", zIndex: 1 }}>
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "white",
                  border: "3px solid rgba(255,255,255,0.4)",
                }}
              >
                {PROFILE.avatar}
              </div>
              <button
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "white",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <Camera size={14} style={{ color: "#64748B" }} />
              </button>
            </div>

            {/* Info */}
            <div style={{ flex: 1, color: "white" }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 4px" }}>{PROFILE.name}</h1>
              <p style={{ fontSize: 14, opacity: 0.85, margin: "0 0 8px" }}>{PROFILE.email}</p>
              <div style={{ display: "flex", gap: 16, fontSize: 13, opacity: 0.8 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <User size={14} /> {PROFILE.role}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={14} /> Joined {PROFILE.joined}
                </span>
              </div>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Edit3 size={14} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="card"
                style={{ padding: 20, textAlign: "center" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Bio */}
        <div
          className="card"
          style={{ padding: 24, marginBottom: 28 }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 12px" }}>
            About
          </h3>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>
            {PROFILE.bio}
          </p>
        </div>

        {/* Achievements */}
        <div className="card" style={{ padding: 24, marginBottom: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <Target size={18} />
            Achievements
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: a.earned ? "#f0fdf4" : "#f8fafc",
                  border: `1px solid ${a.earned ? "#bbf7d0" : "#e2e8f0"}`,
                  opacity: a.earned ? 1 : 0.6,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: a.earned ? "#dcfce7" : "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award size={18} style={{ color: a.earned ? "#22c55e" : "#9ca3af" }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                    {a.name}
                  </p>
                  <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Activity */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={18} />
            Learning Activity
          </h3>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 100 }}>
            {[2, 5, 3, 7, 4, 6, 8, 3, 5, 9, 2, 6, 4, 7].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h * 10}%`,
                  background: i === 13 ? "var(--primary)" : "#e5e7eb",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#94a3b8" }}>
            <span>2 weeks ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
