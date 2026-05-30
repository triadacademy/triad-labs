"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  Menu,
  LogOut,
  Bell,
  Search,
} from "lucide-react";

const adminNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: BookOpen, label: "Courses", href: "/admin/courses" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin" },
  { icon: Settings, label: "Settings", href: "/admin" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface-warm)" }}>
      {/* Admin Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? 260 : 72,
          flexShrink: 0,
          background: "white",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {sidebarOpen && (
            <Link
              href="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 16,
                color: "var(--foreground)",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #ff7628, #ff9a5c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                T
              </div>
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: 6,
              borderRadius: 6,
            }}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href && item.href !== "/admin" || (item.href === "/admin" && pathname === "/admin");
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--primary)" : "#525252",
                  background: isActive ? "rgba(255,118,40,0.08)" : "transparent",
                  marginBottom: 2,
                  transition: "all 0.15s",
                }}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Back to LMS */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)" }}>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "#64748b",
            }}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Back to LMS</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Admin Header */}
        <header
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            background: "white",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flex: 1,
              maxWidth: 400,
            }}
          >
            <Search size={16} style={{ color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search courses, users..."
              style={{
                flex: 1,
                padding: "8px 0",
                border: "none",
                fontSize: 14,
                outline: "none",
                color: "#374151",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              style={{
                position: "relative",
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: 6,
              }}
            >
              <Bell size={20} />
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  background: "var(--primary)",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            </button>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: 32 }}>{children}</main>
      </div>
    </div>
  );
}
