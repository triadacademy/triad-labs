"use client";

import { FolderOpen, FileText, Download, ExternalLink, Search, BookOpen, Video, FileCode } from "lucide-react";
import AppShell from "@/components/AppShell";

const MOCK_RESOURCES = [
  {
    id: "1",
    title: "Trading Strategy Cheat Sheet",
    type: "PDF",
    category: "Trading",
    description: "Quick reference guide for 20+ trading strategies with entry/exit rules.",
    icon: FileText,
    size: "2.4 MB",
  },
  {
    id: "2",
    title: "Technical Analysis Workbook",
    type: "PDF",
    category: "Trading",
    description: "Practice exercises for chart patterns, indicators, and candlestick analysis.",
    icon: BookOpen,
    size: "5.1 MB",
  },
  {
    id: "3",
    title: "Python for Trading — Starter Code",
    type: "Code",
    category: "AI & Tech",
    description: "Jupyter notebooks with backtesting frameworks and data analysis templates.",
    icon: FileCode,
    size: "1.8 MB",
  },
  {
    id: "4",
    title: "Options Greeks Quick Reference",
    type: "PDF",
    category: "Finance",
    description: "Visual guide to Delta, Gamma, Theta, Vega with real examples.",
    icon: FileText,
    size: "1.2 MB",
  },
  {
    id: "5",
    title: "Risk Management Calculator",
    type: "Spreadsheet",
    category: "Trading",
    description: "Excel template for position sizing, stop-loss, and portfolio risk calculation.",
    icon: FileText,
    size: "340 KB",
  },
  {
    id: "6",
    title: "Market Analysis Recordings",
    type: "Video",
    category: "Trading",
    description: "Collection of past market analysis sessions with annotations.",
    icon: Video,
    size: "12 recordings",
  },
];

export default function ResourcesPage() {
  return (
    <AppShell>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0f172a", margin: "0 0 8px" }}>
              Resources
            </h1>
            <p style={{ fontSize: 14, color: "#64748B" }}>
              Downloadable materials to support your learning
            </p>
          </div>
        </div>

        {/* Search */}
        <div
          style={{
            position: "relative",
            marginBottom: 28,
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            type="text"
            placeholder="Search resources..."
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              fontSize: 14,
              outline: "none",
              background: "white",
            }}
          />
        </div>

        {/* Resources Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {MOCK_RESOURCES.map((resource) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                className="card"
                style={{
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={24} style={{ color: "#64748B" }} />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#6366f1",
                      background: "#eef2ff",
                      padding: "3px 10px",
                      borderRadius: 12,
                    }}
                  >
                    {resource.type}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: "0 0 6px" }}>
                    {resource.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                    {resource.description}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{resource.size}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "6px 12px",
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#374151",
                        cursor: "pointer",
                      }}
                    >
                      <Download size={12} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
