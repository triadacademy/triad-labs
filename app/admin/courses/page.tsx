"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Users,
  Star,
  MoreVertical,
} from "lucide-react";
import { MOCK_COURSES } from "@/lib/mock-data";

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(MOCK_COURSES.map((c) => c.category))];

  const filtered = MOCK_COURSES.filter((c) => {
    const matchesSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
            Course Management
          </h1>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
            {MOCK_COURSES.length} total courses
          </p>
        </div>
        <button
          className="btn btn-primary"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Plus size={16} />
          Add Course
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
            placeholder="Search courses..."
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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        style={{
          background: "white",
          borderRadius: 12,
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 100px 100px 100px 120px",
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
          <span>Course</span>
          <span>Category</span>
          <span>Price</span>
          <span>Students</span>
          <span>Rating</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        {filtered.map((course) => (
          <div
            key={course.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 100px 100px 100px 120px",
              padding: "16px 20px",
              borderBottom: "1px solid #f3f4f6",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>
                {course.title}
              </p>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>
                by {course.instructor}
              </p>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--primary)",
                background: "rgba(255,118,40,0.1)",
                padding: "3px 10px",
                borderRadius: 12,
                width: "fit-content",
              }}
            >
              {course.category}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
              {course.price}
            </span>
            <span style={{ fontSize: 14, color: "#374151" }}>
              {(course.students ?? 0).toLocaleString()}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={14} style={{ color: "#f59e0b" }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{course.rating ?? 0}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                title="View"
              >
                <Eye size={14} />
              </button>
              <button
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <button
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid #fecaca",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#ef4444",
                }}
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
