# ProyectoMarcos — Clínica José Pardo (Spring Boot + PostgreSQL)

## Descripción

Sistema web de gestión de clínica médica desarrollado en **Java 21 con Spring Boot**, migrado desde PHP. Permite a los pacientes registrarse, agendar citas y reprogramarlas; a los doctores revisar y gestionar sus citas; y a los administradores gestionar médicos, especialidades e historial de citas.

La base de datos es **PostgreSQL** y el frontend usa HTML, CSS y JavaScript puro con Bootstrap 5.

---

## Tecnologías usadas

| Capa | Tecnología |
|------|-----------|
| Backend | Java 21, Spring Boot 3, Spring Data JPA |
| Base de datos | PostgreSQL 13+ |
| Seguridad | BCryptPasswordEncoder |
| Frontend | HTML5, CSS3, JavaScript (Fetch API), Bootstrap 5.3 |
| Build | Maven (Maven Wrapper incluido) |

---

## Requisitos previos

- Java 21 o superior
- Maven 3.8 o superior (o usar `./mvnw` incluido)
- PostgreSQL 13 o superior
- La base de datos `Clinica_JosePardo` creada

---

## Configuración de la base de datos

### Paso 1 — Crear la base de datos
```sql
CREATE DATABASE "Clinica_JosePardo";
```

### Paso 2 — Ejecutar el script de tablas
En pgAdmin o psql, ejecutar:
```
src/main/resources/schema.sql
```

### Paso 3 — Verificar credenciales
Editar `src/main/resources/application.properties` si es necesario:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Clinica_JosePardo
spring.datasource.username=postgres
spring.datasource.password=rodrigo20041998
```

---

## Cómo ejecutar el proyecto

### Opción 1 — Maven Wrapper (recomendado)
```bash
cd ProyectoMarcos
./mvnw spring-boot:run
```

### Opción 2 — VS Code / IntelliJ
Abrir el proyecto y ejecutar `ProyectoMarcosApplication.java`

### Opción 3 — JAR compilado
```bash
./mvnw clean package
java -jar target/ProyectoMarcos-0.0.1-SNAPSHOT.jar
```

> **Importante:** cada vez que modifiques archivos estáticos (HTML, CSS, JS), reinicia el servidor para que Spring Boot los copie al `target/`. Alternativamente, copia manualmente el archivo modificado a la misma ruta dentro de `target/classes/static/`.

---

## Páginas disponibles

Abrir el navegador en `http://localhost:8080`

| Ruta | Descripción |
|------|-------------|
| `/` o `/index` | Página principal con formulario de citas |
| `/login` | Login de paciente y doctor |
| `/register` | Registro de nuevo paciente |
| `/mis-citas` | Panel del paciente — ver, reprogramar y cancelar citas |
| `/doctor` | Panel del doctor — ver citas del día y agregar comentarios |
| `/nuestros-doctores` | Página pública con lista de médicos |
| `/nosotros` | Página institucional |
| `/consejos-de-salud` | Artículos de salud |

**Panel de administrador:** `http://localhost:8080/Clinica/pages/admin.html`

---

## Arquitectura del backend

El proyecto sigue el patrón en capas de Spring Boot:

```
Frontend (HTML/JS)
      ↓ fetch() HTTP + JSON
Controller  →  recibe la petición y delega
      ↓
Service     →  aplica la lógica de negocio
      ↓
Repository  →  habla con la base de datos (JPA)
      ↓
PostgreSQL
```

### Capas del proyecto

- **Model** (`@Entity`) — representa cada tabla de la BD como clase Java
- **Repository** (`JpaRepository`) — Spring genera el SQL automáticamente; sin una línea de SQL manual
- **Service** (`@Service`) — lógica de negocio: validaciones, encriptación, reglas
- **Controller** (`@RestController`) — expone los endpoints HTTP y devuelve JSON
- **DTO** — objetos de transferencia de datos con validaciones (`@Valid`)
- **Exception Handler** — captura errores globalmente y devuelve respuestas JSON coherentes

---

## Endpoints API REST

### Base URL
```
/ProyectoModificado/ProyectoMarcos/Clinica/api
```

### Autenticación y Pacientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/login.php` | Login de paciente o doctor |
| POST | `/register.php` | Registro de nuevo paciente |
| POST | `/verificar_correo.php` | Verifica si un correo ya existe |
| POST | `/cambiar_password.php` | Cambia contraseña del paciente |
| GET  | `/perfil.php?correo=...` | Obtiene datos del perfil |
| POST | `/actualizar_perfil.php` | Actualiza datos del perfil |

### Citas (Paciente)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/guardar_cita.php` | Crea una nueva cita |
| GET  | `/mis_citas.php?correo=...` | Lista citas del paciente |
| POST | `/editar_cita.php` | Reprograma fecha, hora y motivo |
| POST | `/eliminar_cita.php` | Cancela una cita |

### Citas (Doctor)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET  | `/citas_doctor.php?nombre=...` | Lista citas asignadas al doctor |
| POST | `/actualizar_estado.php` | Cambia estado de una cita |
| POST | `/guardar_comentario.php` | Agrega comentario médico a una cita |

### Administración de Médicos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET  | `/listar_medicos.php` | Lista todos los médicos |
| POST | `/crear_medico.php` | Crea un nuevo médico |
| POST | `/editar_medico.php` | Edita datos de un médico |
| POST | `/eliminar_medico.php` | Elimina un médico |

### Administración de Especialidades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET  | `/listar_especialidades.php` | Lista todas las especialidades |
| POST | `/crear_especialidad.php` | Crea una nueva especialidad |
| POST | `/editar_especialidad.php` | Edita una especialidad |
| POST | `/eliminar_especialidad.php` | Elimina una especialidad |

### Historial (Admin)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET  | `/historial_citas.php` | Historial completo de citas con filtros |
| POST | `/login_admin.php` | Login del administrador |
| POST | `/cambiar_password_admin.php` | Cambia contraseña del admin |

---

## Estructura del proyecto

```
ProyectoMarcos/
├── src/main/java/com/utp/ProyectoMarcos/
│   ├── ProyectoMarcosApplication.java     ← Clase principal
│   ├── config/
│   │   └── WebConfig.java                 ← CORS y recursos estáticos
│   ├── controller/
│   │   ├── ClinicaController.java         ← Endpoints de pacientes y citas
│   │   ├── AdminController.java           ← Endpoints de administración
│   │   └── PageController.java            ← Sirve las páginas HTML
│   ├── model/
│   │   ├── Paciente.java
│   │   ├── Medico.java
│   │   ├── Cita.java
│   │   ├── Especialidad.java
│   │   └── Admin.java
│   ├── repository/
│   │   ├── PacienteRepository.java
│   │   ├── MedicoRepository.java
│   │   ├── CitaRepository.java
│   │   ├── EspecialidadRepository.java
│   │   └── AdminRepository.java
│   ├── service/
│   │   ├── ClinicaService.java            ← Lógica de pacientes y citas
│   │   └── AdminService.java              ← Lógica de administración
│   ├── dto/
│   │   ├── PacienteRequest.java
│   │   ├── CitaRequest.java
│   │   ├── MedicoRequest.java
│   │   └── EspecialidadRequest.java
│   └── exception/
│       └── ApiExceptionHandler.java       ← Manejo global de errores
│
└── src/main/resources/
    ├── application.properties             ← Configuración BD
    ├── schema.sql                         ← Script SQL de tablas
    └── static/Clinica/
        ├── pages/
        │   ├── index.html                 ← Página principal + formulario de citas
        │   ├── admin.html                 ← Panel de administración
        │   └── ...
        ├── css/                           ← Estilos
        ├── js/
        │   ├── medicos.js                 ← Carga especialidades y médicos desde la BD
        │   ├── modal.js                   ← Lógica del modal de confirmación de cita
        │   ├── mis-citas.js               ← Panel de citas del paciente
        │   ├── admin.js                   ← Panel de administración
        │   ├── doctor.js                  ← Panel del doctor
        │   ├── login.js
        │   ├── register.js
        │   ├── notificaciones.js
        │   └── mi-perfil.js
        └── img/emojis/                    ← Íconos PNG usados en la UI
```

---

## Notas importantes

**Contraseñas encriptadas con BCrypt:** tanto las contraseñas de pacientes como de médicos y admins están encriptadas con BCrypt, compatible entre PHP y Spring Boot.

**Especialidades y médicos dinámicos:** el formulario de agendar cita carga las especialidades y médicos directamente desde la base de datos. Cualquier médico o especialidad agregada desde el panel de admin aparece automáticamente en el formulario sin necesidad de tocar el código.

**Rutas con `.php`:** los endpoints mantienen la nomenclatura `.php` para no tener que modificar todos los `fetch()` del frontend, aunque el backend es 100% Java con Spring Boot.