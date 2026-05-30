"use client";

import { Users, MessageSquare, ArrowRight, Plus, Lock, Globe } from "lucide-react";
import AppShell from "@/components/AppShell";

const MOCK_COMMUNITIES = [
  {
    id: "1",
    name: "Trading Enthusiasts",
    description: "Discuss market trends, share trade setups, and learn from fellow traders.",
    members: 2340,
    posts: 456,
    category: "Trading",
    isPrivate: false,
    joined: true,
  },
  {
    id: "2",
    name: "F&O Strategies",
    description: "Advanced options and futures strategies for experienced traders.",
    members: 890,
    posts: 234,
    category: "Finance",
    isPrivate: true,
    joined: true,
  },
  {
    id: "3",
    name: "AI & Tech Innovators",
    description: "Explore AI, ML, and emerging technologies shaping the future.",
    members: 1560,
    posts: 312,
    category: "AI & Tech",
    isPrivate: false,
    joined: false,
  },
  {
    id: "4",
    name: "Beginner Traders Hub",
    description: "A safe space for beginners to ask questions and learn the basics.",
    members: 4200,
    posts: 890,
    category: "Trading",
    isPrivate: false,
    joined: false,
  },
  {
    id: "5",
    name: "Wealth Creation Club",
    description: "Long-term investing, portfolio building, and financial planning.",
    members: 1120,
    posts: 178,
    category: "Finance",
    isPrivate: false,
    joined: true,
  },
  {
    id: "6",
    name: "Robotics & Automation",
    description: "Industrial robotics, autonomous systems, and hardware innovation.",
    members: 670,
    posts: 98,
    category: "Innovation",
    isPrivate: false,
    joined: false,
  },
];

export default function CommunitiesPage() {
  const joined = MOCK_COMMUNITIES.filter((c) => c.joined);
  const discover = MOCK_COMMUNITIES.filter((c) => !c.joined);

  return (
    <AppShell>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "#0f172a", margin: "0 0 8px" }}>
              Communities
            </h1>
            <p style={{ fontSize: 14, color: "#64748B" }}>
              Connect, discuss, and learn with fellow students
            </p>
          </div>
          <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Plus size={16} />
            Create Community
          </button>
        </div>

        {/* My Communities */}
        {joined.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>
              My Communities
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {joined.map((community) => (
                <div
                  key={community.id}
                  className="card"
                  style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, #ff7628, #ff9a5c)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Users size={24} style={{ color: "white" }} />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--primary)",
                        background: "rgba(255,118,40,0.1)",
                        padding: "3px 10px",
                        borderRadius: 12,
                      }}
                    >
                      {community.category}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 6px" }}>
                      {community.name}
                      {community.isPrivate && <Lock size={14} style={{ color: "#94a3b8", marginLeft: 6, verticalAlign: "middle" }} />}
                    </h3>
                    <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                      {community.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#94a3b8" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Users size={14} />
                      {community.members.toLocaleString()} members
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MessageSquare size={14} />
                      {community.posts} posts
                    </div>
                  </div>

                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--primary)",
                      textDecoration: "none",
                      marginTop: "auto",
                    }}
                  >
                    Open Community <ArrowRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discover */}
        {discover.length > 0 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>
              Discover Communities
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
              {discover.map((community) => (
                <div
                  key={community.id}
                  className="card"
                  style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Globe size={24} style={{ color: "white" }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#6366f1", background: "#eef2ff", padding: "3px 10px", borderRadius: 12 }}>
                      {community.category}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 6px" }}>
                      {community.name}
                    </h3>
                    <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                      {community.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#94a3b8" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Users size={14} />
                      {community.members.toLocaleString()} members
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MessageSquare size={14} />
                      {community.posts} posts
                    </div>
                  </div>

                  <button
                    style={{
                      marginTop: "auto",
                      padding: "8px 16px",
                      background: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    Join Community
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
