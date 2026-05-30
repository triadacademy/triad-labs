"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronRight, SearchX } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
}

const MOCK_COURSES: Course[] = [
  { id: "1", title: "Advanced Trading Strategies", category: "Trading", thumbnail: "" },
  { id: "2", title: "Technical Analysis Masterclass", category: "Trading", thumbnail: "" },
  { id: "3", title: "AI-Based Trading Systems", category: "AI & Tech", thumbnail: "" },
  { id: "4", title: "F&O Trading Fundamentals", category: "Finance", thumbnail: "" },
  { id: "5", title: "Candlestick Pattern Recognition", category: "Trading", thumbnail: "" },
];

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearch(value: string) {
    setQuery(value);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (value.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    setShowResults(true);

    timerRef.current = setTimeout(() => {
      const filtered = MOCK_COURSES.filter(
        (c) =>
          c.title.toLowerCase().includes(value.toLowerCase()) ||
          c.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  }

  return (
    <div className="header-search" ref={ref}>
      <div style={{ position: "relative" }}>
        <Search
          size={16}
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94A3B8",
            zIndex: 1,
          }}
        />
        <input
          type="search"
          className="header-search-input"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
        />

        {showResults && (results.length > 0 || loading || (query.length >= 2 && !loading)) && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: 8,
              background: "white",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid #e5e7eb",
              maxHeight: 400,
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            {/* Loading */}
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
                <p style={{ marginTop: 8, fontSize: 13, color: "#6b7280" }}>Searching...</p>
              </div>
            )}

            {/* Results */}
            {!loading &&
              results.map((course) => (
                <a
                  key={course.id}
                  href={`/courses/${course.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    textDecoration: "none",
                    borderBottom: "1px solid #f3f4f6",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 18,
                    }}
                  >
                    {course.title.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1f2937",
                        margin: "0 0 4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {course.title}
                    </p>
                    <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                      {course.category}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: "#94A3B8", flexShrink: 0 }} />
                </a>
              ))}

            {/* No Results */}
            {!loading && query.length >= 2 && results.length === 0 && (
              <div style={{ padding: 24, textAlign: "center" }}>
                <SearchX size={32} style={{ color: "#d1d5db", margin: "0 auto 8px" }} />
                <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
                  No courses found for &quot;{query}&quot;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
