import LegacyPage from "../components/LegacyPage";
import html from "./html/admin.html.txt?raw";

export default function Admin() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/admin.js"]}
      title="Panel Admin — Clínica José Pardo"
    />
  );
}
