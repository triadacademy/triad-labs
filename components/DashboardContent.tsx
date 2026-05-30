"use client";

import {
  BookOpen,
  CheckCircle,
  Users,
  ArrowRight,
  FolderOpen,
} from "lucide-react";

const categories = [
  { name: "Computer Science", tag: "Development", href: "/courses?category=Computer+Science" },
  { name: "Business Strategy", tag: "Business", href: "/courses?category=Business" },
  { name: "Art & Design", tag: "Design", href: "/courses?category=Arts" },
  { name: "Data Science", tag: "Data Science", href: "/courses?category=Data+Science" },
  { name: "Social Sciences", tag: "Social Sciences", href: "/courses?category=Social+Sciences" },
];

export default function DashboardContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Page Headline */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0f172a", margin: 0 }}>
          Start learning at your own pace
        </h1>
        <p style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
          Welcome to your student portal. Begin by exploring courses or joining a community.
        </p>
      </div>

      {/* Onboarding Area */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: 12,
          padding: 32,
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 32,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Steps */}
          <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Step 1 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div
                style={{
                  padding: 8,
                  background: "white",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  flexShrink: 0,
                }}
              >
                <BookOpen size={20} style={{ color: "#64748B" }} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>
                  Explore courses
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", margin: 0, lineHeight: 1.6, maxWidth: 480 }}>
                  Find academic programs and skill-based courses that match your goals.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div
                style={{
                  padding: 8,
                  background: "white",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  flexShrink: 0,
                }}
              >
                <CheckCircle size={20} style={{ color: "#64748B" }} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>
                  Track progress
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", margin: 0, lineHeight: 1.6, maxWidth: 480 }}>
                  Your dashboard will automatically update as you enroll and complete lessons.
                </p>
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              minWidth: 200,
              borderLeft: "1px solid #e2e8f0",
              paddingLeft: 32,
              marginLeft: 16,
            }}
          >
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>
                Ready to begin?
              </p>
              <p style={{ fontSize: 12, color: "#64748B", marginBottom: 16 }}>
                Browse the full catalog.
              </p>
            </div>
            <a href="/courses" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Explore courses
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Secondary Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 24, paddingTop: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#64748B" }}>Other ways to start:</span>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="/resources"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "#64748B",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FolderOpen size={16} style={{ color: "#94a3b8" }} />
            </div>
            <span>Browse resources</span>
          </a>

          <a
            href="/communities"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "#64748B",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={16} style={{ color: "#94a3b8" }} />
            </div>
            <span>Join communities</span>
          </a>
        </div>
      </div>

      {/* Content Discovery */}
      <div style={{ paddingTop: 32, borderTop: "1px solid #e2e8f0" }}>
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: 0 }}>
              Explore areas of study
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>
              Browse courses by academic discipline
            </p>
          </div>
          <a
            href="/courses"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--primary)",
              textDecoration: "none",
            }}
          >
            View all
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 24,
          }}
        >
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              style={{ textDecoration: "none" }}
            >
              <div className="card" style={{ height: "100%" }}>
                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 100,
                  }}
                >
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#0f172a",
                      transition: "color 0.15s",
                      margin: 0,
                    }}
                  >
                    {cat.name}
                  </h4>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                      {cat.tag}
                    </span>
                    <ArrowRight size={16} style={{ color: "#d4d4d4" }} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
