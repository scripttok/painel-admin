import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [academyCount, setAcademyCount] = useState(0);

  useEffect(() => {
    const fetchAcademyCount = async () => {
      try {
        const response = await api.get("/api/academy");
        setAcademyCount(response.data.length);
      } catch (error) {
        console.error("Erro ao buscar contagem de academias:", error);
      }
    };
    fetchAcademyCount();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menu Lateral */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Painel Admin</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink
                to="/create-academy"
                className="sidebar-link"
                activeClassName="active"
              >
                Cadastrar Academia
              </NavLink>
            </li>
            <li className="mb-4">
              <NavLink
                to="/list-academies"
                className="sidebar-link"
                activeClassName="active"
              >
                Listar Academias
              </NavLink>
            </li>
            <li>
              <button onClick={logout} className="w-full text-left">
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">
          Bem-vindo, {user?.name || "Rafael"}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Resumo</h2>
          <p className="mt-2">
            Quantidade de academias cadastradas:{" "}
            <span className="font-bold">{academyCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
