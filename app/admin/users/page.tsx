"use client";

import { useState } from "react";
import { Search, Plus, Mail, Shield, MoreVertical, UserCheck, UserX } from "lucide-react";

const MOCK_USERS = [
  { id: "u1", name: "Yash Grover", email: "yash@triadlabs.com", role: "student", enrolled: 4, lastActive: "2 hours ago", status: "active" },
  { id: "u2", name: "Priya Sharma", email: "priya@example.com", role: "instructor", enrolled: 0, lastActive: "1 hour ago", status: "active" },
  { id: "u3", name: "Amit Patel", email: "amit@example.com", role: "student", enrolled: 3, lastActive: "Yesterday", status: "active" },
  { id: "u4", name: "Rajesh Kumar", email: "rajesh@example.com", role: "instructor", enrolled: 0, lastActive: "3 hours ago", status: "active" },
  { id: "u5", name: "Sneha Gupta", email: "sneha@example.com", role: "student", enrolled: 5, lastActive: "1 week ago", status: "inactive" },
  { id: "u6", name: "Vikram Mehta", email: "vikram@example.com", role: "instructor", enrolled: 0, lastActive: "Today", status: "active" },
  { id: "u7", name: "Rohan Desai", email: "rohan@example.com", role: "student", enrolled: 2, lastActive: "3 days ago", status: "active" },
  { id: "u8", name: "Kavita Rao", email: "kavita@example.com", role: "student", enrolled: 1, lastActive: "2 weeks ago", status: "inactive" },
  { id: "u9", name: "Admin User", email: "admin@triadlabs.com", role: "admin", enrolled: 0, lastActive: "Now", status: "active" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = MOCK_USERS.filter((u) => {
    const matchesSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
            User Management
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
            {MOCK_USERS.length} total users
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Search & Filter */}
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: "16px 20px",
          border: "1px solid var(--border)",
          marginBottom: 24,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 38px",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: "10px 12px",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            fontSize: 14,
            background: "white",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option>All</option>
          <option>Student</option>
          <option>Instructor</option>
          <option>Admin</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: 12, border: "1px solid var(--border)", overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 180px 80px 100px 120px 80px",
            padding: "12px 20px",
            borderBottom: "1px solid var(--border)",
            background: "#f8fafc",
            fontSize: 12,
            fontWeight: 600,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span>User</span>
          <span>Email</span>
          <span>Role</span>
          <span>Enrolled</span>
          <span>Last Active</span>
          <span>Status</span>
        </div>

        {filtered.map((user) => (
          <div
            key={user.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 180px 80px 100px 120px 80px",
              padding: "14px 20px",
              borderBottom: "1px solid #f3f4f6",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: user.role === "admin" ? "linear-gradient(135deg, #ef4444, #f87171)" : user.role === "instructor" ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "linear-gradient(135deg, #ff7628, #ff9a5c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {user.name.charAt(0)}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{user.name}</span>
            </div>
            <span style={{ fontSize: 13, color: "#64748b" }}>{user.email}</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: user.role === "admin" ? "#ef4444" : user.role === "instructor" ? "#6366f1" : "var(--primary)",
                background: user.role === "admin" ? "#fef2f2" : user.role === "instructor" ? "#eef2ff" : "rgba(255,118,40,0.1)",
                padding: "3px 10px",
                borderRadius: 12,
                width: "fit-content",
                textTransform: "capitalize",
              }}
            >
              {user.role}
            </span>
            <span style={{ fontSize: 14, color: "#374151" }}>
              {user.enrolled > 0 ? user.enrolled : "—"}
            </span>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>{user.lastActive}</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                fontWeight: 600,
                color: user.status === "active" ? "#22c55e" : "#94a3b8",
              }}
            >
              {user.status === "active" ? <UserCheck size={14} /> : <UserX size={14} />}
              {user.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
