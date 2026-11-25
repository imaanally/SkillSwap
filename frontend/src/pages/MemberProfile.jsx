
import { Link, useParams } from "react-router-dom";
import people from "../data/people";
import AppShell from "../components/AppShell";

function MemberProfile() {
  const { id } = useParams();

  const person = people.find((member) => member.id === Number(id));

  if (!person) {
    return (
      <AppShell>
        <div className="marketplace-page">
          <h1>Member not found</h1>
          <Link to="/marketplace">← Back to marketplace</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="marketplace-page">
        <Link to="/marketplace" className="auth-link">
          ← Back to marketplace
        </Link>

        <section className="profile-head">
          <div className="profile-id">
            <div className="profile-avatar">
              {person.name.charAt(0)}
            </div>

            <div>
              <h1 className="profile-name">{person.name}</h1>
              <p className="profile-tag">SkillSwap member</p>
              <p className="profile-meta">{person.location}</p>
            </div>
          </div>
        </section>

        <div className="profile-grid">
          <section className="ui-card">
            <h2 className="ui-card-title">About me</h2>
            <p className="info-text">{person.bio}</p>
          </section>

          <div className="profile-column">
            <section className="ui-card">
              <h2 className="ui-card-title">Skills I can teach</h2>
              <div className="skill-row skill-row-teach">
                <span>{person.teachSkill}</span>
                <span className="skill-level skill-level-teach">
                  Can teach
                </span>
              </div>
            </section>

            <section className="ui-card">
              <h2 className="ui-card-title">Skills I want to learn</h2>
              <div className="skill-row skill-row-learn">
                <span>{person.learnSkill}</span>
                <span className="skill-level skill-level-learn">
                  Wants to learn
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default MemberProfile;
