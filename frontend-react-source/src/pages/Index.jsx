import LegacyPage from "../components/LegacyPage";
import html from "./html/index.html.txt?raw";

export default function Index() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/login.js", "/Clinica/js/medicos.js", "/Clinica/js/modal.js", "/Clinica/js/notificaciones.js"]}
      title="Clinica José Pardo"
    />
  );
}
