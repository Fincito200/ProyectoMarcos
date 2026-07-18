import LegacyPage from "../components/LegacyPage";
import html from "./html/register.html.txt?raw";

export default function Register() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/register.js"]}
      title="Registro - Clínica José Pardo"
    />
  );
}
