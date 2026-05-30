"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronRight,
  Clock,
  BookOpen,
  SkipForward,
  SkipBack,
  Maximize,
  Volume2,
  Award,
  X,
} from "lucide-react";
import { getCourseById, type Lesson, type Module } from "@/lib/mock-data";

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const course = getCourseById(courseId);

  // Find the first incomplete lesson, or default to first
  const firstIncomplete = useMemo(() => {
    if (!course) return null;
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (!lesson.completed) return { moduleId: mod.id, lessonId: lesson.id };
      }
    }
    return { moduleId: course.modules[0]?.id, lessonId: course.modules[0]?.lessons[0]?.id };
  }, [course]);

  const [activeModuleId, setActiveModuleId] = useState(firstIncomplete?.moduleId ?? "");
  const [activeLessonId, setActiveLessonId] = useState(firstIncomplete?.lessonId ?? "");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => new Set(firstIncomplete ? [firstIncomplete.moduleId] : [])
  );
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    if (!course) return new Set();
    const completed = new Set<string>();
    course.modules.forEach((m) =>
      m.lessons.forEach((l) => {
        if (l.completed) completed.add(l.id);
      })
    );
    return completed;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);

  if (!course) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 20, color: "#374151" }}>Course not found</h2>
          <a href="/courses" style={{ color: "var(--primary)", marginTop: 12, display: "inline-block" }}>
            Back to courses
          </a>
        </div>
      </div>
    );
  }

  // Flatten all lessons for navigation
  const allLessons: { module: Module; lesson: Lesson }[] = [];
  course.modules.forEach((m) =>
    m.lessons.forEach((l) => allLessons.push({ module: m, lesson: l }))
  );

  const currentIndex = allLessons.findIndex(
    (item) => item.lesson.id === activeLessonId
  );
  const currentItem = allLessons[currentIndex];
  const prevItem = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextItem = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const totalLessons = allLessons.length;
  const completedCount = completedLessons.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectLesson = (moduleId: string, lessonId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    setIsPlaying(false);
  };

  const markComplete = () => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(activeLessonId);
      return next;
    });
  };

  const goToNext = () => {
    if (nextItem) {
      markComplete();
      selectLesson(nextItem.module.id, nextItem.lesson.id);
    } else {
      // Last lesson — mark complete and show celebration
      markComplete();
      setShowCompletion(true);
    }
  };

  const goToPrev = () => {
    if (prevItem) {
      selectLesson(prevItem.module.id, prevItem.lesson.id);
    }
  };

  const currentLessonCompleted = completedLessons.has(activeLessonId);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0f172a" }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          background: "#1e293b",
          borderBottom: "1px solid #334155",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => router.push(`/courses/${courseId}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "#94a3b8",
              fontSize: 14,
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: 6,
            }}
          >
            <ArrowLeft size={16} />
            Exit
          </button>
          <div style={{ width: 1, height: 20, background: "#334155" }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>
            {course.title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 160, height: 4, background: "#334155", borderRadius: 2 }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  background: "var(--primary)",
                  borderRadius: 2,
                  transition: "width 0.3s",
                }}
              />
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              {completedCount}/{totalLessons}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "1px solid #334155",
              color: "#94a3b8",
              padding: "6px 10px",
              borderRadius: 6,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            <BookOpen size={14} />
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Video / Content Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Video Player Placeholder */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              maxHeight: "calc(100vh - 200px)",
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Gradient background simulating video */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1a1a2e 100%)",
              }}
            />
            <div style={{ position: "relative", textAlign: "center" }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 32px rgba(255, 118, 40, 0.4)",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {isPlaying ? (
                  <Pause size={32} color="white" />
                ) : (
                  <Play size={32} color="white" style={{ marginLeft: 4 }} />
                )}
              </button>
              <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 16 }}>
                {currentItem?.lesson.title ?? "Select a lesson"}
              </p>
            </div>

            {/* Video Controls */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "12px 20px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2 }}>
                <div
                  style={{
                    width: isPlaying ? "35%" : "0%",
                    height: "100%",
                    background: "var(--primary)",
                    borderRadius: 2,
                    transition: "width 0.5s",
                  }}
                />
              </div>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>
                {currentItem?.lesson.duration ?? "0 min"}
              </span>
              <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                <Volume2 size={18} />
              </button>
              <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                <Maximize size={18} />
              </button>
            </div>
          </div>

          {/* Lesson Info Bar */}
          <div
            style={{
              padding: "16px 24px",
              background: "#1e293b",
              borderTop: "1px solid #334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0", margin: 0 }}>
                {currentItem?.lesson.title}
              </h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>
                {currentItem?.module.title} &middot; {currentItem?.lesson.duration}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={goToPrev}
                disabled={!prevItem}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  background: prevItem ? "#334155" : "transparent",
                  border: "1px solid #334155",
                  borderRadius: 8,
                  color: prevItem ? "#e2e8f0" : "#475569",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: prevItem ? "pointer" : "not-allowed",
                }}
              >
                <SkipBack size={14} />
                Previous
              </button>
              {!currentLessonCompleted ? (
                <button
                  onClick={markComplete}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    background: "#334155",
                    border: "1px solid #334155",
                    borderRadius: 8,
                    color: "#e2e8f0",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  <CheckCircle size={14} />
                  Mark Complete
                </button>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    borderRadius: 8,
                    color: "#22c55e",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle size={14} />
                  Completed
                </span>
              )}
              <button
                onClick={goToNext}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  background: "var(--primary)",
                  border: "none",
                  borderRadius: 8,
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {nextItem ? "Next" : "Finish"}
                <SkipForward size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Lesson List */}
        {sidebarOpen && (
          <div
            style={{
              width: 360,
              flexShrink: 0,
              background: "#1e293b",
              borderLeft: "1px solid #334155",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid #334155",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: 0 }}>
                Course Content
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
              {course.modules.map((mod) => {
                const isExpanded = expandedModules.has(mod.id);
                const modCompleted = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
                return (
                  <div key={mod.id}>
                    <button
                      onClick={() => toggleModule(mod.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      {isExpanded ? (
                        <ChevronDown size={16} style={{ color: "#64748b", flexShrink: 0 }} />
                      ) : (
                        <ChevronRight size={16} style={{ color: "#64748b", flexShrink: 0 }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#e2e8f0",
                            margin: 0,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {mod.title}
                        </p>
                        <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0" }}>
                          {modCompleted}/{mod.lessons.length} completed
                        </p>
                      </div>
                    </button>

                    {isExpanded && (
                      <div>
                        {mod.lessons.map((lesson) => {
                          const isActive = lesson.id === activeLessonId;
                          const isDone = completedLessons.has(lesson.id);
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => selectLesson(mod.id, lesson.id)}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "10px 20px 10px 46px",
                                background: isActive
                                  ? "rgba(255,118,40,0.1)"
                                  : "transparent",
                                border: "none",
                                borderLeft: isActive
                                  ? "3px solid var(--primary)"
                                  : "3px solid transparent",
                                cursor: "pointer",
                                textAlign: "left",
                                transition: "all 0.15s",
                              }}
                            >
                              {isDone ? (
                                <CheckCircle
                                  size={16}
                                  style={{ color: "#22c55e", flexShrink: 0 }}
                                />
                              ) : isActive ? (
                                <Play
                                  size={16}
                                  style={{ color: "var(--primary)", flexShrink: 0 }}
                                />
                              ) : (
                                <Circle
                                  size={16}
                                  style={{ color: "#475569", flexShrink: 0 }}
                                />
                              )}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p
                                  style={{
                                    fontSize: 13,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive
                                      ? "#e2e8f0"
                                      : isDone
                                      ? "#64748b"
                                      : "#94a3b8",
                                    margin: 0,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    textDecoration: isDone ? "line-through" : "none",
                                  }}
                                >
                                  {lesson.title}
                                </p>
                              </div>
                              <span style={{ fontSize: 11, color: "#475569", flexShrink: 0 }}>
                                {lesson.duration}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Completion Modal */}
      {showCompletion && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setShowCompletion(false)}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: 20,
              padding: "48px 40px",
              textAlign: "center",
              maxWidth: 420,
              border: "1px solid #334155",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Award size={40} style={{ color: "#22c55e" }} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", margin: "0 0 8px" }}>
              Course Completed!
            </h2>
            <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 32px", lineHeight: 1.6 }}>
              Congratulations! You&apos;ve completed all lessons in {course.title}.
              Your certificate is ready.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => router.push(`/courses/${courseId}`)}
                style={{
                  padding: "10px 24px",
                  background: "#334155",
                  border: "none",
                  borderRadius: 10,
                  color: "#e2e8f0",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Back to Course
              </button>
              <button
                onClick={() => router.push("/my-courses")}
                style={{
                  padding: "10px 24px",
                  background: "var(--primary)",
                  border: "none",
                  borderRadius: 10,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
