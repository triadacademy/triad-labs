"use client";

import { BookOpen, Clock, Play, CheckCircle, Award } from "lucide-react";
import AppShell from "@/components/AppShell";

const MOCK_ENROLLED = [
  {
    id: "1",
    title: "Advanced Trading Strategies",
    category: "Trading",
    instructor: "Rajesh Kumar",
    progress: 23,
    totalLessons: 13,
    completedLessons: 3,
    lastAccessed: "2 hours ago",
    certificate: false,
  },
  {
    id: "2",
    title: "Technical Analysis Masterclass",
    category: "Trading",
    instructor: "Priya Sharma",
    progress: 65,
    totalLessons: 10,
    completedLessons: 6,
    lastAccessed: "Yesterday",
    certificate: false,
  },
  {
    id: "3",
    title: "Introduction to F&O",
    category: "Finance",
    instructor: "Vikram Mehta",
    progress: 100,
    totalLessons: 8,
    completedLessons: 8,
    lastAccessed: "3 days ago",
    certificate: true,
  },
  {
    id: "4",
    title: "Prompt Engineering for Business",
    category: "AI & Tech",
    instructor: "Rohan Desai",
    progress: 45,
    totalLessons: 9,
    completedLessons: 4,
    lastAccessed: "1 week ago",
    certificate: false,
  },
];

export default function MyCoursesPage() {
  const inProgress = MOCK_ENROLLED.filter((c) => c.progress < 100);
  const completed = MOCK_ENROLLED.filter((c) => c.progress === 100);

  return (
    <AppShell>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0f172a", margin: "0 0 8px" }}>
          My Courses
        </h1>
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 32 }}>
          {inProgress.length} in progress · {completed.length} completed
        </p>

        {/* In Progress */}
        {inProgress.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>
              In Progress
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {inProgress.map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      gap: 20,
                      padding: 20,
                      alignItems: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: 120,
                        height: 80,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #ff7628, #ff9a5c)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <BookOpen size={28} style={{ color: "rgba(255,255,255,0.4)" }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--primary)",
                          background: "rgba(255,118,40,0.1)",
                          padding: "2px 8px",
                          borderRadius: 12,
                        }}
                      >
                        {course.category}
                      </span>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#0f172a",
                          margin: "6px 0 4px",
                        }}
                      >
                        {course.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                        {course.instructor} · Last accessed {course.lastAccessed}
                      </p>
                    </div>

                    {/* Progress */}
                    <div style={{ width: 160, flexShrink: 0, textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: "#64748B" }}>
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>
                          {course.progress}%
                        </span>
                      </div>
                      <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3 }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${course.progress}%`,
                            background: "var(--primary)",
                            borderRadius: 3,
                          }}
                        />
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--primary)",
                          }}
                        >
                          <Play size={14} />
                          Continue
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>
              Completed
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {completed.map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{
                      display: "flex",
                      gap: 20,
                      padding: 20,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 120,
                        height: 80,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckCircle size={28} style={{ color: "rgba(255,255,255,0.5)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>
                        {course.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                        {course.instructor} · {course.totalLessons} lessons completed
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {course.certificate && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#22c55e",
                            background: "#f0fdf4",
                            padding: "6px 14px",
                            borderRadius: 8,
                          }}
                        >
                          <Award size={16} />
                          Certificate
                        </div>
                      )}
                      <p style={{ fontSize: 12, color: "#94a3b8", margin: "6px 0 0" }}>
                        <Clock size={12} style={{ verticalAlign: "middle" }} /> {course.lastAccessed}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {MOCK_ENROLLED.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <BookOpen size={48} style={{ color: "#d1d5db", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#374151", margin: "0 0 8px" }}>
              No courses yet
            </h3>
            <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 20 }}>
              Start learning by exploring our course catalog
            </p>
            <a href="/courses" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary">Explore Courses</button>
            </a>
          </div>
        )}
      </div>
    </AppShell>
  );
}
