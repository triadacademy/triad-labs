"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Award,
  BarChart3,
  ClipboardCheck,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { getCourseById } from "@/lib/mock-data";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const MOCK_COURSE = getCourseById(courseId) ?? getCourseById("1")!;
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(["m1"]));
  const [enrolled, setEnrolled] = useState(false);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalLessons = MOCK_COURSE.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = MOCK_COURSE.modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.completed).length,
    0
  );
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <AppShell>
      <div>
        {/* Back Button */}
        <a
          href="/courses"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "#64748B",
            textDecoration: "none",
            marginBottom: 24,
          }}
        >
          <ArrowLeft size={16} />
          Back to courses
        </a>

        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {/* Left: Course Info */}
          <div style={{ flex: 1, minWidth: 320 }}>
            {/* Banner */}
            <div
              style={{
                height: 220,
                borderRadius: 16,
                background: "linear-gradient(135deg, #ff7628 0%, #ff9a5c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <BookOpen size={64} style={{ color: "rgba(255,255,255,0.3)" }} />
            </div>

            <span
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--primary)",
                background: "rgba(255,118,40,0.1)",
                padding: "4px 12px",
                borderRadius: 20,
                marginBottom: 12,
              }}
            >
              {MOCK_COURSE.category}
            </span>

            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>
              {MOCK_COURSE.title}
            </h1>

            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7, marginBottom: 20 }}>
              {MOCK_COURSE.description}
            </p>

            {/* Stats Row */}
            <div
              style={{
                display: "flex",
                gap: 24,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#64748B" }}>
                <Star size={16} style={{ color: "#f59e0b" }} />
                <span style={{ fontWeight: 600, color: "#1f2937" }}>{MOCK_COURSE.rating ?? 0}</span>
                <span>rating</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#64748B" }}>
                <Users size={16} />
                <span>{(MOCK_COURSE.students ?? 0).toLocaleString()} students</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#64748B" }}>
                <Clock size={16} />
                <span>{MOCK_COURSE.duration ?? "Self-paced"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#64748B" }}>
                <BarChart3 size={16} />
                <span>{MOCK_COURSE.level ?? "All Levels"}</span>
              </div>
            </div>

            {/* Instructor */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 16,
                background: "#f8fafc",
                borderRadius: 12,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {MOCK_COURSE.instructor.charAt(0)}
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                  {MOCK_COURSE.instructor}
                </p>
                <p style={{ fontSize: 13, color: "#64748B", margin: "2px 0 0" }}>
                  {MOCK_COURSE.instructorRole ?? "Course Instructor"}
                </p>
              </div>
            </div>

            {/* What you'll learn */}
            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 24,
                marginBottom: 28,
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 16px" }}>
                What you&apos;ll learn
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  "Advanced chart patterns",
                  "Swing trading techniques",
                  "Risk management frameworks",
                  "Momentum indicators",
                  "Position sizing strategies",
                  "Trading psychology mastery",
                  "Portfolio optimization",
                  "Live market analysis",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <CheckCircle size={16} style={{ color: "#22c55e", marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Modules */}
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 16px" }}>
              Course Content
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {MOCK_COURSE.modules.map((mod) => {
                const isExpanded = expandedModules.has(mod.id);
                const completedCount = mod.lessons.filter((l) => l.completed).length;
                return (
                  <div
                    key={mod.id}
                    style={{
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                          {mod.title}
                        </p>
                        <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0" }}>
                          {completedCount}/{mod.lessons.length} lessons completed
                        </p>
                      </div>
                      {isExpanded ? <ChevronUp size={20} style={{ color: "#94a3b8" }} /> : <ChevronDown size={20} style={{ color: "#94a3b8" }} />}
                    </button>
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid #f1f5f9", padding: "8px 0" }}>
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "10px 20px",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {lesson.completed ? (
                                <CheckCircle size={16} style={{ color: "#22c55e" }} />
                              ) : (
                                <Play size={16} style={{ color: "#94a3b8" }} />
                              )}
                              <span
                                style={{
                                  fontSize: 14,
                                  color: lesson.completed ? "#64748B" : "#1f2937",
                                  textDecoration: lesson.completed ? "line-through" : "none",
                                }}
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <span style={{ fontSize: 12, color: "#94a3b8" }}>{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quizzes */}
            {MOCK_COURSE.quizzes && MOCK_COURSE.quizzes.length > 0 && (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "28px 0 16px" }}>
                  Quizzes
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {MOCK_COURSE.quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      style={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            background: "rgba(255,118,40,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ClipboardCheck size={20} style={{ color: "var(--primary)" }} />
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                            {quiz.title}
                          </p>
                          <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>
                            {quiz.questions.length} questions &middot; {quiz.timeLimit ?? 15} min &middot; {quiz.passingScore}% to pass
                          </p>
                        </div>
                      </div>
                      <a
                        href={`/courses/${courseId}/quiz/${quiz.id}`}
                        style={{
                          padding: "8px 16px",
                          background: "var(--primary)",
                          border: "none",
                          borderRadius: 8,
                          color: "white",
                          fontSize: 13,
                          fontWeight: 600,
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        Start Quiz
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: Sidebar Card */}
          <div style={{ width: 340, flexShrink: 0 }}>
            <div
              style={{
                position: "sticky",
                top: 96,
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Price area */}
              <div
                style={{
                  padding: "28px 24px",
                  background: "linear-gradient(135deg, #0f172a, #1e293b)",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 32, fontWeight: 700, color: "white", margin: "0 0 4px" }}>
                  {MOCK_COURSE.price}
                </p>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>One-time payment</p>
              </div>

              <div style={{ padding: 24 }}>
                {enrolled ? (
                  <>
                    {/* Progress */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Progress</span>
                        <span style={{ fontSize: 13, color: "#64748B" }}>{progress}%</span>
                      </div>
                      <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3 }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${progress}%`,
                            background: "var(--primary)",
                            borderRadius: 3,
                            transition: "width 0.3s",
                          }}
                        />
                      </div>
                      <p style={{ fontSize: 12, color: "#94a3b8", margin: "6px 0 0" }}>
                        {completedLessons} of {totalLessons} lessons completed
                      </p>
                    </div>
                    <a
                      href={`/courses/${courseId}/learn`}
                      className="btn btn-primary"
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                    >
                      Continue Learning
                    </a>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%", marginBottom: 12 }}
                      onClick={() => setEnrolled(true)}
                    >
                      Enroll Now
                    </button>
                    <button
                      style={{
                        width: "100%",
                        padding: "10px 20px",
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#374151",
                        cursor: "pointer",
                      }}
                    >
                      Add to Wishlist
                    </button>
                  </>
                )}

                {/* Course includes */}
                <div style={{ marginTop: 24, borderTop: "1px solid #f1f5f9", paddingTop: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 12px" }}>
                    This course includes:
                  </h4>
                  {[
                    { icon: Play, text: `${MOCK_COURSE.duration ?? "Self-paced"} of video content` },
                    { icon: BookOpen, text: `${totalLessons} lessons` },
                    { icon: Award, text: "Certificate of completion" },
                    { icon: Lock, text: "Lifetime access" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "6px 0",
                        fontSize: 13,
                        color: "#64748B",
                      }}
                    >
                      <Icon size={16} style={{ color: "#94a3b8" }} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
