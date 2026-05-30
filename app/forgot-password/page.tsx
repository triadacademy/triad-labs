"use client";

import { useState } from "react";
import { GraduationCap, Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f8fafc" }}>
      {/* Left: Branding */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #ff7628 0%, #ff9a5c 50%, #ffb87a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white" }}>
          <GraduationCap size={64} style={{ marginBottom: 24, opacity: 0.9 }} />
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: "0 0 12px" }}>Triad Labs</h1>
          <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 360, lineHeight: 1.6 }}>
            Don&apos;t worry, we&apos;ll help you get back into your account.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 60 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <a
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              color: "#64748B",
              textDecoration: "none",
              marginBottom: 32,
            }}
          >
            <ArrowLeft size={16} />
            Back to login
          </a>

          {!sent ? (
            <>
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>
                  Reset your password
                </h2>
                <p style={{ fontSize: 15, color: "#64748B", margin: 0, lineHeight: 1.6 }}>
                  Enter your email and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                    Email address
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      style={{ width: "100%", padding: "12px 14px 12px 42px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, outline: "none" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    height: 48,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  ) : (
                    <>Send Reset Link <ArrowRight size={16} /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <CheckCircle size={32} style={{ color: "#22c55e" }} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 12px" }}>
                Check your email
              </h2>
              <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, margin: "0 0 28px" }}>
                We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8" }}>
                Didn&apos;t receive the email?{" "}
                <button
                  onClick={() => { setSent(false); setLoading(false); }}
                  style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 600, cursor: "pointer", fontSize: 13 }}
                >
                  Try again
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
