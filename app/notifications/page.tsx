"use client";

import { useState } from "react";
import {
  Bell,
  BellOff,
  GraduationCap,
  Award,
  BookOpen,
  HelpCircle,
  UserPlus,
  UserMinus,
  Calendar,
  AlarmClock,
  CheckCircle,
  Trash2,
  Filter,
} from "lucide-react";
import AppShell from "@/components/AppShell";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  action_url: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "enrollment",
    title: "New Enrollment",
    message: "You have been enrolled in Advanced Trading Strategies",
    is_read: false,
    created_at: new Date(Date.now() - 300000).toISOString(),
    action_url: "/my-courses",
  },
  {
    id: "2",
    type: "live_class_scheduled",
    title: "Live Class Scheduled",
    message: "Technical Analysis Masterclass starts in 2 hours",
    is_read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    action_url: "/live-classes",
  },
  {
    id: "3",
    type: "new_lesson",
    title: "New Lesson Available",
    message: "Candlestick Patterns: Chapter 3 is now live",
    is_read: false,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    action_url: "/courses/5",
  },
  {
    id: "4",
    type: "course_completion",
    title: "Course Completed!",
    message: "Congratulations! You completed Introduction to F&O",
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    action_url: "/my-courses",
  },
  {
    id: "5",
    type: "batch_added",
    title: "Added to Batch",
    message: "You have been added to the AI Trading cohort",
    is_read: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    action_url: "/my-courses",
  },
  {
    id: "6",
    type: "new_quiz",
    title: "New Quiz Available",
    message: "Test your knowledge with the Technical Analysis quiz",
    is_read: true,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    action_url: "/courses/2",
  },
  {
    id: "7",
    type: "enrollment",
    title: "Enrollment Confirmed",
    message: "Your enrollment in F&O Trading Fundamentals has been confirmed",
    is_read: true,
    created_at: new Date(Date.now() - 345600000).toISOString(),
    action_url: "/courses/4",
  },
  {
    id: "8",
    type: "course_completion",
    title: "Milestone Reached!",
    message: "You've completed 50% of Technical Analysis Masterclass",
    is_read: true,
    created_at: new Date(Date.now() - 432000000).toISOString(),
    action_url: "/courses/2",
  },
];

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  enrollment: GraduationCap,
  course_completion: Award,
  new_lesson: BookOpen,
  new_quiz: HelpCircle,
  batch_added: UserPlus,
  batch_removed: UserMinus,
  live_class_scheduled: Calendar,
  live_class_reminder: AlarmClock,
};

const bgMap: Record<string, string> = {
  enrollment: "#dbeafe",
  course_completion: "#fef3c7",
  new_lesson: "#e0e7ff",
  new_quiz: "#fce7f3",
  batch_added: "#e0e7ff",
  batch_removed: "#fee2e2",
  live_class_scheduled: "#d1fae5",
  live_class_reminder: "#fef3c7",
};

const colorMap: Record<string, string> = {
  enrollment: "#2563eb",
  course_completion: "#f59e0b",
  new_lesson: "#6366f1",
  new_quiz: "#db2777",
  batch_added: "#6366f1",
  batch_removed: "#dc2626",
  live_class_scheduled: "#059669",
  live_class_reminder: "#f59e0b",
};

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filtered = items.filter((n) => {
    if (filter === "unread") return !n.is_read;
    if (filter === "read") return n.is_read;
    return true;
  });

  const unreadCount = items.filter((n) => !n.is_read).length;

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  function clearAll() {
    setItems([]);
  }

  function deleteNotification(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <AppShell>
      <div>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0f172a", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 10 }}>
              <Bell size={24} />
              Notifications
              {unreadCount > 0 && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "white",
                    background: "var(--primary)",
                    padding: "2px 10px",
                    borderRadius: 20,
                  }}
                >
                  {unreadCount} new
                </span>
              )}
            </h1>
            <p style={{ fontSize: 14, color: "#64748B" }}>
              Stay updated with your learning activity
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                <CheckCircle size={14} />
                Mark all read
              </button>
            )}
            {items.length > 0 && (
              <button
                onClick={clearAll}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  background: "white",
                  border: "1px solid #fee2e2",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#ef4444",
                  cursor: "pointer",
                }}
              >
                <Trash2 size={14} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            background: "#f1f5f9",
            borderRadius: 10,
            marginBottom: 24,
            width: "fit-content",
          }}
        >
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                background: filter === f ? "white" : "transparent",
                color: filter === f ? "#0f172a" : "#64748B",
                boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "unread" && unreadCount > 0 && (
                <span style={{ marginLeft: 6, fontSize: 11, color: "var(--primary)" }}>
                  ({unreadCount})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filtered.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((n) => {
              const Icon = iconMap[n.type] || Bell;
              return (
                <div
                  key={n.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    padding: "16px 20px",
                    background: !n.is_read ? "#fef8f4" : "white",
                    border: `1px solid ${!n.is_read ? "rgba(255,118,40,0.15)" : "#e5e7eb"}`,
                    borderRadius: 12,
                    transition: "all 0.15s",
                    cursor: "pointer",
                  }}
                  onClick={() => markRead(n.id)}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: bgMap[n.type] || "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: colorMap[n.type] || "#6b7280", display: "flex" }}>
                      <Icon size={20} />
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: "0 0 4px" }}>
                      {n.title}
                    </p>
                    <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                      {n.message}
                    </p>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
                      {timeAgo(n.created_at)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    {!n.is_read && (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          background: "var(--primary)",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(n.id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 4,
                        color: "#94a3b8",
                        borderRadius: 6,
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <BellOff size={48} style={{ color: "#d1d5db", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#374151", margin: "0 0 8px" }}>
              No notifications
            </h3>
            <p style={{ fontSize: 14, color: "#9ca3af", margin: 0 }}>
              {filter === "all"
                ? "You're all caught up!"
                : `No ${filter} notifications`}
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
