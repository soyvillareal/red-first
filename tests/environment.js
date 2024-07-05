process.env.API_PORT='3000'
process.env.AUTH0_BASE_URL='http://localhost:3000'
process.env.AUTH0_DOMAIN='acme.auth0.local'
process.env.AUTH0_CLIENT_ID='client_id';
process.env.AUTH0_CLIENT_SECRET='client_secret';
process.env.AUTH0_ROLES_IDENTIFIER='https://roles.acme.auth0.local/roles'
process.env.AUTH0_SCOPE='openid profile email phone read:shows'
process.env.JWT_SECRET='jwtSecret'
process.env.LOGO_URL='https://authjs.dev/img/logo-sm.png'
process.env.DATABASE_URL='postgresql://postgres:123456@localhost:5432/redfirst?schema=public'