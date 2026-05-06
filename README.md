# ProyectoMarcos - Clínica Web App (Spring Boot + PostgreSQL)

## Descripción
Proyecto web de clínica médica migrado de PHP a **Spring Boot (Java 21)** con base de datos **PostgreSQL**.

---

## Requisitos
- Java 21+
- Maven 3.8+
- PostgreSQL 13+
- Tu base de datos `Clinica_JosePardo` ya existente

---

## Configuración de la base de datos

### Paso 1: Crear la base de datos (si no existe)
```sql
CREATE DATABASE "Clinica_JosePardo";
```

### Paso 2: Ejecutar el script de tablas
Abre pgAdmin o psql y ejecuta el archivo:
```
src/main/resources/schema.sql
```

### Paso 3: Verificar credenciales
Edita `src/main/resources/application.properties` si tus credenciales son diferentes:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Clinica_JosePardo
spring.datasource.username=postgres
spring.datasource.password=rodrigo20041998
```

---

## Cómo ejecutar el proyecto

### Opción 1: Con Maven
```bash
cd ProyectoMarcos
./mvnw spring-boot:run
```

### Opción 2: Con IntelliJ IDEA
1. Abrir el proyecto
2. Ejecutar `ProyectoMarcosApplication.java`

### Opción 3: JAR
```bash
./mvnw clean package
java -jar target/ProyectoMarcos-0.0.1-SNAPSHOT.jar
```

---

## Acceder a la aplicación

Abre el navegador en:
```
http://localhost:8080
```

Las páginas disponibles:
- **Inicio:** http://localhost:8080/
- **Login:** http://localhost:8080/login
- **Registro:** http://localhost:8080/register
- **Mis Citas:** http://localhost:8080/mis-citas
- **Panel Doctor:** http://localhost:8080/doctor

---

## Endpoints API REST

Todos los endpoints mantienen la misma URL que usaban los archivos PHP originales:

| Método | URL | Descripción |
|--------|-----|-------------|
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/login.php` | Login paciente o doctor |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/register.php` | Registro de paciente |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/verificar_correo.php` | Verifica si correo existe |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/cambiar_password.php` | Cambia contraseña |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/guardar_cita.php` | Crea nueva cita |
| GET  | `/ProyectoModificado/ProyectoMarcos/Clinica/api/mis_citas.php?correo=...` | Citas del paciente |
| GET  | `/ProyectoModificado/ProyectoMarcos/Clinica/api/citas_doctor.php?nombre=...` | Citas del doctor |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/actualizar_estado.php` | Cambia estado de cita |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/editar_cita.php` | Edita fecha/hora/motivo |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/eliminar_cita.php` | Elimina cita |
| POST | `/ProyectoModificado/ProyectoMarcos/Clinica/api/guardar_comentario.php` | Guarda comentario doctor |

---

## Estructura del proyecto

```
ProyectoMarcos/
├── src/
│   ├── main/
│   │   ├── java/com/utp/ProyectoMarcos/
│   │   │   ├── ProyectoMarcosApplication.java   ← Clase principal
│   │   │   ├── config/
│   │   │   │   └── WebConfig.java               ← CORS + Recursos estáticos
│   │   │   ├── controller/
│   │   │   │   ├── ClinicaController.java        ← Todos los endpoints REST (reemplaza PHP)
│   │   │   │   └── PageController.java           ← Sirve páginas HTML
│   │   │   ├── model/
│   │   │   │   ├── Paciente.java                 ← Entidad tabla pacientes
│   │   │   │   ├── Medico.java                   ← Entidad tabla medicos
│   │   │   │   └── Cita.java                     ← Entidad tabla citas
│   │   │   └── repository/
│   │   │       ├── PacienteRepository.java
│   │   │       ├── MedicoRepository.java
│   │   │       └── CitaRepository.java
│   │   └── resources/
│   │       ├── application.properties            ← Configuración BD
│   │       ├── schema.sql                        ← Script SQL para crear tablas
│   │       └── static/
│   │           ├── Clinica/
│   │           │   ├── pages/   ← HTML (inicio, login, register, etc.)
│   │           │   ├── css/     ← Estilos
│   │           │   ├── js/      ← JavaScript del frontend
│   │           │   └── img/     ← Imágenes
│   │           └── bootstrap-5.3.8-dist/         ← Bootstrap local
├── pom.xml                                        ← Dependencias Maven
└── README.md
```

---

## Nota sobre contraseñas de médicos

Las contraseñas de los médicos en la BD están encriptadas con **bcrypt** (PHP `password_hash`).  
Spring Boot usa **BCryptPasswordEncoder** que es 100% compatible, así que los médicos pueden iniciar sesión con la misma contraseña que usaban antes.
