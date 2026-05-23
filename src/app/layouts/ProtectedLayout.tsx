import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export function ProtectedLayout() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect pending vendors to pending approval screen
  if (user?.role === "vendor" && user?.vendorStatus === "pending") {
    return <Navigate to="/pending" replace />;
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--bg-main)", color: "var(--text-primary)" }}
    >
      {/* Sidebar - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />

        <main className="flex-1 overflow-auto" style={{ background: "var(--bg-main)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
