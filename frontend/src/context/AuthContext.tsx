import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      const token = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("token", token);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", email);
      setUser(email);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
