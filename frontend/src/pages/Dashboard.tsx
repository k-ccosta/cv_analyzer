import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";

interface UserData {
  id: number;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string>("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/me/");
        setUser(response.data);
      } catch (err) {
        setError("Falha ao carregar dados do usuário.");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // ou "/login"
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {user ? (
          <div>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>{error || "Carregando dados do usuário..."}</p>
        )}
      </div>
    </div>
  );
}
