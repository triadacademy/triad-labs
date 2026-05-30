"use client";

import { GraduationCap, Menu } from "lucide-react";
import CourseSearch from "./CourseSearch";
import Notifications from "./Notifications";
import ProfileMenu from "./ProfileMenu";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="lms-header">
      {/* Logo */}
      <div className="header-logo-section">
        <button
          onClick={onToggleSidebar}
          className="icon-button"
          style={{ display: "none" }}
          id="mobile-menu-btn"
        >
          <Menu size={20} />
        </button>
        <a href="/dashboard" className="header-logo">
          <GraduationCap size={24} style={{ color: "var(--primary)" }} />
          <span>TRIAD LABS</span>
        </a>
      </div>

      {/* Search */}
      <CourseSearch />

      {/* Actions */}
      <div className="header-actions">
        <Notifications />
        <ProfileMenu />
      </div>
    </header>
  );
}
