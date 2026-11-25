# Conexión con Google / Gmail

Todo el registro y los envíos de la web pasan por Google:

- **Google Sign-In** para iniciar sesión y registrarse.
- **Google Apps Script** como API.
- **Google Sheets** como base de datos de inscripciones y estados.
- **Gmail** para enviar todos los correos.

Solo hay que configurarlo una vez.

---

## 1. Crear el backend en Apps Script (10 minutos)

1. Entra a <https://script.google.com> con la cuenta de Gmail que enviará los correos.
2. Pulsa **Nuevo proyecto**.
3. Borra el contenido de `Code.gs` y pega todo el archivo:
   `apps-script/Codigo.gs` de este repositorio.
4. Guarda (Ctrl+S) y ponle nombre al proyecto: `Innovate Academy`.
5. En la barra superior elige la función **`setup`** y pulsa **Ejecutar**.
6. Google pedirá permisos: pulsa **Revisar permisos**, elige tu cuenta y
   **Permitir**.
7. `setup()` crea la hoja **Innovate Academy — Inscripciones** en tu Drive y
   envía un correo con el enlace a los administradores.
8. Opcional: ejecuta `enviarPrueba()` para comprobar que Gmail funciona.

### Publicar la API

1. Pulsa **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Descripción: `API Innovate Academy`.
4. **Ejecutar como:** `Yo`.
5. **Quién tiene acceso:** `Cualquier persona`.
6. Pulsa **Implementar** y copia la **URL de la aplicación web**
   (termina en `/exec`).

> Cada vez que cambies `Codigo.gs` debes crear una **nueva implementación**
> (o editar la existente) para que los cambios se apliquen.

---

## 2. Conectar la web con Apps Script

En `app/lib/google-backend.ts`, pega la URL:

```ts
const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ?? "https://script.google.com/macros/s/XXXX/exec";
```

La clave debe coincidir con `API_KEY` de `Codigo.gs`:

```ts
const GOOGLE_SCRIPT_KEY =
  process.env.GOOGLE_SCRIPT_KEY ?? "innovate-academy-google-key";
```

Si tienes acceso a Vercel, es mejor usar las variables de entorno:
`GOOGLE_SCRIPT_URL` y `GOOGLE_SCRIPT_KEY`.

---

## 3. Activar Google Sign-In

1. Entra a <https://console.cloud.google.com> con la misma cuenta de Gmail.
2. Crea un proyecto: **Innovate Academy**.
3. Ve a **APIs y servicios → Pantalla de consentimiento de OAuth**:
   - Tipo: **Externo**.
   - Nombre de la app: `Innovate Academy`.
   - Correo de asistencia: tu Gmail.
   - Guarda.
4. Ve a **APIs y servicios → Credenciales → Crear credenciales →
   ID de cliente de OAuth**.
5. Tipo: **Aplicación web**.
6. **Orígenes de JavaScript autorizados:**
   - `https://innovateweb.vercel.app`
   - `http://localhost:3000`
7. **URIs de redireccionamiento autorizados:** no hace falta ninguno.
8. Copia el **Client ID** y pégalo en `app/lib/google-auth-config.ts`:

```ts
export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
  "1234567890-abc.apps.googleusercontent.com";
```

O usa la variable `NEXT_PUBLIC_GOOGLE_CLIENT_ID` en Vercel.

> El Client ID es público, no es un secreto. No necesitas Client Secret.

---

## 4. Probar

1. Abre `/login` y pulsa **Continuar con Google**.
2. Entra con tu cuenta y verifica que el navbar muestra tu nombre.
3. Ve a `/cursos`, pulsa **Inscribirse** y envía la inscripción.
4. Debe llegar un correo a **alec.alvarez.lobato@gmail.com** y a
   **innovatesoporte2026@gmail.com** con el botón **Activar curso**.
5. Pulsa **Activar curso**: la hoja cambia a `Cursando` y el alumno recibe un
   correo.
6. En `/mis-cursos`, el alumno verá el estado actualizado.

---

## Cómo funcionan los estados

| Estado      | Cuándo aparece                                      |
| ----------- | --------------------------------------------------- |
| En espera   | Al enviar el formulario de inscripción.             |
| Cursando    | Cuando se pulsa **Activar curso** en el correo.     |
| Completado  | Cuando se pulsa **Marcar completado** en el correo. |

También puedes cambiar el estado escribiendo directamente en la columna
**Estado** de la hoja. La web lo lee cada vez que el alumno abre su panel.

---

## Formularios conectados

| Formulario        | Ruta               | Acción en Apps Script |
| ----------------- | ------------------ | --------------------- |
| Inscripción       | `/cursos`          | `enroll`              |
| Soporte           | `/soporte`         | `support`             |
| Postulaciones     | `/postula`         | `apply`               |
| Panel del alumno  | `/mis-cursos`      | `status`              |

Todos los correos salen de la cuenta que autorizó el script y llegan a las dos
cuentas de administración.

---

## Límites de Gmail

Una cuenta de Gmail normal puede enviar hasta **100 destinatarios al día** con
Apps Script. Cada inscripción envía 2 correos (administradores + alumno al
activarse), así que el límite práctico ronda las 30–50 inscripciones diarias.
Para más volumen habría que usar Google Workspace.

---

## Seguridad

- La `API_KEY` viaja solo en las llamadas del servidor de Next.js; nunca se
  incluye en el navegador.
- Los enlaces de activación llevan un token HMAC imposible de adivinar.
- El Client ID de Google es público por diseño.
- Si cambias `API_KEY` en `Codigo.gs`, cámbiala también en la web.
