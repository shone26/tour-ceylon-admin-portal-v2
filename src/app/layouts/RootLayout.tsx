import { Outlet } from "react-router";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../components/common/ToastNotification";

export function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
