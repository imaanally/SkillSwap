import {
  House,
  LayoutGrid,
  Repeat,
  CalendarDays,
  UserRound,
} from "lucide-react";

import "../styles/navbar.css";

function Navbar({
  activePage = "Marketplace",
  onNavigate,
  userName = "Imaan Ali",
  children,
}) {
  const navigationItems = [
    { label: "Home", icon: House },
    { label: "Marketplace", icon: LayoutGrid },
    { label: "My requests", icon: Repeat },
    { label: "Sessions", icon: CalendarDays },
    { label: "My profile", icon: UserRound },
  ];

  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <button
          className="sidebar-logo"
          onClick={() => onNavigate?.("Home")}
          aria-label="Go to home"
        >
          <div className="logo-icon">S</div>
          <h2>skillswap</h2>
        </button>

        <nav className="sidebar-navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`nav-item ${
                  activePage === item.label ? "active" : ""
                }`}
                onClick={() => onNavigate?.(item.label)}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="keep-growing-card">
          <h3>✦ Keep growing!</h3>

          <p>A little learning goes a long way. Keep swapping.</p>

          <button onClick={() => onNavigate?.("Marketplace")}>
            Explore skills
          </button>
        </div>
      </aside>

      <div className="main-layout">
        <header className="top-header">
          <p>Good things happen when we learn together ✨</p>

          <button
            className="user-avatar-header"
            onClick={() => onNavigate?.("My profile")}
            aria-label="Go to my profile"
          >
            {initials}
          </button>
        </header>

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

export default Navbar;
