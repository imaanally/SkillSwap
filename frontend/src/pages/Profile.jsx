import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AppShell from "../components/AppShell";
import { getInitials } from "../utils/getInitials";

function Profile() {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || "",
    availability: user?.availability || "",
    skillsOffered: user?.skillsOffered || [],
    skillsWanted: user?.skillsWanted || [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    updateUser({
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
      location: formData.location,
      availability: formData.availability,
      skillsOffered: formData.skillsOffered,
      skillsWanted: formData.skillsWanted,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || "",
      location: user?.location || "",
      availability: user?.availability || "",
      skillsOffered: user?.skillsOffered || [],
      skillsWanted: user?.skillsWanted || [],
    });

    setIsEditing(false);
  };

  return (
    <AppShell>
      <h1 className="page-title">My profile</h1>
      <p className="page-subtitle">
        A little about you helps the right people find you.
      </p>

      <section className="profile-head">
        <div className="profile-id">
          <div className="profile-avatar">{getInitials(formData.name)}</div>

          <div>
            <h2 className="profile-name">{formData.name || "Your name"}</h2>
            <p className="profile-tag">Skill explorer</p>
            <p className="profile-meta">
              {formData.location || "Location not added yet"}
            </p>
          </div>
        </div>

        {!isEditing && (
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit profile
          </button>
        )}
      </section>

      {!isEditing && (
        <section className="ui-card">
          <h2 className="ui-card-title">
            Welcome to your SkillSwap profile! 💗
          </h2>
          <p className="ui-card-text">
            Your profile is just getting started. Add a bio, location,
            availability and skills to help other members discover you and find
            great skill exchanges.
          </p>
        </section>
      )}

      {isEditing ? (
        <form onSubmit={handleSave}>
          <section className="ui-card">
            <h2 className="ui-card-title">Edit your profile</h2>
            <p className="ui-card-text">
              Update your details and let people know more about you.
            </p>

            <div className="auth-fields">
              <div>
                <label htmlFor="name" className="field-label">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  className="field-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="field-label">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="field-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="bio" className="field-label">
                  About me
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="field-input"
                  rows={4}
                  placeholder="Tell the community a little about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="location" className="field-label">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  className="field-input"
                  placeholder="e.g. Nairobi"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="availability" className="field-label">
                  Availability
                </label>
                <input
                  id="availability"
                  name="availability"
                  className="field-input"
                  placeholder="e.g. Weekends and evenings"
                  value={formData.availability}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="profile-column">
              <section>
                <label htmlFor="skillsOffered" className="field-label">
                  Skills I can teach
                </label>
                <input
                  id="skillsOffered"
                  className="field-input"
                  placeholder="e.g. Python, Canva, Excel"
                  value={formData.skillsOffered.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skillsOffered: e.target.value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                    })
                  }
                />
                <p className="ui-card-text">
                  Separate each skill with a comma.
                </p>
              </section>

              <section>
                <label htmlFor="skillsWanted" className="field-label">
                  Skills I want to learn
                </label>
                <input
                  id="skillsWanted"
                  className="field-input"
                  placeholder="e.g. Graphic design, Photography"
                  value={formData.skillsWanted.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skillsWanted: e.target.value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean),
                    })
                  }
                />
                <p className="ui-card-text">
                  Separate each skill with a comma.
                </p>
              </section>
            </div>

            <div className="auth-row">
              <button type="submit" className="btn-primary">
                Save changes
              </button>

              <button type="button" className="btn-soft" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </section>
        </form>
      ) : (
        <div className="profile-grid">
          <section className="ui-card">
            <h2 className="ui-card-title">About me</h2>
            <p className="ui-card-text">
              Your intro to the SkillSwap community.
            </p>

            <p className="info-text">
              {formData.bio ||
                "You haven't added a bio yet. Tell the community a little about yourself!"}
            </p>

            <div className="info-box">
              <p className="info-label">A little more</p>
              <p className="profile-tag">
                {formData.location || "Location not added yet"}
              </p>
              <p className="info-text">{formData.email}</p>
            </div>

            <div className="info-section">
              <p className="info-label">Available to connect</p>
              <p className="info-text">
                {formData.availability ||
                  "Add your availability so members know when they can connect with you."}
              </p>
            </div>
          </section>

          <div className="profile-column">
            <section className="ui-card">
              <h2 className="ui-card-title">Skills I can teach</h2>
              <p className="ui-card-text">Things I'm happy to share.</p>

              {formData.skillsOffered.length > 0 ? (
                formData.skillsOffered.map((skill, index) => (
                  <div key={index} className="skill-row skill-row-teach">
                    <span>{skill}</span>
                    <span className="skill-level skill-level-teach">
                      Confident
                    </span>
                  </div>
                ))
              ) : (
                <p className="ui-card-text">
                  You haven't added any teaching skills yet. Add some to help
                  people discover you.
                </p>
              )}
            </section>

            <section className="ui-card">
              <h2 className="ui-card-title">Skills I want to learn</h2>
              <p className="ui-card-text">Things I'm excited to pick up.</p>

              {formData.skillsWanted.length > 0 ? (
                formData.skillsWanted.map((skill, index) => (
                  <div key={index} className="skill-row skill-row-learn">
                    <span>{skill}</span>
                    <span className="skill-level skill-level-learn">
                      Beginner
                    </span>
                  </div>
                ))
              ) : (
                <p className="ui-card-text">
                  You haven't added any learning goals yet. Tell us what you'd
                  like to learn.
                </p>
              )}
            </section>
          </div>
        </div>
      )}
    </AppShell>
  );
}

export default Profile;
