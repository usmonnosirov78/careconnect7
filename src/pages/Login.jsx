import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "./Login.css";

const Login = () => {
  const { login, user, logout } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const ok = login(username.trim(), password);

    if (!ok) {
      setError("Invalid username or password");
      return;
    }

    
    const role = user?.role || username;

    if (role === "admin") navigate("/admin");
    else if (role === "provider") navigate("/provider");
    else navigate("/booking");
  };

  
  if (user) {
    return (
      <section className="login-page">
        <div className="login-card">
          <h2 className="login-title">Logged in</h2>

          <p className="login-sub">
            User: <b>{user.username}</b> • Role: <b>{user.role}</b>
          </p>

          <div className="login-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (user.role === "admin") navigate("/admin");
                else if (user.role === "provider") navigate("/provider");
                else navigate("/booking");
              }}
            >
              Go to Dashboard
            </button>

            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="label">Username</span>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn btn-primary btn-full" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;