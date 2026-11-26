import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppShell from "../components/AppShell";
import { apiRequest } from "../services/api";
import "../styles/marketplace.css";

function MemberProfile() {
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMember() {
      try {
        setLoading(true);
        setError("");

        const users = await apiRequest("/api/users");
        const foundMember = users.find((user) => user.id === Number(id));

        if (!foundMember) {
          throw new Error("Member not found.");
        }

        if (!cancelled) {
          setMember(foundMember);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMember();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <AppShell>
        <div className="marketplace-page">
          <p>Loading member profile...</p>
        </div>
      </AppShell>
    );
  }

  if (error || !member) {
    return (
      <AppShell>
        <div className="marketplace-page">
          <h1>Member not found</h1>
          <p>{error || "This member could not be found."}</p>
          <Link to="/marketplace">← Back to marketplace</Link>
        </div>
      </AppShell>
    );
  }

  const teachingSkills =
    member.user_skills?.filter((item) => item.type === "teach") || [];

  const learningSkills =
    member.user_skills?.filter((item) => item.type === "learn") || [];

  return (
    <AppShell>
      <div className="marketplace-page">
        <Link to="/marketplace" className="auth-link">
          ← Back to marketplace
        </Link>

        <section className="profile-head">
          <div className="profile-id">
            <div className="profile-avatar">
              {member.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="profile-name">{member.name}</h1>
              <p className="profile-tag">SkillSwap member</p>
            </div>
          </div>
        </section>

        <div className="profile-grid">
          <section className="ui-card">
            <h2 className="ui-card-title">About me</h2>
            <p className="info-text">
              {member.bio || "This member hasn't added a bio yet."}
            </p>
          </section>

          <div className="profile-column">
            <section className="ui-card">
              <h2 className="ui-card-title">Skills I can teach</h2>

              {teachingSkills.length > 0 ? (
                teachingSkills.map((item) => (
                  <div className="skill-row skill-row-teach" key={item.id}>
                    <span>{item.skill.name}</span>
                    <span className="skill-level skill-level-teach">
                      Can teach
                    </span>
                  </div>
                ))
              ) : (
                <p className="info-text">No teaching skills added yet.</p>
              )}
            </section>

            <section className="ui-card">
              <h2 className="ui-card-title">Skills I want to learn</h2>

              {learningSkills.length > 0 ? (
                learningSkills.map((item) => (
                  <div className="skill-row skill-row-learn" key={item.id}>
                    <span>{item.skill.name}</span>
                    <span className="skill-level skill-level-learn">
                      Wants to learn
                    </span>
                  </div>
                ))
              ) : (
                <p className="info-text">No learning skills added yet.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default MemberProfile;
