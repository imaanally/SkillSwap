import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/getInitials'

const links = [
  { to: '/dashboard', icon: '⌂', label: 'Home' },
  { to: '/marketplace', icon: '▦', label: 'Marketplace' },
  { to: '/requests', icon: '⇄', label: 'My requests' },
  { to: '/sessions', icon: '◷', label: 'Sessions' },
  { to: '/profile', icon: '😊', label: 'My profile' },
]

function AppShell({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="shell">
      <aside className="shell-sidebar">
        <div className="side-logo">
          <span className="logo-mark">S</span>
          <span className="logo-text">skillswap</span>
        </div>

        <nav className="shell-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'shell-link shell-link-active' : 'shell-link')}
            >
              <span className="shell-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="shell-tip">
          <p className="shell-tip-title">✦ Keep growing!</p>
          <p className="shell-tip-text">A little learning goes a long way. Keep swapping.</p>
          <Link to="/marketplace" className="shell-tip-button">Explore skills</Link>
        </div>
      </aside>

      <div className="shell-body">
        <header className="shell-topbar">
          <p>Good things happen when we learn together ✨</p>
          <button
            type="button"
            className="avatar-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Account menu"
          >
            {getInitials(user?.name) || '?'}
          </button>

          {menuOpen && (
            <div className="account-menu">
              <p className="account-name">{user?.name}</p>
              <p className="account-text">Choose where to go next.</p>
              <div className="account-actions">
                <Link to="/profile" className="btn-primary" onClick={() => setMenuOpen(false)}>
                  My profile
                </Link>
                <button type="button" className="btn-soft" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            </div>
          )}
        </header>

        {children}
      </div>
    </div>
  )
}

export default AppShell