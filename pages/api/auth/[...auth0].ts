import { pageRouterAuth } from '@/lib/auth0';

const redirectUri = `${process.env.AUTH0_BASE_URL}/api/auth/callback`;

export default pageRouterAuth.handleAuth({
  login: pageRouterAuth.handleLogin({
    authorizationParams: {
      prompt: 'login',
      audience: process.env.AUTH0_AUDIENCE,
      scope: process.env.AUTH0_SCOPE,
      client_id: process.env.AUTH0_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
    },
    returnTo: process.env.AUTH0_BASE_URL,
  }),
  signup: pageRouterAuth.handleLogin({
    authorizationParams: {
      prompt: 'signup',
      audience: process.env.AUTH0_AUDIENCE,
      scope: process.env.AUTH0_SCOPE,
      client_id: process.env.AUTH0_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      screen_hint: 'signup',
    },
    returnTo: process.env.AUTH0_BASE_URL,
  }),
  callback: pageRouterAuth.handleCallback({ redirectUri }),
  postLogoutRedirect: pageRouterAuth.handleLogout({
    returnTo: process.env.AUTH0_BASE_URL,
  }),
});
