import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "vendor";
export type VendorStatus = "pending" | "approved" | "rejected" | "suspended";
export type Category = "Stay" | "Tour" | "Safari" | "Experience" | "Transfer";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  vendorStatus?: VendorStatus;
  approvedCategories?: Category[];
  company?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  register: (data: VendorRegistrationData) => Promise<void>;
}

export interface VendorRegistrationData {
  businessName: string;
  vendorName: string;
  email: string;
  phone: string;
  country: string;
  businessDescription: string;
  categories: Category[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("voyage-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate login - in production this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock users for demo
    if (role === "admin" && email === "admin@voyage.com" && password === "admin") {
      const adminUser: User = {
        id: "admin_1",
        email: "admin@voyage.com",
        name: "Admin User",
        role: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("voyage-user", JSON.stringify(adminUser));
    } else if (role === "vendor") {
      // Hotel vendor: email containing "hotel" or "stay" or "jetwing"
      const isHotelVendor =
        email.toLowerCase().includes("hotel") ||
        email.toLowerCase().includes("stay") ||
        email.toLowerCase().includes("jetwing");

      const vendorUser: User = isHotelVendor
        ? {
            id: "vendor_hotel",
            email: email,
            name: "Jetwing Yala",
            role: "vendor",
            vendorStatus: "approved",
            approvedCategories: ["Stay"],
            company: "Jetwing Hotels",
          }
        : {
            id: "vendor_1",
            email: email,
            name: "Safari Adventures LK",
            role: "vendor",
            vendorStatus: "approved",
            approvedCategories: ["Stay", "Safari", "Tour"],
            company: "Safari Adventures Lanka",
          };
      setUser(vendorUser);
      localStorage.setItem("voyage-user", JSON.stringify(vendorUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("voyage-user");
  };

  const register = async (data: VendorRegistrationData) => {
    // Simulate registration - in production this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create pending vendor user
    const newVendor: User = {
      id: `vendor_${Date.now()}`,
      email: data.email,
      name: data.vendorName,
      role: "vendor",
      vendorStatus: "pending",
      approvedCategories: [],
      company: data.businessName,
    };

    setUser(newVendor);
    localStorage.setItem("voyage-user", JSON.stringify(newVendor));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
