"use client";

import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Users,
  FolderOpen,
  Shield,
} from "lucide-react";

interface NavItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
  active?: boolean;
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    ],
  },
  {
    label: "Learning",
    items: [
      { icon: Compass, label: "All Courses", href: "/courses" },
      { icon: BookOpen, label: "My Courses", href: "/my-courses" },
      { icon: FolderOpen, label: "Resources", href: "/resources" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { icon: Users, label: "Communities", href: "/communities" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: Shield, label: "Admin Panel", href: "/admin" },
    ],
  },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className={`lms-sidebar ${isOpen ? "open" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-welcome">
          <h1>Welcome, Yash!</h1>
          <p>Student</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navGroups.map((group) => (
          <div key={group.label} className="nav-group">
            <div className="nav-group-label">{group.label}</div>
            <div className="nav-items">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`nav-item ${item.active ? "active" : ""}`}
                  >
                    <div className="nav-item-content">
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
