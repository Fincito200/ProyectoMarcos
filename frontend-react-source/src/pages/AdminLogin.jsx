import LegacyPage from "../components/LegacyPage";
import html from "./html/admin-login.html.txt?raw";

export default function AdminLogin() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/admin-login.js"]}
      title="Admin — Clínica José Pardo"
    />
  );
}
