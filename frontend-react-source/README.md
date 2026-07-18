# Clínica José Pardo — React + Vite

Migración del frontend estático (HTML/CSS/JS servido por Spring Boot en
`src/main/resources/static/Clinica`) a una SPA con **React 19 + Vite** y
**React Router**.

## Cómo se hizo la migración

- Cada página (`index.html`, `login.html`, `admin.html`, etc.) se convirtió
  en un componente de React dentro de `src/pages/`.
- El **markup** de cada página se conservó tal cual (mismas clases de
  Bootstrap 5, mismos `id`, mismos `onclick="..."` inline) para no romper
  nada.
- Los **scripts originales** (`login.js`, `medicos.js`, `admin.js`, etc.) se
  mantienen sin reescribir la lógica, en `public/Clinica/js/`, y se cargan
  dinámicamente al montar cada página mediante el componente
  `src/components/LegacyPage.jsx` (solo se convirtieron los `const`/`let` de
  nivel superior a `var` para que no truene al recargar el script al
  navegar entre páginas dentro de la SPA).
- Las **rutas** de React Router usan exactamente las mismas URLs que el
  sitio original (`/Clinica/pages/index.html`, `/Clinica/pages/login.html`,
  ...), así que todos los `href` y los `window.location.href = "..."` de
  los scripts siguen funcionando sin tocarlos.
- Bootstrap 5 se sigue cargando por CDN (igual que en el proyecto original).
- Imágenes y CSS quedaron en `public/Clinica/img` y `public/Clinica/css`
  con las mismas rutas absolutas (`/Clinica/img/...`, `/Clinica/css/...`).

## Nota importante sobre el backend

Los `fetch()` de los scripts originales apuntan a endpoints **PHP**
(`/ProyectoModificado/ProyectoMarcos/Clinica/api/...`), no al backend
Spring Boot del repositorio. Esto es así en el proyecto original (no lo
modifiqué). Si el backend real va a ser el de Spring Boot, hay que:

1. Crear los controladores REST equivalentes en Spring Boot, o
2. Actualizar las URLs de `fetch` en `public/Clinica/js/*.js` para que
   apunten a tu API real (puedes centralizarlas con una variable de entorno
   de Vite, `import.meta.env.VITE_API_URL`).

También se detectó que `mi-perfil.html` original nunca cargaba
`mi-perfil.js` (solo `login.js`) — se dejó igual para no cambiar el
comportamiento existente, pero probablemente sea un bug a corregir.

## Comandos

```bash
npm install
npm run dev       # desarrollo (http://localhost:5173)
npm run build     # build de producción -> carpeta dist/
npm run preview   # sirve el build de producción
```

Al abrir `http://localhost:5173/` te redirige automáticamente a
`/Clinica/pages/index.html`, que es la home.
