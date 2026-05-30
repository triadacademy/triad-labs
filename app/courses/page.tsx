"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, BookOpen, GraduationCap, TrendingUp, Sparkles } from "lucide-react";
import AppShell from "@/components/AppShell";
import CourseCard from "@/components/CourseCard";

const CATEGORIES = [
  "All Categories",
  "Trading",
  "Finance",
  "AI & Tech",
  "Innovation",
  "Business",
  "Design",
  "Data Science",
];

const MOCK_COURSES = [
  {
    id: "1",
    title: "Advanced Trading Strategies",
    category: "Trading",
    instructor: "Rajesh Kumar",
    description: "Master advanced trading techniques including swing trading, momentum strategies, and risk management for consistent profits.",
    sections: 12,
    price: "₹4,999",
  },
  {
    id: "2",
    title: "Technical Analysis Masterclass",
    category: "Trading",
    instructor: "Priya Sharma",
    description: "Learn to read candlestick patterns, support/resistance, and technical indicators like a professional trader.",
    sections: 10,
    price: "₹3,499",
  },
  {
    id: "3",
    title: "AI-Based Trading Systems",
    category: "AI & Tech",
    instructor: "Dr. Amit Patel",
    description: "Build algorithmic trading systems using Python, machine learning, and real-time market data analysis.",
    sections: 15,
    price: "₹7,999",
  },
  {
    id: "4",
    title: "F&O Trading Fundamentals",
    category: "Finance",
    instructor: "Vikram Mehta",
    description: "Understand Futures & Options from scratch — Greeks, strategies, hedging, and income generation techniques.",
    sections: 8,
    price: "₹2,999",
  },
  {
    id: "5",
    title: "Candlestick Pattern Recognition",
    category: "Trading",
    instructor: "Sneha Gupta",
    description: "Identify and trade 50+ candlestick patterns with real chart examples and backtested results.",
    sections: 6,
    price: "₹1,999",
  },
  {
    id: "6",
    title: "Prompt Engineering for Business",
    category: "AI & Tech",
    instructor: "Rohan Desai",
    description: "Leverage AI tools like ChatGPT, Claude, and Midjourney to automate workflows and boost productivity.",
    sections: 9,
    price: "₹3,999",
  },
  {
    id: "7",
    title: "Multibagger Stock Selection",
    category: "Finance",
    instructor: "Arun Joshi",
    description: "Fundamental analysis framework to identify stocks with 10x potential before the market catches on.",
    sections: 11,
    price: "₹5,499",
  },
  {
    id: "8",
    title: "Autonomous Vehicle Engineering",
    category: "Innovation",
    instructor: "Dr. Kavita Rao",
    description: "From sensors to self-driving — understand the full stack of autonomous vehicle technology.",
    sections: 14,
    price: "₹9,999",
  },
  {
    id: "9",
    title: "Industrial Robotics & Automation",
    category: "Innovation",
    instructor: "Suresh Nair",
    description: "Design, program, and deploy industrial robots for manufacturing and warehouse automation.",
    sections: 13,
    price: "₹8,499",
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const filtered = MOCK_COURSES.filter((c) => {
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All Categories" || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppShell>
      <div>
        {/* Gradient Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff7628 0%, #ff9a5c 50%, #ffb87a 100%)",
            borderRadius: 16,
            padding: "40px 36px",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap size={24} style={{ color: "white" }} />
              </div>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: "white", margin: 0 }}>
                  Explore Courses
                </h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: "4px 0 0" }}>
                  Discover expert-led programs to advance your skills
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>
                <BookOpen size={16} />
                <span>{MOCK_COURSES.length} courses</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>
                <TrendingUp size={16} />
                <span>Updated weekly</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.9)", fontSize: 13 }}>
                <Sparkles size={16} />
                <span>Expert instructors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: "16px 20px",
            border: "1px solid #e5e7eb",
            marginBottom: 28,
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
              }}
            />
            <input
              type="text"
              placeholder="Search courses, instructors..."
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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SlidersHorizontal size={16} style={{ color: "#94a3b8" }} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 14,
                background: "white",
                color: "#374151",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p style={{ fontSize: 14, color: "#64748B", marginBottom: 20 }}>
          Showing {filtered.length} of {MOCK_COURSES.length} courses
        </p>

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 24,
            }}
          >
            {filtered.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <Search size={48} style={{ color: "#d1d5db", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#374151", margin: "0 0 8px" }}>
              No courses found
            </h3>
            <p style={{ fontSize: 14, color: "#9ca3af", margin: 0 }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
