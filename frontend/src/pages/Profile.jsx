import { useAuth } from '../context/AuthContext'
import AppShell from '../components/AppShell'
import { getInitials } from '../utils/getInitials'

// Fake data until the backend is connected
const skillsOffered = [
  { id: 1, name: 'Canva design', level: 'Confident' },
  { id: 2, name: 'Excel basics', level: 'Confident' },
]
const skillsWanted = [
  { id: 1, name: 'Python', level: 'Beginner' },
  { id: 2, name: 'Graphic design', level: 'Beginner' },
  { id: 3, name: 'Photography', level: 'Curious' },
]

function Profile() {
  const { user } = useAuth()

  return (
    <AppShell>
      <h1 className="page-title">My profile</h1>
      <p className="page-subtitle">A little about you helps the right people find you.</p>

      <section className="profile-head">
        <div className="profile-id">
          <div className="profile-avatar">{getInitials(user?.name)}</div>
          <div>
            <h2 className="profile-name">{user?.name}</h2>
            <p className="profile-tag">Skill explorer</p>
            <p className="profile-meta">Curious learner • Nairobi • Here to teach and grow</p>
          </div>
        </div>
        <button type="button" className="btn-primary">Edit profile</button>
      </section>

      <div className="profile-grid">
        <section className="ui-card">
          <h2 className="ui-card-title">About me</h2>
          <p className="ui-card-text">Your intro to the SkillSwap community.</p>
          <p className="info-text">
            I love learning practical skills and meeting people who are generous with what they know.
            Currently exploring design, tech and creative projects.
          </p>
          <div className="info-box">
            <p className="info-label">A little more</p>
            <p className="profile-tag">Nairobi • Beginner-friendly</p>
            <p className="info-text">{user?.email}</p>
          </div>
          <div className="info-section">
            <p className="info-label">Available to connect</p>
            <p className="info-text">Weekday evenings and Saturday mornings</p>
          </div>
        </section>

        <div className="profile-column">
          <section className="ui-card">
            <h2 className="ui-card-title">Skills I can teach</h2>
            <p className="ui-card-text">Things I&apos;m happy to share.</p>
            {skillsOffered.map((skill) => (
              <div key={skill.id} className="skill-row skill-row-teach">
                <span>{skill.name}</span>
                <span className="skill-level skill-level-teach">{skill.level}</span>
              </div>
            ))}
          </section>

          <section className="ui-card">
            <h2 className="ui-card-title">Skills I want to learn</h2>
            <p className="ui-card-text">Things I&apos;m excited to pick up.</p>
            {skillsWanted.map((skill) => (
              <div key={skill.id} className="skill-row skill-row-learn">
                <span>{skill.name}</span>
                <span className="skill-level skill-level-learn">{skill.level}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </AppShell>
  )
}

export default Profile