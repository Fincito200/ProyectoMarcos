# Integración React + Spring Boot

Este proyecto ahora sirve el frontend como una SPA de **React + Vite**
directamente desde el backend de **Spring Boot**, en un solo proyecto
desplegable.

## Estructura

```
ProyectoMarcos-integrado/
├── src/main/java/com/utp/ProyectoMarcos/   <- backend Spring Boot (SIN CAMBIOS,
│                                               salvo PageController y SecurityConfig)
├── src/main/resources/static/               <- build de React (index.html + assets/)
│   ├── index.html                           <- shell de la SPA
│   ├── assets/                              <- JS de React compilado (Vite)
│   └── Clinica/{css,js,img}                 <- assets originales (mismas rutas de siempre)
├── frontend-react-source/                   <- código FUENTE de React (para seguir
│                                               desarrollando el frontend)
└── pom.xml
```

## Qué se modificó en el backend

Solo 2 archivos, para que Spring sirva el `index.html` de React en vez de
los `.html` estáticos individuales de antes:

1. **`PageController.java`** — todas las rutas de página
   (`/`, `/login`, `/Clinica/pages/**`, etc.) ahora hacen
   `forward:/index.html`. React Router, ya en el navegador, decide qué
   componente mostrar según la URL.
2. **`SecurityConfig.java`** — se agregó `/index.html` y `/assets/**` a la
   lista de rutas públicas (`permitAll`), para que el navegador pueda
   descargar el shell de React sin autenticarse.

**Nada de la lógica de negocio, controladores REST, modelos, repos o
servicios se tocó.** Los endpoints `*.php` (implementados en Java, en
`ClinicaController` y `AdminController`) siguen funcionando exactamente
igual, porque los scripts JS del frontend (`login.js`, `medicos.js`, etc.)
siguen llamando a las mismas URLs de siempre.

## Cómo correrlo

Ya viene compilado (el build de React está en `static/`), así que basta
con levantar el backend:

```bash
./mvnw spring-boot:run
```

Y abrir `http://localhost:8080/` (o el puerto que tengas configurado en
`application.properties`).

## Si quieres editar el frontend

El código fuente de React está en `frontend-react-source/`. Después de
hacer cambios:

```bash
cd frontend-react-source
npm install
npm run build
```

Eso genera `frontend-react-source/dist/`. Copia su contenido a
`src/main/resources/static/` (reemplazando lo que había) y vuelve a
levantar el backend:

```bash
rm -rf src/main/resources/static/*
cp -r frontend-react-source/dist/* src/main/resources/static/
./mvnw spring-boot:run
```
