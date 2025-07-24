import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./CreateAcademia.css";

const CreateAcademia = () => {
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    uniqueCode: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/api/academy/register", formData);
      setSuccess("Academia cadastrada com sucesso!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        uniqueCode: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao cadastrar academia");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menu Lateral */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Painel Admin</h2>
        <nav>
          <ul>
            <a className="mb-4">
              <Link
                to="/create-academy"
                className="text-blue-300 font-semibold"
              >
                Cadastrar Academia
              </Link>
            </a>
            <li className="mb-4">
              <Link to="/list-academies" className="sidebar-link">
                Listar Academias
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="w-full text-left hover:text-blue-300"
              >
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Cadastrar Academia</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Nome da Academia
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="uniqueCode">
                Código Único
              </label>
              <input
                type="text"
                id="uniqueCode"
                name="uniqueCode"
                value={formData.uniqueCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAcademia;
