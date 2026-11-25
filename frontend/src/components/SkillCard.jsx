
import { Link } from "react-router-dom";

function SkillCard({ person }) {
  const { id, name, location, teachSkill, learnSkill } = person;

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <div className="user-avatar">{name.charAt(0)}</div>
        <div>
          <h3>{name}</h3>
          <p>1 skill · {location}</p>
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

      <Link
        to={`/members/${id}`}
        className="view-profile-button"
      >
        View profile
      </Link>
    </div>
  );
}

export default SkillCard;

