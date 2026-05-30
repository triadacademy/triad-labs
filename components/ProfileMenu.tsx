"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="avatar"
        style={{ cursor: "pointer", border: "none" }}
      >
        <span>Y</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: 220,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            border: "1px solid #E2E8F0",
            zIndex: 50,
            overflow: "hidden",
          }}
        >
          {/* User Info */}
          <div style={{ padding: 16, borderBottom: "1px solid #E2E8F0" }}>
            <p style={{ fontWeight: 600, fontSize: 14, color: "#1E293B", margin: 0 }}>
              Yash Grover
            </p>
            <p style={{ fontSize: 12, color: "#64748B", margin: "4px 0 0" }}>
              gfxyashgrover@gmail.com
            </p>
          </div>

          {/* Menu Items */}
          <div style={{ padding: 8 }}>
            <a
              href="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                color: "#475569",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#F1F5F9")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <User size={18} />
              My Profile
            </a>
          </div>

          {/* Logout */}
          <div style={{ padding: 8, borderTop: "1px solid #E2E8F0" }}>
            <a
              href="/logout"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                color: "#DC2626",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#FEF2F2")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <LogOut size={18} />
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
