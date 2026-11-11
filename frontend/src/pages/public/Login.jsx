import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const credentials = {
        email,
        password,
      };

      const response = await loginUser(credentials);

      // Store JWT token for authenticated API requests
      sessionStorage.setItem("token", response.token);

      // Store logged-in user information
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id: response.id,
          name: response.name,
          email: response.email,
        }),
      );

      console.log("Login successful:", {
        id: response.id,
        name: response.name,
        email: response.email,
      });

      alert("Login successful!");

      // Replace Login history entry with Dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";

      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-logo">C</div>
          <span>CashCraft</span>
        </div>

        <div className="login-heading">
          <h1>Welcome back</h1>
          <p>Sign in to continue managing your finances.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="password-label-row">
              <label htmlFor="password">Password</label>
            </div>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
