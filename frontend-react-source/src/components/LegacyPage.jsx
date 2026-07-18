import { useEffect, useRef } from "react";

/**
 * LegacyPage
 * Monta el HTML original de cada página (migrado desde /Clinica/pages/*.html)
 * y carga dinámicamente los scripts originales de /Clinica/js/*.js después del
 * montaje, replicando el comportamiento del sitio estático original.
 */
export default function LegacyPage({ html, scripts = [], title }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (title) document.title = title;

    const injected = [];
    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false; // conserva el orden original de ejecución
      document.body.appendChild(script);
      injected.push(script);
    });

    return () => {
      injected.forEach((s) => s.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scripts.join(","), title]);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
