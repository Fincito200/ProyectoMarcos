import LegacyPage from "../components/LegacyPage";
import html from "./html/nosotros.html.txt?raw";

export default function Nosotros() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/login.js", "/Clinica/js/medicos.js", "/Clinica/js/modal.js", "/Clinica/js/notificaciones.js"]}
      title="Nosotros — Clínica José Pardo"
    />
  );
}
