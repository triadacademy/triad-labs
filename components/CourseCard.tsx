"use client";

import { BookOpen, User } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  category: string;
  instructor: string;
  description: string;
  sections: number;
  price: string;
  thumbnail?: string;
}

export default function CourseCard({
  id,
  title,
  category,
  instructor,
  description,
  sections,
  price,
}: CourseCardProps) {
  return (
    <a href={`/courses/${id}`} style={{ textDecoration: "none" }}>
      <div
        className="card"
        style={{
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 10px 25px rgba(0,0,0,0.1)";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            height: 180,
            background: "linear-gradient(135deg, #ff7628 0%, #ff9a5c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <BookOpen size={48} style={{ color: "rgba(255,255,255,0.3)" }} />
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 20,
            }}
          >
            {price}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 12,
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              color: "#1f2937",
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            {category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 20px 20px" }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#0f172a",
              margin: "0 0 8px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>

          {/* Instructor */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#e0e7ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={14} style={{ color: "#6366f1" }} />
            </div>
            <span style={{ fontSize: 13, color: "#64748B" }}>{instructor}</span>
          </div>

          <p
            style={{
              fontSize: 13,
              color: "#64748B",
              margin: "0 0 12px",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 12,
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <span style={{ fontSize: 12, color: "#94a3b8" }}>
              {sections} sections
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              View Course &rarr;
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
