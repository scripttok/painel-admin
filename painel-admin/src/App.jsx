import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateAcademia from "./pages/CreateAcademia";
import ListAcademias from "./pages/ListAcademias";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-academy"
            element={
              <ProtectedRoute>
                <CreateAcademia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-academies"
            element={
              <ProtectedRoute>
                <ListAcademias />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
