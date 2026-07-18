import LegacyPage from "../components/LegacyPage";
import html from "./html/mis-citas.html.txt?raw";

export default function MisCitas() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/login.js", "/Clinica/js/mis-citas.js", "/Clinica/js/notificaciones.js"]}
      title="Mis Citas - Clínica José Pardo"
    />
  );
}
