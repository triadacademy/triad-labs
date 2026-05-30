"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { GraduationCap } from "lucide-react";

export default function LogoutPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <GraduationCap size={48} style={{ color: "var(--primary)", marginBottom: 20 }} />
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>
        Signing you out...
      </h1>
      <p style={{ fontSize: 15, color: "#64748B" }}>
        You&apos;ll be redirected to the login page.
      </p>
      <div
        style={{
          width: 24,
          height: 24,
          border: "3px solid #e5e7eb",
          borderTopColor: "var(--primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          marginTop: 24,
        }}
      />
    </div>
  );
}
