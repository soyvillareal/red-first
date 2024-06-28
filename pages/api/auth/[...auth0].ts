import { pageRouterAuth } from '@/lib/auth0';
import env from '@/lib/env';

const redirectUri = `${env.AUTH0_BASE_URL}/api/auth/callback`;

export default pageRouterAuth.handleAuth({
  login: pageRouterAuth.handleLogin({
    authorizationParams: {
      prompt: 'login',
      audience: env.AUTH0_AUDIENCE,
      scope: env.AUTH0_SCOPE,
      client_id: env.AUTH0_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
    },
    returnTo: env.AUTH0_BASE_URL,
  }),
  signup: pageRouterAuth.handleLogin({
    authorizationParams: {
      prompt: 'signup',
      audience: env.AUTH0_AUDIENCE,
      scope: env.AUTH0_SCOPE,
      client_id: env.AUTH0_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      screen_hint: 'signup',
    },
    returnTo: env.AUTH0_BASE_URL,
  }),
  callback: pageRouterAuth.handleCallback({ redirectUri }),
  postLogoutRedirect: pageRouterAuth.handleLogout({
    returnTo: env.AUTH0_BASE_URL,
  }),
});
