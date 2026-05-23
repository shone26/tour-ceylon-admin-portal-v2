import { useState } from "react";
import { useNavigate } from "react-router";
import { Compass, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth, UserRole } from "../../contexts/AuthContext";

export function LoginScreen() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--bg-main)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: "linear-gradient(135deg, var(--accent-navy-dark), var(--accent-navy))",
              boxShadow: "0 0 24px var(--border-accent)",
            }}
          >
            <Compass size={32} className="text-white" />
          </div>
          <h1 className="text-[24px]" style={{ color: "var(--text-primary)", fontWeight: 700 }}>
            Voyage Admin
          </h1>
          <p className="text-[13px] mt-1" style={{ color: "var(--text-tertiary)" }}>
            Travel Marketplace Management Platform
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "var(--bg-panel)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Role Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setRole("admin")}
              className="flex-1 py-2.5 rounded-lg text-[13px] transition-all"
              style={
                role === "admin"
                  ? {
                      background: "var(--active-overlay)",
                      color: "var(--accent-navy-light)",
                      border: "1px solid var(--border-accent)",
                      fontWeight: 500,
                    }
                  : {
                      background: "var(--input-background)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-light)",
                    }
              }
            >
              Admin Login
            </button>
            <button
              onClick={() => setRole("vendor")}
              className="flex-1 py-2.5 rounded-lg text-[13px] transition-all"
              style={
                role === "vendor"
                  ? {
                      background: "var(--active-overlay)",
                      color: "var(--accent-navy-light)",
                      border: "1px solid var(--border-accent)",
                      fontWeight: 500,
                    }
                  : {
                      background: "var(--input-background)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-light)",
                    }
              }
            >
              Vendor Login
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="rounded-lg p-3 mb-4 flex items-center gap-2"
              style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)" }}
            >
              <AlertCircle size={16} style={{ color: "#f87171" }} />
              <span className="text-[12px]" style={{ color: "#f87171" }}>
                {error}
              </span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] mb-1.5" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-tertiary)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "admin" ? "admin@voyage.com" : "vendor@example.com"}
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg text-[13px] outline-none transition-all"
                  style={{
                    background: "var(--input-background)",
                    border: "1px solid var(--border-light)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] mb-1.5" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-tertiary)" }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={role === "admin" ? "admin" : "Enter your password"}
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg text-[13px] outline-none transition-all"
                  style={{
                    background: "var(--input-background)",
                    border: "1px solid var(--border-light)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "var(--accent-navy)" }}
                />
                <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-[12px]"
                style={{ color: "var(--accent-navy-light)" }}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-[13px] transition-all"
              style={{
                background: loading
                  ? "var(--border-medium)"
                  : "linear-gradient(135deg, var(--accent-navy-dark), var(--accent-navy))",
                color: "white",
                boxShadow: loading ? "none" : "0 0 16px var(--border-accent)",
                border: "1px solid var(--border-accent)",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Vendor Registration Link */}
          {role === "vendor" && (
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--border-light)" }}>
              <p className="text-center text-[12px]" style={{ color: "var(--text-secondary)" }}>
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="transition-all"
                  style={{ color: "var(--accent-navy-light)", fontWeight: 500 }}
                >
                  Apply as Vendor
                </button>
              </p>
            </div>
          )}

          {/* Demo Credentials */}
          <div
            className="mt-4 p-3 rounded-lg"
            style={{ background: "var(--accent-navy-subtle)", border: "1px solid var(--border-accent)" }}
          >
            <p className="text-[11px] mb-1" style={{ color: "var(--text-tertiary)", fontWeight: 600 }}>
              Demo Credentials:
            </p>
            <p className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
              {role === "admin" ? "admin@voyage.com / admin" : "Any email / any password"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
