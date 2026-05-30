"use client";

import {
  Users,
  BookOpen,
  TrendingUp,
  IndianRupee,
  GraduationCap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { ADMIN_STATS, ADMIN_RECENT_ACTIVITY } from "@/lib/mock-data";

const statCards = [
  {
    label: "Total Students",
    value: ADMIN_STATS.totalStudents.toLocaleString(),
    change: `+${ADMIN_STATS.newStudentsThisMonth}`,
    trend: "up",
    icon: Users,
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    label: "Active Courses",
    value: ADMIN_STATS.activeCourses.toString(),
    change: "+2 this month",
    trend: "up",
    icon: BookOpen,
    color: "#22c55e",
    bg: "#f0fdf4",
  },
  {
    label: "Total Revenue",
    value: ADMIN_STATS.totalRevenue,
    change: "+12.5%",
    trend: "up",
    icon: IndianRupee,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    label: "Completions",
    value: ADMIN_STATS.courseCompletions.toLocaleString(),
    change: "+89 this week",
    trend: "up",
    icon: GraduationCap,
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
          Overview of your learning platform
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                background: "white",
                borderRadius: 12,
                padding: 24,
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    color: stat.trend === "up" ? "#22c55e" : "#ef4444",
                    background: stat.trend === "up" ? "#f0fdf4" : "#fef2f2",
                    padding: "3px 8px",
                    borderRadius: 8,
                  }}
                >
                  {stat.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </span>
              </div>
              <p style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Recent Activity */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: 0 }}>
              Recent Activity
            </h3>
            <a
              href="#"
              style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}
            >
              View all
            </a>
          </div>
          <div>
            {ADMIN_RECENT_ACTIVITY.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "14px 24px",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: "0 0 2px" }}>
                    {item.action}
                  </p>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{item.detail}</p>
                </div>
                <span style={{ fontSize: 11, color: "#94a3b8", flexShrink: 0 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: 0 }}>
              Top Courses
            </h3>
            <a
              href="/admin/courses"
              style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}
            >
              Manage
            </a>
          </div>
          <div>
            {[
              { name: "Candlestick Pattern Recognition", students: 2103, rating: 4.4 },
              { name: "Advanced Trading Strategies", students: 1247, rating: 4.8 },
              { name: "F&O Trading Fundamentals", students: 1034, rating: 4.5 },
              { name: "Technical Analysis Masterclass", students: 892, rating: 4.6 },
              { name: "Multibagger Stock Selection", students: 789, rating: 4.3 },
            ].map((course, i) => (
              <div
                key={course.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 24px",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: i === 0 ? "rgba(255,118,40,0.1)" : "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: i === 0 ? "var(--primary)" : "#64748b",
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                    {course.name}
                  </p>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>
                    {course.students.toLocaleString()} students
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={14} style={{ color: "#f59e0b" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
