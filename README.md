## Prueba Técnica para Desarrollador Fullstack Senior

### Intrucciones para ejecutar el proyecto localmente con o sin Docker

Primero debes modificar las variables de entorno, ten en cuenta que, para que el contenedor docker se ejcute sin problemas, debes crear un archivo llamado ".env.local" y dentro colocaras las variables de entorno que reposan en ".env.example". Aquí tienes que agregar los valores correspondientes de las variables de entorno y que hace cada una.

```
# This is the base URL of the application
NEXTAUTH_URL=http://localhost:3000
# The domain of the Auth0 tenant
AUTH0_DOMAIN=tenantName.us.auth0.com
# The Client ID of the application
AUTH0_CLIENT_ID=clientId
# The Client Secret of the application
AUTH0_CLIENT_SECRET=clientSecret
# The URL of the roles API Identifier
AUTH0_ROLES_IDENTIFIER=rolesIdentifier
# The scope of the application
AUTH0_SCOPE='openid profile email phone read:shows'
# The secret used to encrypt the JWTs
JWT_SECRET=jwtSecret
# The Google Analytics Tracking ID
GA_TRACKING_ID=G-XXXXXXXXXX
# The URL of the database
DATABASE_URL=postgresql://username:password@hostname:5432/red_first?schema=public
```

### Nota: 

- Las siguientes variables se obtenienen al crear una aplicación de [Auth0](https://auth0.com/): `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID` y `AUTH0_CLIENT_SECRET`. Puedes apoyarte en la [documentación oficial de Auth0](https://next-auth.js.org/providers/auth0).
- La variable `AUTH0_ROLES_IDENTIFIER` tambien se obtiene de la configuración de Auth0, pero para esta, hay una configuración adicional.
    1. Primero necesitaras configurar un flujo de Auth0, para esto tienes que dirijirte a **Actions** > **Flows** > **Login**
    2. Una vez dentro de **Login** debes dar clic en el botón con simbolo "Más" (**+**), esta vista se encuentra úbicada en el lado derecho en la sección **Add Action**.
    3. Te aparecerán varias opciones, debes seleccionar la que dice "Build from scratch". Una vez aquí, llena los campos y haz clic en **Create**.
    4. Al dar clic en crear, esto te llevará a otra vista donde puedes escribir código, aquí vas a escribir lo siguiente:
        ```
        exports.onExecutePostLogin = async (event, api) => {
            const namespace = 'https://auth0.roles.redfirst.com/';
            const roles = event.authorization.roles;
            
            // Añadir roles al token de acceso
            api.accessToken.setCustomClaim(`${namespace}roles`, roles);
            
            // Añadir roles al token de ID (opcional)
            api.idToken.setCustomClaim(`${namespace}roles`, roles);
        };
        ```
    5. Una vez escrito esto, haz clic en **Deploy**
- La variable de entorno `GA_TRACKING_ID` la puedes obtener creando una aplicación de [Google Analytics](https://support.google.com/analytics/answer/9304153?hl=en).
- La variable de entorno `DATABASE_URL` es una url de conexión a postgresql y está relacionada con la configuración de las variables de entorno en el servicio **db** en el archivo `docker-compose.yml`. Esta variable de entorno se compone de:
    - Hostname: db
    - Puerto: 5432
    - Usuario: postgres
    - Contraseña: 123456
    - Base de datos: redfirst
        - Esta base de datos debe ser creada una vez se levante el contenedor de Docker mediante [pgadmin](http://localhost:5050) o por consola.

### Comandos con Docker

```
docker compose up -d

# Antes de ejecutar esto, asegurate de haber creado una base de datos mediante pgadmin o la consola.

npm i -g dotenv-cli

dotenv -e .env.local npx prisma migrate deploy
```

## En caso de querer iniciar el proyecto localmente sin Docker, necesitaras lo siguiente

- NodeJS >= v18.19.1
- Postgresql 16.3

### Comandos sin Docker

```
npm install

npm i -g dotenv-cli

npm run dev
```

