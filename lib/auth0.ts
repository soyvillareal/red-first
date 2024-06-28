import { initAuth0, Auth0Server } from '@auth0/nextjs-auth0';

import env from './env';

export const pageRouterAuth: Auth0Server = initAuth0({
  auth0Logout:
    env.AUTH0_ISSUER_BASE_URL.startsWith('http://localhost') === false,
  routes: {
    login: '/api/auth/login',
    callback: '/api/auth/callback',
    postLogoutRedirect: '/',
  },
});
