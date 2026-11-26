import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthSidePanel from "../components/AuthSidePanel";
import { useAuth } from "../context/AuthContext";
import { registerUser, loginUser } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    teach: false,
    learn: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All required fields must be completed");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        bio: formData.bio.trim() || null,
      });

      const response = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      login(response.user, response.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          <p className="auth-subtitle">
            A few details and you're ready to swap.
          </p>

          {error && <p className="form-error">{error}</p>}

          <div className="auth-grid">
            <div>
              <label htmlFor="name" className="field-label">
                Full name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="field-input"
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
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="field-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="field-label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="field-input"
              />
            </div>
          </div>

          <p className="role-heading">What would you like to do?</p>

          <div className="role-grid">
            <button
              type="button"
              onClick={() => toggle("teach")}
              aria-pressed={formData.teach}
              className={`role-card role-card-teach ${formData.teach ? "role-card-selected" : ""}`}
            >
              <p className="role-title">✓ Teach a skill</p>
              <p className="role-text">Share something you know.</p>
            </button>

            <button
              type="button"
              onClick={() => toggle("learn")}
              aria-pressed={formData.learn}
              className={`role-card role-card-learn ${formData.learn ? "role-card-selected" : ""}`}
            >
              <p className="role-title">+ Learn something new</p>
              <p className="role-text">Pick up a skill from someone.</p>
            </button>
          </div>

          <div className="auth-section">
            <label htmlFor="bio" className="field-label">
              Your short bio (optional)
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={2}
              placeholder="Tell the community a little about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="field-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary btn-block auth-submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="auth-link-line">
            <Link to="/login" className="auth-link">
              Already have an account? Log in
            </Link>
          </p>

          <p className="auth-legal">
            By joining, you agree to our community guidelines.
          </p>
        </form>
      </main>
    </div>
  );
}

export default Register;
