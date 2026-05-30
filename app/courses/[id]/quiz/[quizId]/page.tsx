"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { getCourseById, getQuizById, type QuizQuestion } from "@/lib/mock-data";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const quizId = params.quizId as string;
  const course = getCourseById(courseId);
  const quiz = getQuizById(courseId, quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (quiz && started && !submitted) {
      setTimeLeft((quiz.timeLimit ?? 15) * 60);
    }
  }, [quiz, started, submitted]);

  useEffect(() => {
    if (!started || submitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && started && !submitted && quiz) {
      handleSubmit();
    }
  }, [timeLeft, started, submitted]);

  if (!course || !quiz) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 20, color: "#374151" }}>Quiz not found</h2>
          <a href={`/courses/${courseId}`} style={{ color: "var(--primary)", marginTop: 12, display: "inline-block" }}>
            Back to course
          </a>
        </div>
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQuestion = questions[currentIndex];

  const selectAnswer = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  const passed = scorePercent >= quiz.passingScore;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    setStarted(false);
  };

  // ── Start Screen ──
  if (!started) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            background: "#1e293b",
            borderRadius: 20,
            padding: "48px 40px",
            maxWidth: 500,
            width: "100%",
            textAlign: "center",
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(255,118,40,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <BookOpen size={36} style={{ color: "var(--primary)" }} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", margin: "0 0 8px" }}>
            {quiz.title}
          </h1>
          <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 32px", lineHeight: 1.6 }}>
            {quiz.description}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 32 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{questions.length}</p>
              <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>Questions</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{quiz.timeLimit ?? 15} min</p>
              <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>Time Limit</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{quiz.passingScore}%</p>
              <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>To Pass</p>
            </div>
          </div>
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
              onClick={() => setStarted(true)}
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
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Results Screen ──
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", padding: "40px 20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {/* Score Card */}
          <div
            style={{
              background: "#1e293b",
              borderRadius: 20,
              padding: "40px",
              textAlign: "center",
              border: "1px solid #334155",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: passed ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              {passed ? (
                <Award size={50} style={{ color: "#22c55e" }} />
              ) : (
                <XCircle size={50} style={{ color: "#ef4444" }} />
              )}
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#e2e8f0", margin: "0 0 8px" }}>
              {passed ? "Congratulations!" : "Keep Practicing"}
            </h2>
            <p style={{ fontSize: 15, color: "#94a3b8", margin: "0 0 24px" }}>
              {passed
                ? `You passed the ${quiz.title}!`
                : `You need ${quiz.passingScore}% to pass. Review and try again.`}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 36, fontWeight: 700, color: passed ? "#22c55e" : "#ef4444", margin: 0 }}>
                  {scorePercent}%
                </p>
                <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>Score</p>
              </div>
              <div>
                <p style={{ fontSize: 36, fontWeight: 700, color: "#e2e8f0", margin: 0 }}>
                  {correctCount}/{questions.length}
                </p>
                <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>Correct</p>
              </div>
            </div>
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
              {!passed && (
                <button
                  onClick={restartQuiz}
                  style={{
                    padding: "10px 24px",
                    background: "var(--primary)",
                    border: "none",
                    borderRadius: 10,
                    color: "white",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <RotateCcw size={16} />
                  Try Again
                </button>
              )}
            </div>
          </div>

          {/* Question Review */}
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#e2e8f0", margin: "0 0 16px" }}>
            Review Answers
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {questions.map((q, qi) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div
                  key={q.id}
                  style={{
                    background: "#1e293b",
                    borderRadius: 12,
                    padding: 24,
                    border: `1px solid ${isCorrect ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: isCorrect ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isCorrect ? (
                        <CheckCircle size={16} style={{ color: "#22c55e" }} />
                      ) : (
                        <XCircle size={16} style={{ color: "#ef4444" }} />
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", margin: 0 }}>
                        {qi + 1}. {q.question}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 40 }}>
                    {q.options.map((opt, oi) => {
                      const isUserAnswer = userAnswer === oi;
                      const isCorrectAnswer = q.correctIndex === oi;
                      return (
                        <div
                          key={oi}
                          style={{
                            padding: "10px 14px",
                            borderRadius: 8,
                            fontSize: 13,
                            color: isCorrectAnswer ? "#22c55e" : isUserAnswer ? "#ef4444" : "#94a3b8",
                            background: isCorrectAnswer
                              ? "rgba(34,197,94,0.1)"
                              : isUserAnswer
                              ? "rgba(239,68,68,0.1)"
                              : "transparent",
                            border: isCorrectAnswer
                              ? "1px solid rgba(34,197,94,0.3)"
                              : isUserAnswer
                              ? "1px solid rgba(239,68,68,0.3)"
                              : "1px solid transparent",
                          }}
                        >
                          {opt}
                          {isCorrectAnswer && " ✓"}
                          {isUserAnswer && !isCorrectAnswer && " ✗"}
                        </div>
                      );
                    })}
                  </div>
                  {q.explanation && (
                    <p style={{ fontSize: 12, color: "#64748b", margin: "12px 0 0 40px", lineHeight: 1.6 }}>
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz In Progress ──
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: "#1e293b",
          borderBottom: "1px solid #334155",
        }}
      >
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
          }}
        >
          <ArrowLeft size={16} />
          Exit Quiz
        </button>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", margin: 0 }}>
          {quiz.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Clock size={16} style={{ color: timeLeft < 60 ? "#ef4444" : "#94a3b8" }} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: timeLeft < 60 ? "#ef4444" : "#e2e8f0",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: "20px",
        }}
      >
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background:
                i === currentIndex
                  ? "var(--primary)"
                  : answers[q.id] !== undefined
                  ? "#334155"
                  : "#1e293b",
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
        <div style={{ maxWidth: 640, width: "100%" }}>
          <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 8px" }}>
            Question {currentIndex + 1} of {questions.length}
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0", margin: "0 0 28px", lineHeight: 1.4 }}>
            {currentQuestion.question}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {currentQuestion.options.map((opt, oi) => {
              const isSelected = answers[currentQuestion.id] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => selectAnswer(currentQuestion.id, oi)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 20px",
                    background: isSelected ? "rgba(255,118,40,0.1)" : "#1e293b",
                    border: isSelected ? "2px solid var(--primary)" : "2px solid #334155",
                    borderRadius: 12,
                    color: isSelected ? "#e2e8f0" : "#94a3b8",
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isSelected ? "var(--primary)" : "#334155",
                      color: isSelected ? "white" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          background: "#1e293b",
          borderTop: "1px solid #334155",
        }}
      >
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            background: currentIndex === 0 ? "transparent" : "#334155",
            border: "1px solid #334155",
            borderRadius: 8,
            color: currentIndex === 0 ? "#475569" : "#e2e8f0",
            fontSize: 13,
            fontWeight: 500,
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          }}
        >
          <ArrowLeft size={14} />
          Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            style={{
              padding: "8px 24px",
              background: Object.keys(answers).length < questions.length ? "#334155" : "var(--primary)",
              border: "none",
              borderRadius: 8,
              color: Object.keys(answers).length < questions.length ? "#475569" : "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: Object.keys(answers).length < questions.length ? "not-allowed" : "pointer",
            }}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "#334155",
              border: "none",
              borderRadius: 8,
              color: "#e2e8f0",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Next
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
