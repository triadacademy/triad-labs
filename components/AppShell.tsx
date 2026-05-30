"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="lms-layout">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="lms-main">
        <Sidebar isOpen={sidebarOpen} />
        <main
          className="lms-content"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <div style={{ flex: 1 }}>{children}</div>
          <LmsFooter />
        </main>
      </div>
    </div>
  );
}

function LmsFooter() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 0",
        marginTop: 40,
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          &copy; {new Date().getFullYear()} Triad Labs. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
          Powered by{" "}
          <a
            href="https://triadacademy.io"
            style={{ color: "#3b82f6", textDecoration: "none" }}
          >
            Triad Academy
          </a>
        </p>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <a href="#" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
          Privacy Policy
        </a>
        <a href="#" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
          Terms of Service
        </a>
        <a href="#" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
          Help Center
        </a>
      </div>
    </div>
  );
}
