import LegacyPage from "../components/LegacyPage";
import html from "./html/consejos-de-salud.html.txt?raw";

export default function ConsejosDeSalud() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/login.js", "/Clinica/js/medicos.js", "/Clinica/js/modal.js", "/Clinica/js/notificaciones.js"]}
      title="Consejos de Salud — Clínica José Pardo"
    />
  );
}
