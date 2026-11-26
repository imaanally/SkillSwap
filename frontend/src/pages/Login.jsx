import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthSidePanel from "../components/AuthSidePanel";
import { loginUser } from "../services/api";
// import bunny from '../assets/bunny.png' // export the mascot from Figma

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
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
        headline="Your skills are worth sharing."
        description="Find your people. Swap what you know. Grow together, one skill at a time."
        cardTitle="✦ A little knowledge goes a long way."
        cardText="Teach something you love. Learn something new."
        showExtras
      />

      <main className="auth-main">
        <form onSubmit={handleSubmit} className="auth-form">
          {/* <img src={bunny} alt="" className="auth-mascot" /> */}
          <h1 className="auth-title">Welcome back!</h1>
          <p className="auth-subtitle">
            Your next skill swap is just around the corner.
          </p>

          {error && <p className="form-error">{error}</p>}

          <div className="auth-fields">
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="field-input"
              />
            </div>

            <div className="auth-row">
              <label className="auth-remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="auth-link">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>

          <div className="auth-alt-box">
            New to SkillSwap?
            <br />
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </div>

          <p className="auth-legal">
            By continuing, you agree to our Terms of Service.
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
