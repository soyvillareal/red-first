## Prueba Técnica para Desarrollador Fullstack Senior

## Table of contents:

- [Variables de entorno](#variables-de-entorno)
- [Configuración del proveedor de correos](#configuración-del-proveedor-de-correos)
- [Instrucciones para iniciar con Docker](#instrucciones-para-iniciar-con-docker)
- [Instrucciones para iniciar sin Docker](#instrucciones-para-iniciar-sin-docker)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Obersvaciones](#observaciones)
- [Vistas previas del proyecto](#vistas-previas-del-proyecto)
  - [1. Inicio](#1-inicio)
  - [2. Reportes](#2-reportes)
  - [3. Movimientos](#3-movimientos)
  - [4. Nuevo movimiento](#4-nuevo-movimiento)
  - [5. Usuarios](#5-usuarios)
  - [6. Editar usuario](#6-editar-usuario)

## Variables de entorno

Primero debes modificar las variables de entorno, ten en cuenta que, para que el contenedor docker se ejcute sin problemas, debes crear un archivo llamado ".env.local" y dentro colocaras las variables de entorno que reposan en ".env.example". Aquí tienes que agregar los valores correspondientes de las variables de entorno y que hace cada una.

```bash
# Esta es la URL base de la aplicación.
NEXTAUTH_URL=http://localhost:3000
# El dominio de la Auth0 tenant
AUTH0_DOMAIN=tenantName.us.auth0.com
# El ID de cliente de la aplicación.
AUTH0_CLIENT_ID=clientId
# El secreto del cliente de la aplicación.
AUTH0_CLIENT_SECRET=clientSecret
# La URL del identificador de API de roles.
AUTH0_ROLES_IDENTIFIER=rolesIdentifier
# El alcance de la aplicación.
AUTH0_SCOPE='openid profile email phone read:shows'
# El número máximo de solicitudes que se pueden realizar a la API.
MAX_REQUESTS_LIMIT=100
# El tiempo que se debe esperar antes de realizar otra solicitud a la API después de alcanzar el límite
TIME_TO_WAIT_LIMIT=30
# El secreto utilizado para cifrar los JWT
JWT_SECRET=jwtSecret
# El ID de seguimiento de Google Analytics
GA_TRACKING_ID=G-XXXXXXXXXX
# La URL de la base de datos.
DATABASE_URL=postgresql://username:password@hostname:5432/red_first?schema=public
```

### Nota:

- Las siguientes variables se obtenienen al crear una aplicación de [Auth0](https://auth0.com/): `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID` y `AUTH0_CLIENT_SECRET`. Puedes apoyarte en la [documentación oficial de Auth0](https://next-auth.js.org/providers/auth0).
- La variable `AUTH0_ROLES_IDENTIFIER` tambien se obtiene de la configuración de Auth0, pero para esta, hay una configuración adicional.

  1. Primero necesitaras configurar un flujo de Auth0, para esto tienes que dirijirte a **Actions** > **Flows** > **Login**
  2. Una vez dentro de **Login** debes dar clic en el botón con simbolo "Más" (**+**), esta vista se encuentra úbicada en el lado derecho en la sección **Add Action**.
  3. Te aparecerán varias opciones, debes seleccionar la que dice "Build from scratch". Una vez aquí, llena los campos y haz clic en **Create**.
  4. Al dar clic en crear, esto te llevará a otra vista donde puedes escribir código, aquí vas a escribir lo siguiente:

     ```bash
     exports.onExecutePostLogin = async (event, api) => {
         const namespace = 'https://auth0.roles.redfirst.com/';
         const roles = event.authorization.roles;

         // Añadir roles al token de acceso
         api.accessToken.setCustomClaim(`${namespace}roles`, roles);

         // Añadir roles al token de ID (opcional)
         api.idToken.setCustomClaim(`${namespace}roles`, roles);
     };
     ```

     Si decides no modificar `https://auth0.roles.redfirst.com/` entonces este debe ser el valor de tu variable de entorno `AUTH0_ROLES_IDENTIFIER`

  5. Una vez escrito esto, haz clic en **Deploy**

- La variable de entorno `AUTH0_SCOPE` dependerá de los permisos que usted le configuré a su api **Auth0 Management API**, esto puede hacerlo dirigiendose a **Applications** > **Machine To Machine Applications**, una vez aquí dentro, podrá observar sus aplicaciones, deberá activar el _Switch_ de la aplicación correspondiente. Una vez realizado lo anterior, solo hace falta agregar los permisos, para esto puede dar clic sobre el icono a la derecha y agregar los siguientes permisos:
  - `read:users`
  - `update:users`
  - `read:roles`
  - `create:role_members`
- La variable de entorno `GA_TRACKING_ID` la puedes obtener creando una aplicación de [Google Analytics](https://support.google.com/analytics/answer/9304153?hl=en).
- La variable de entorno `DATABASE_URL` es una url de conexión a postgresql y está relacionada con la configuración de las variables de entorno en el servicio **db** en el archivo `docker-compose.yml` (Solo aplica para la inicialización con Docker). Esta variable de entorno se compone de:
  - Hostname: db
  - Puerto: 5432
  - Usuario: postgres
  - Contraseña: 123456
  - Base de datos: redfirst
    - Esta base de datos debe ser creada una vez se levante el contenedor de Docker mediante [pgadmin](http://localhost:5050) o por consola.

## Configuración del proveedor de correos

Para realizar esto necesitará acceder a su panel de Auth0 y ubicarse en el menú latereal entrar en la opción "Branding" > "Email Provider". Luego de esto puede seguir estos pasos:

- Activa el checkbox ubicado en el panel que tiene por titulo "Use my own email provider".
- En el panel que tiene por titulo "Email Provider" selecciona "SMTP Provider".
- Llena los campos:

  - `From`: desde donde se enviarán los correos
  - `Host`: este es el host de tu proveedor de correos
  - `Port`: este es el puerto donde se apuntará
  - `Username`: usuario para autorizar el envio de correos
  - `Password`: contraseña para autorizar el envio de correos

  Luego de llenar todos los campos, puedes darle en `Send Test Email` y cersiotate de que todo esté funcionando bien.

- Una vez configurado el proveedor de correos debes dirigirte al menú lateral en la opción "Branding" > "Email templates", una vez aquí deberás seleccionar la plantilla a modificar, activarla y llenar completar los campos que allí aparecen. Necesitarás configurar la plantillas:

  - Verification Email (using Link)
  - Verification Email (using Code)
  - Welcome Email
  - Change Password

- Por último, dirigete a "Authentication" > "Database" > "Attributes". Una vez aquí, da clic en "Activate" y configura los atributos de "Email", necesitarás lo siguiente:
  - `Use Email as Identifier`: necesitarás activar esto
  - `Allow Signup with Email`: necesitarás colocar esto como `Required`
  - `Verify email on sign up`: necesitarás checar esta opción
  - `Require email on user profile`: necesitarás checar esta opción

### Nota: puedes configurar cualquier otro proveedor de correos, no necesariamente tiene que ser uno personalizado.

## Configuraciónes adicionales para Auth0

Asegurate de colocar la url desde donde redigiras a los usuarios para autenticarse en:

- `Allowed Callback URLs`
- `Allowed Web Origins`
- `Allowed Logout URLs`

<span style="color: red;font-size:1.2rem;font-weight:bold">Importante: </span> asegurate de que las url coincidan exactamente, ya que de lo contrario esto causaria problemas con la redirección de auth0.

## Instrucciones para iniciar con Docker

```bash
docker compose up -d

# Antes de ejecutar esto, asegurate de haber creado una base de datos mediante pgadmin o la consola.

npm i -g dotenv-cli

dotenv -e .env.local npx prisma migrate deploy
```

## Instrucciones para iniciar sin Docker

```
npm install

npm i -g dotenv-cli

dotenv -e .env.local npx prisma migrate deploy

npm run dev
```

### Nota:

En caso de querer iniciar el proyecto localmente sin Docker, necesitaras lo siguiente

- NodeJS >= v18.19.1
- Postgresql 16.3

## Despliegue en Vercel

1. Para esto necesitaras tener una cuenta en [vercel.com](https://vercel.com).
2. Una vez que hayas ingresado a tu cuenta de Vercel, tienes que enlazar tu cuenta de GitHub con Vercel (en caso de no estar enlazada).
3. Tienes que importar tu repositorio, esto lo puedes hacer dirijiendote a **Overview** > **Add New** > **Project**. Una vez aquí, puedes buscar el repositorio e importalo desde GitHub.
4. Configura las variables de entorno en Vercel, para esto debes dirijirte a **Settings** > **Environment Variables**.
5. Una vez dentro de la pestaña para crear las variables de entorno, asegurate de crear las siguientes variables como secretas.
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `AUTH0_CLIENT_SECRET`
   - `AUTH0_CLIENT_ID`
6. Tambien debes crear las demas variables de entorno, sin embargo, estas pueder ser o no secretas.
   - `GA_TRACKING_ID`
   - `NEXTAUTH_URL`
   - `AUTH0_SCOPE`
   - `AUTH0_ROLES_IDENTIFIER`
   - `AUTH0_DOMAIN`
   - `MAX_REQUESTS_LIMIT`
   - `TIME_TO_WAIT_LIMIT`
7. Luego de esto, puedes hacer push en tu repositorio de GitHub, esto automaticamente causará un despliegue en Vercel.

Tambien puede desplegar su proyecto en vercel utilizando [Vercel CLI](https://vercel.com/docs/deployments/overview#vercel-cli).

Puede encontrar el proyecto [desplegado en vercel](https://red-first.vercel.app/)

## Observaciones

#### El proyecto se realizó teniendo en cuenta aspectos de seguridad como:

- Implementación efectiva de control de acceso basado en roles (RBAC).
- Protección adecuada de los datos sensibles.
- Limitaciones de throttling para la API de GraphQL.
- Herramienta de monitoreo de logs

#### Caracteristas implementadas que no estaban contempladas en el alcance:

- Internacionalzación (next-i18next)
- **Pagina de inicio**: Me tomé libertades en cuanto a la pagina de inicio he intenté hacer algo diferente.
- **Diseño responsivo**: sé que en las notas que componen las indicaciones de la prueba tecnica, dice que _El aplicativo no debe contener diseño responsivo_, sin embargo, quise ir un poco mas allá y agregarle un diseño responsivo para que fuera mas amigable para los usuarios ya que esto en terminos de experiencia de usuario es muy favorable.
- En lugar de 3 pruebas unitarias, me concentré en realizar todas las pruebas que me eran posibles, en total realicé 105 pruebas unitarias enfocado en los puntos criticos de la aplicación (mas enfocado en el backend) como lo son:
  - Middlewares
  - Cliente de Prisma
  - Repositorios
  - Utilidades (Cliente y servidor)
  - Autenticación

## Vistas previas del proyecto

### 1. Inicio

![home](https://red-first.vercel.app/docs/home.png)

### 2. Reportes

![home](https://red-first.vercel.app/docs/reports.png)

### 3. Movimientos

![home](https://red-first.vercel.app/docs/movements.png)

### 4. Nuevo movimiento

![home](https://red-first.vercel.app/docs/new-movement.png)

### 5. Usuarios

![home](https://red-first.vercel.app/docs/users.png)

### 6. Editar usuario

![home](https://red-first.vercel.app/docs/edit-user.png)
