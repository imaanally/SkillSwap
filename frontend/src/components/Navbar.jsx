import "../styles/navbar.css";

function Navbar({
  activePage = "Marketplace",
  onNavigate,
  userName = "Imaan Ali",
  children,
}) {
  const navigationItems = [
    { label: "Home", icon: "⌂" },
    { label: "Marketplace", icon: "▦" },
    { label: "My requests", icon: "⇄" },
    { label: "Sessions", icon: "◷" },
    { label: "My profile", icon: "☺" },
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
        <div className="sidebar-logo">
          <div className="logo-icon">S</div>
          <h2>skillswap</h2>
        </div>

        <nav className="sidebar-navigation">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => onNavigate?.(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
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
          <div className="user-avatar-header">{initials}</div>
        </header>

        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}

export default Navbar;
