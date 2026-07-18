import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import ConsejosDeSalud from "./pages/ConsejosDeSalud";
import Doctor from "./pages/Doctor";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MiPerfil from "./pages/MiPerfil";
import MisCitas from "./pages/MisCitas";
import Nosotros from "./pages/Nosotros";
import NuestrosDoctores from "./pages/NuestrosDoctores";
import Register from "./pages/Register";

// Las rutas replican exactamente las URLs del sitio original
// (/Clinica/pages/*.html) para que todos los enlaces y redirecciones
// de los scripts heredados (window.location.href = "/Clinica/pages/...")
// sigan funcionando sin modificaciones.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/Clinica/pages/index.html" element={<Index />} />
        <Route path="/Clinica/pages/login.html" element={<Login />} />
        <Route path="/Clinica/pages/register.html" element={<Register />} />
        <Route path="/Clinica/pages/mis-citas.html" element={<MisCitas />} />
        <Route path="/Clinica/pages/mi-perfil.html" element={<MiPerfil />} />
        <Route path="/Clinica/pages/nosotros.html" element={<Nosotros />} />
        <Route path="/Clinica/pages/nuestros-doctores.html" element={<NuestrosDoctores />} />
        <Route path="/Clinica/pages/consejos-de-salud.html" element={<ConsejosDeSalud />} />
        <Route path="/Clinica/pages/doctor.html" element={<Doctor />} />
        <Route path="/Clinica/pages/admin.html" element={<Admin />} />
        <Route path="/Clinica/pages/admin-login.html" element={<AdminLogin />} />

        {/* Alias cortos: coinciden con los @GetMapping de PageController.java del backend */}
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/mi-perfil" element={<MiPerfil />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/nuestros-doctores" element={<NuestrosDoctores />} />
        <Route path="/consejos-de-salud" element={<ConsejosDeSalud />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
