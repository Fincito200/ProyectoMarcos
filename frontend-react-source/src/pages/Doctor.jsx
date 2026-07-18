import LegacyPage from "../components/LegacyPage";
import html from "./html/doctor.html.txt?raw";

export default function Doctor() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/doctor.js"]}
      title="Panel Médico Clínica José Pardo"
    />
  );
}
