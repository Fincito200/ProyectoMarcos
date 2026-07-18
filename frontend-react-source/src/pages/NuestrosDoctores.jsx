import LegacyPage from "../components/LegacyPage";
import html from "./html/nuestros-doctores.html.txt?raw";

export default function NuestrosDoctores() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/modal.js", "/Clinica/js/login.js", "/Clinica/js/medicos.js", "/Clinica/js/notificaciones.js"]}
      title="Nuestros Doctores — Clínica José Pardo"
    />
  );
}
