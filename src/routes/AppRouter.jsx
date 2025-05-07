import "../index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminPanel from "../pages/admin/AdminPanel";

// Docentes Logueados
import DocentePanel from "../pages/docente/DocentePanel";
import DocenteMisCursos from "../pages/docente/DocenteMisCursos";
import MisAlumnos from "../pages/docente/MisAlumnos";

// Alumnos logueados
import PanelAlumno from "../pages/alumno/PanelAlumno";
import CursosInscritosAlumno from "../pages/alumno/CursosInscritosAlumno";
import InscripcionCurso from "../pages/alumno/InscripcionCurso";

import NotFound from "../pages/NotFound";
import PublicLayout from "../pages/public/PublicLayout";
import HomePage from "../pages/public/HomePage";
import Contacto from "../pages/public/Contacto";
import About from "../pages/public/About";

// Cursos
import CursoForm from "../pages/cursos/CursoForm";
import ListaUsuarios from "../pages/admin/ListaUsuarios";
import ListaAlumnos from "../pages/admin/ListaAlumnos";
import ListaDocentes from "../pages/admin/ListaDocentes";
import ListaCursos from "../pages/admin/ListaCursos";
import CambiarPassword from "../pages/auth/CambiarPassword";


// Admin (IMPORTANTE)
const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Layout público */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
          </Route>

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Rutas de ADMIN */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminPanel />}>
              <Route index element={<ListaUsuarios />} />
              <Route path="user/listado" element={<ListaUsuarios />} />
              <Route path="cursos" element={<ListaCursos />} />
              <Route path="cursos/nuevo" element={<CursoForm />} />
              <Route path="cursos/:id" element={<CursoForm />} />
              <Route path="alumnos" element={<ListaAlumnos />} />
              <Route path="docentes" element={<ListaDocentes />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Route>

          {/* Rutas de DOCENTE */}
          <Route element={<PrivateRoute allowedRoles={["docente"]} />}>
            <Route path="/docente" element={<DocentePanel />}>
              <Route index element={<DocenteMisCursos />} /> 
              <Route path="cambiar-password" element={<CambiarPassword />} />
              <Route path="mis-alumnos" element={<MisAlumnos />} />
            </Route>
          </Route>

          {/* Rutas de ALUMNO */}
          <Route element={<PrivateRoute allowedRoles={["alumno"]} />}>
            <Route path="/alumno" element={<PanelAlumno />}>
              <Route index element={<CursosInscritosAlumno />} />
              <Route path="mis-cursos" element={<CursosInscritosAlumno />} />
              <Route path="inscripcion" element={<InscripcionCurso />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
              {/* <Route path="perfil" element={<PerfilAlumno />} />          */}
            </Route>
          </Route>

          {/* Rutas generales de cursos para admin y docente */}
          <Route element={<PrivateRoute allowedRoles={["admin", "docente"]} />}>
            <Route path="/cursos" element={<ListaCursos />} />
            <Route path="/cursos/nuevo" element={<CursoForm />} />
            <Route path="/cursos/editar/:id" element={<CursoForm />} />

          </Route>

          {/* Página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default AppRouter;
