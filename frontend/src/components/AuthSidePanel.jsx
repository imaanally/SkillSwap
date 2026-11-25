function AuthSidePanel({ headline, description, cardTitle, cardText, showExtras = false }) {
  return (
    <aside className="side-panel">
      <div className="side-logo">
        <span className="logo-mark">S</span>
        <span className="logo-text">skillswap</span>
      </div>

      <div>
        <p className="side-kicker">Learn • Teach • Connect</p>
        <h2 className="side-headline">{headline}</h2>
        <p className="side-text">{description}</p>

        <div className="side-note">
          <p className="side-note-title">{cardTitle}</p>
          <p className="side-note-text">{cardText}</p>
        </div>

        {showExtras && (
          <div className="side-skills">
            <div className="side-skill tint-mint">
              <p className="side-skill-name">Python</p>
              <p className="side-skill-text">I want to learn</p>
            </div>
            <div className="side-skill tint-peach">
              <p className="side-skill-name">Design</p>
              <p className="side-skill-text">I can teach</p>
            </div>
          </div>
        )}
      </div>

      <p className="side-footer">
        {showExtras && 'Skillswap • Share knowledge, grow together'}
      </p>
    </aside>
  )
}

export default AuthSidePanel