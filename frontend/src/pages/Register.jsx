import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthSidePanel from '../components/AuthSidePanel'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', bio: '', teach: false, learn: false,
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')
    // Member two: send the registration request to the backend here, then navigate
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <AuthSidePanel
        headline="Start with a skill. Leave with a new one."
        description="Meet curious people who love sharing what they know."
        cardTitle="♡ No pressure. No price tags."
        cardText="Just people helping people grow."
      />

      <main className="auth-main">
        <form onSubmit={handleSubmit} className="auth-form-wide">
          <h1 className="auth-title-sm">Create your account</h1>
          <p className="auth-subtitle">A few details and you&apos;re ready to swap.</p>

          {error && <p className="form-error">{error}</p>}

          <div className="auth-grid">
            <div>
              <label htmlFor="name" className="field-label">Full name</label>
              <input id="name" name="name" placeholder="Your full name"
                value={formData.name} onChange={handleChange} className="field-input" />
            </div>
            <div>
              <label htmlFor="email" className="field-label">Email address</label>
              <input id="email" name="email" type="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} className="field-input" />
            </div>
            <div>
              <label htmlFor="password" className="field-label">Password</label>
              <input id="password" name="password" type="password" placeholder="Create a password"
                value={formData.password} onChange={handleChange} className="field-input" />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="field-label">Confirm password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Re-enter password"
                value={formData.confirmPassword} onChange={handleChange} className="field-input" />
            </div>
          </div>

          <p className="role-heading">What would you like to do?</p>
          <div className="role-grid">
            <button type="button" onClick={() => toggle('teach')} aria-pressed={formData.teach}
              className={`role-card role-card-teach ${formData.teach ? 'role-card-selected' : ''}`}>
              <p className="role-title">✓ Teach a skill</p>
              <p className="role-text">Share something you know.</p>
            </button>
            <button type="button" onClick={() => toggle('learn')} aria-pressed={formData.learn}
              className={`role-card role-card-learn ${formData.learn ? 'role-card-selected' : ''}`}>
              <p className="role-title">+ Learn something new</p>
              <p className="role-text">Pick up a skill from someone.</p>
            </button>
          </div>

          <div className="auth-section">
            <label htmlFor="bio" className="field-label">Your short bio (optional)</label>
            <textarea id="bio" name="bio" rows={2} placeholder="Tell the community a little about yourself..."
              value={formData.bio} onChange={handleChange} className="field-input" />
          </div>

          <button type="submit" className="btn-primary btn-block auth-submit">Create account</button>

          <p className="auth-link-line">
            <Link to="/login" className="auth-link">Already have an account? Log in</Link>
          </p>
          <p className="auth-legal">By joining, you agree to our community guidelines.</p>
        </form>
      </main>
    </div>
  )
}

export default Register