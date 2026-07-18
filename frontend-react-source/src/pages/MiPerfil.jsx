import LegacyPage from "../components/LegacyPage";
import html from "./html/mi-perfil.html.txt?raw";

export default function MiPerfil() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/login.js"]}
      title="Mi Perfil - Clínica José Pardo"
    />
  );
}
