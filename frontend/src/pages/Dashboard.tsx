import { useEffect } from "react";
import api from "../services/api";

export default function DashboardPage() {
  useEffect(() => {
    api.get("me/")
      .then(res => console.log("Usuário autenticado:", res.data))
      .catch(err => console.error("Erro ao buscar usuário:", err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </div>
  );
}
