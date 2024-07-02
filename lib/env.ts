const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL || 'http://localhost:3000';

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PORT: process.env.API_PORT || 3000,
  AUTH0_SECRET: process.env.AUTH0_SECRET || '',
  AUTH0_BASE_URL: AUTH0_BASE_URL,
  AUTH0_CALLBACK: `${AUTH0_BASE_URL}/api/auth/callback/auth0`,
  AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL || '',
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET || '',
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
  AUTH0_SCOPE: process.env.AUTH0_SCOPE || 'openid profile email read:shows',
  JWT_SECRET: process.env.JWT_SECRET || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
};
