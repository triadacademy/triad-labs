"use client";

import { useState, useRef, useEffect } from "react";
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
  UserCheck,
  BookPlus,
  SearchX,
} from "lucide-react";

interface Notification {
  id: string;
  notification_type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  action_url: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    notification_type: "enrollment",
    title: "New Enrollment",
    message: "You have been enrolled in Advanced Trading Strategies",
    is_read: false,
    created_at: new Date(Date.now() - 300000).toISOString(),
    action_url: "/my-courses",
  },
  {
    id: "2",
    notification_type: "live_class_scheduled",
    title: "Live Class Scheduled",
    message: "Technical Analysis Masterclass starts in 2 hours",
    is_read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    action_url: "/live-classes",
  },
  {
    id: "3",
    notification_type: "new_lesson",
    title: "New Lesson Available",
    message: "Candlestick Patterns: Chapter 3 is now live",
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    action_url: "/courses",
  },
  {
    id: "4",
    notification_type: "course_completion",
    title: "Course Completed!",
    message: "Congratulations! You completed Introduction to F&O",
    is_read: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    action_url: "/my-courses",
  },
  {
    id: "5",
    notification_type: "batch_added",
    title: "Added to Batch",
    message: "You have been added to the AI Trading cohort",
    is_read: true,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    action_url: "/my-courses",
  },
];

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "enrollment": GraduationCap,
  "course_completion": Award,
  "new_lesson": BookOpen,
  "new_quiz": HelpCircle,
  "batch_added": UserPlus,
  "batch_removed": UserMinus,
  "live_class_scheduled": Calendar,
  "live_class_reminder": AlarmClock,
  "new_student_enrollment": UserPlus,
  "student_completed": Award,
  "user_registered": UserCheck,
  "course_created": BookPlus,
};

const bgMap: Record<string, string> = {
  "enrollment": "#dbeafe",
  "course_completion": "#fef3c7",
  "new_lesson": "#e0e7ff",
  "new_quiz": "#fce7f3",
  "batch_added": "#e0e7ff",
  "batch_removed": "#fee2e2",
  "live_class_scheduled": "#d1fae5",
  "live_class_reminder": "#fef3c7",
};

const colorMap: Record<string, string> = {
  "enrollment": "#2563eb",
  "course_completion": "#f59e0b",
  "new_lesson": "#6366f1",
  "new_quiz": "#db2777",
  "batch_added": "#6366f1",
  "batch_removed": "#dc2626",
  "live_class_scheduled": "#059669",
  "live_class_reminder": "#f59e0b",
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

export default function Notifications() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.is_read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle() {
    if (!open) {
      setLoading(true);
      // Simulate loading
      setTimeout(() => {
        setItems(MOCK_NOTIFICATIONS);
        setLoading(false);
      }, 300);
    }
    setOpen(!open);
  }

  function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  function clearAll() {
    setItems([]);
  }

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button className="icon-button" onClick={toggle}>
        <Bell size={20} />
        {unreadCount > 0 && <span className="notification-dot" />}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <h3>Notifications</h3>
            <span style={{ fontSize: 12, color: "#94A3B8" }}>
              {items.filter((n) => !n.is_read).length} unread
            </span>
          </div>

          <div className="notification-dropdown-content">
            {loading && (
              <div style={{ padding: 20, textAlign: "center" }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    border: "2px solid #e5e7eb",
                    borderTopColor: "var(--primary)",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto",
                  }}
                />
              </div>
            )}

            {!loading &&
              items.map((n) => {
                const Icon = iconMap[n.notification_type] || Bell;
                return (
                  <a
                    key={n.id}
                    href={n.action_url || "/notifications"}
                    className="notification-item"
                    style={!n.is_read ? { background: "#fef2f2" } : {}}
                    onClick={() => markRead(n.id)}
                  >
                    <div
                      className="notification-icon"
                      style={{ background: bgMap[n.notification_type] || "#f3f4f6" }}
                    >
                      <span style={{ color: colorMap[n.notification_type] || "#6b7280", display: "flex" }}>
                        <Icon size={16} />
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        className="notification-title"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {n.title}
                      </p>
                      <p
                        className="notification-message"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {n.message}
                      </p>
                      <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
                        {timeAgo(n.created_at)}
                      </p>
                    </div>
                    {!n.is_read && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          background: "var(--primary)",
                          borderRadius: "50%",
                          flexShrink: 0,
                          marginTop: 6,
                        }}
                      />
                    )}
                  </a>
                );
              })}

            {!loading && items.length === 0 && (
              <div style={{ padding: 24, textAlign: "center" }}>
                <BellOff size={24} style={{ color: "#94A3B8", margin: "0 auto 8px" }} />
                <p style={{ fontSize: 13, color: "#94A3B8" }}>No notifications yet</p>
              </div>
            )}
          </div>

          <div
            className="notification-dropdown-footer"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <a
              href="/notifications"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--primary)",
                textDecoration: "none",
              }}
            >
              View all
            </a>
            <div style={{ display: "flex", gap: 12 }}>
              {items.some((n) => !n.is_read) && (
                <button
                  onClick={markAllRead}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#64748B",
                    fontWeight: 500,
                  }}
                >
                  Mark all read
                </button>
              )}
              {items.length > 0 && (
                <button
                  onClick={clearAll}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#ef4444",
                    fontWeight: 500,
                  }}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
