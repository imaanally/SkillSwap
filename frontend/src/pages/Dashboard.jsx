import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppShell from '../components/AppShell'

// Fake data until the backend is connected
const stats = [
  { id: 1, count: 4, label: 'Skills listed', tint: 'tint-mint' },
  { id: 2, count: 3, label: 'Requests active', tint: 'tint-peach' },
  { id: 3, count: 2, label: 'Sessions coming up', tint: 'tint-lavender' },
]
const sessions = [
  { id: 1, when: 'Today', title: 'Python basics', partner: 'Hassan' },
  { id: 2, when: 'Fri 14', title: 'Design feedback', partner: 'Amina' },
]
const people = [
  { id: 1, initials: 'AM', name: 'Amina', skill: 'Graphic design', tint: 'tint-peach' },
  { id: 2, initials: 'HK', name: 'Hassan', skill: 'Python', tint: 'tint-mint' },
  { id: 3, initials: 'MK', name: 'Mika', skill: 'Photography', tint: 'tint-sun' },
]

function Dashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0]

  return (
    <AppShell>
      <h1 className="page-title">Hey {firstName}, ready to swap something today?</h1>
      <p className="page-subtitle">Your little corner of learning is looking good.</p>

      <section className="banner">
        <p className="banner-kicker">Your learning space</p>
        <h2 className="banner-title">Curiosity looks good on you.</h2>
        <p className="banner-text">Find a skill buddy and make today a learning day.</p>
        <Link to="/marketplace" className="banner-button">Explore skills</Link>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <span className={`stat-badge ${stat.tint}`}>{stat.count}</span>
            <div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-hint">Keep your momentum!</p>
            </div>
          </div>
        ))}
      </section>

      <div className="dash-grid">
        <section className="ui-card">
          <h2 className="ui-card-title">Your next sessions</h2>
          <p className="ui-card-text">Little plans, big progress.</p>
          {sessions.map((session) => (
            <div key={session.id} className="session-row">
              <div>
                <p className="session-when">{session.when}</p>
                <p className="session-title">{session.title}</p>
                <p className="session-with">with {session.partner}</p>
              </div>
              <span>→</span>
            </div>
          ))}
        </section>

        <section className="ui-card">
          <h2 className="ui-card-title">People you might click with</h2>
          <p className="ui-card-text">A few friendly faces to get you started.</p>
          {people.map((person) => (
            <div key={person.id} className="person-row">
              <span className={`person-avatar ${person.tint}`}>{person.initials}</span>
              <div className="person-info">
                <p className="person-name">{person.name}</p>
                <p className="person-skill">{person.skill}</p>
              </div>
              <Link to="/marketplace" className="btn-soft">View profile</Link>
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  )
}

export default Dashboard