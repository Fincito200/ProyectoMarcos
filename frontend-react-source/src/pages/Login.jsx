import LegacyPage from "../components/LegacyPage";
import html from "./html/login.html.txt?raw";

export default function Login() {
  return (
    <LegacyPage
      html={html}
      scripts={["/Clinica/js/login.js"]}
      title="Login Clínica José Pardo"
    />
  );
}
