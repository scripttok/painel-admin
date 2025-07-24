import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./ListAcademias.css";

const ListAcademias = () => {
  const { logout } = useContext(AuthContext);
  const [academies, setAcademies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAcademy, setSelectedAcademy] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    uniqueCode: "",
  });
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    const fetchAcademies = async () => {
      try {
        const response = await api.get("/api/academy");
        setAcademies(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar academias");
        setLoading(false);
      }
    };
    fetchAcademies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta academia?"))
      return;
    try {
      await api.delete(`/api/academy/${id}`);
      setAcademies(academies.filter((academy) => academy._id !== id));
    } catch (err) {
      setError("Erro ao excluir academia");
    }
  };

  const handleToggleBlock = async (id, isBlocked) => {
    try {
      await api.patch(`/api/academy/${id}/block`);
      setAcademies(
        academies.map((academy) =>
          academy._id === id ? { ...academy, isBlocked: !isBlocked } : academy
        )
      );
    } catch (err) {
      setError("Erro ao alterar status da academia");
    }
  };

  const openEditModal = (academy) => {
    console.log("Abrindo modal para academia:", academy);
    console.log("Estado isModalOpen:", true);
    setSelectedAcademy(academy);
    setFormData({
      name: academy.name,
      email: academy.email,
      phone: academy.phone,
      uniqueCode: academy.uniqueCode,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando edição:", formData);
    try {
      const response = await api.put(
        `/api/academy/${selectedAcademy._id}`,
        formData
      );
      console.log("Resposta da API:", response.data);
      setAcademies(
        academies.map((academy) =>
          academy._id === selectedAcademy._id
            ? { ...academy, ...formData }
            : academy
        )
      );
      setIsModalOpen(false);
      setModalError("");
    } catch (err) {
      console.error("Erro na edição:", err);
      setModalError(err.response?.data?.error || "Erro ao editar academia");
    }
  };

  const closeModal = () => {
    console.log("Fechando modal, isModalOpen:", false);
    setIsModalOpen(false);
    setModalError("");
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  console.log("Renderizando componente, isModalOpen:", isModalOpen);

  return (
    <div className="container">
      {/* Menu Lateral */}
      <div className="sidebar">
        <h2 className="sidebar-title">Painel Admin</h2>
        <nav>
          <ul>
            <li className="sidebar-item">
              <Link to="/create-academy" className="sidebar-link">
                Cadastrar Academia
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/list-academies" className="sidebar-link active">
                Listar Academias
              </Link>
            </li>
            <li>
              <button onClick={logout} className="sidebar-button">
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Conteúdo Principal */}
      <div className="main-content" style={{ marginLeft: "16rem" }}>
        <h1 className="main-title">Listar Academias</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="table-container">
          <table className="academy-table">
            <thead>
              <tr className="table-header">
                <th>Nome</th>
                <th>Código</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Alunos</th>
                <th>Assinaturas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {academies.map((academy) => (
                <tr key={academy._id} className="table-row">
                  <td>{academy.name}</td>
                  <td>{academy.uniqueCode}</td>
                  <td>{academy.email}</td>
                  <td>{academy.phone}</td>
                  <td>{academy.studentCount}</td>
                  <td>{academy.paidSubscriptions}</td>
                  <td>{academy.isBlocked ? "Bloqueado" : "Ativo"}</td>
                  <td className="action-buttons">
                    <button
                      onClick={() => openEditModal(academy)}
                      className="edit-button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(academy._id)}
                      className="delete-button"
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() =>
                        handleToggleBlock(academy._id, academy.isBlocked)
                      }
                      className={
                        academy.isBlocked ? "unblock-button" : "block-button"
                      }
                    >
                      {academy.isBlocked ? "Desbloquear" : "Bloquear"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal de Edição */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {console.log("Renderizando modal simples")}
            <h2 className="modal-title">Editar Academia</h2>
            {modalError && <p className="modal-error">{modalError}</p>}
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="uniqueCode">Código Único</label>
                <input
                  type="text"
                  id="uniqueCode"
                  name="uniqueCode"
                  value={formData.uniqueCode}
                  onChange={handleEditChange}
                  className="form-input"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-button">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="cancel-button"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListAcademias;
