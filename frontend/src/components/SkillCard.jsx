function SkillCard({ name, teachSkill, learnSkill }) {
  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div className="user-avatar">{name.charAt(0)}</div>
        <div>
          <h3>{name}</h3>
          <p>1 skill · Nairobi</p>
        </div>
      </div>

      <div className="teach-skill">
        <span>Can teach</span>
        <h4>{teachSkill}</h4>
      </div>

      <div className="learn-skill">
        <span>Wants to learn</span>
        <p>{learnSkill}</p>
      </div>

      <button className="view-profile-button">View profile</button>
    </div>
  );
}

export default SkillCard;
