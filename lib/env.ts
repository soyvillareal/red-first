const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  GRAPHQL_SUFFIX: '/api/graphql',
  NEXTAUTH_URL: NEXTAUTH_URL,
  AUTH0_CALLBACK: `${NEXTAUTH_URL}/api/auth/callback/auth0`,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  AUTH0_ISSUER_BASE_URL: `https://${process.env.AUTH0_DOMAIN}` || '',
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET || '',
  AUTH0_AUDIENCE: `https://${process.env.AUTH0_DOMAIN}/api/v2/` || '',
  AUTH0_ROLES_IDENTIFIER: process.env.AUTH0_ROLES_IDENTIFIER || '',
  AUTH0_SCOPE: process.env.AUTH0_SCOPE || 'openid profile email read:shows',
  JWT_SECRET: process.env.JWT_SECRET || '',
  GA_TRACKING_ID: process.env.GA_TRACKING_ID || '',
  LOGO_URL: `${NEXTAUTH_URL}/images/logo.png` || '',
  DATABASE_URL: process.env.DATABASE_URL || '',
  MAX_REQUESTS_LIMIT: process.env.MAX_REQUESTS_LIMIT || '100',
  TIME_TO_WAIT_LIMIT: process.env.TIME_TO_WAIT_LIMIT || '15',
};
