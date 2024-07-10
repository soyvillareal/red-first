import NextAuth, { AuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { env } from '@/lib/env';
import { EUserRole, TProfileWithRoles, TSessionWithRoles } from '@/types';
import prisma from '@/lib/db';
import { UsersRepository } from '@/server/dataAccess/users';

const COOKIES_LIFE_TIME = 24 * 60 * 60; // 24 hours
const COOKIE_PREFIX = env.NODE_ENV === 'production' ? '__Secure-' : '';

const usersRepository = new UsersRepository();

export const authOptions: AuthOptions = {
  theme: {
    logo: env.LOGO_URL,
  },
  providers: [
    Auth0Provider({
      idToken: true,
      checks: ['pkce', 'state'],
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          prompt: 'login',
          audience: env.AUTH0_AUDIENCE,
          scope: env.AUTH0_SCOPE,
          client_id: env.AUTH0_CLIENT_ID,
          redirect_uri: env.AUTH0_CALLBACK,
          response_type: 'code',
        },
      },
    }),
  ],
  useSecureCookies: env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: `${COOKIE_PREFIX}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `${COOKIE_PREFIX}next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `${COOKIE_PREFIX}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: env.NODE_ENV === 'production',
      },
    },
    pkceCodeVerifier: {
      name: `${COOKIE_PREFIX}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: env.NODE_ENV === 'production',
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    state: {
      name: `${COOKIE_PREFIX}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: env.NODE_ENV === 'production',
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    nonce: {
      name: `${COOKIE_PREFIX}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: env.NODE_ENV === 'production',
      },
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: env.JWT_SECRET,
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ profile }) {
      const rolesIdentifier =
        env.AUTH0_ROLES_IDENTIFIER as keyof TProfileWithRoles;
      const profileWithRoles = (profile as TProfileWithRoles) ?? {};
      const userRoles = profileWithRoles[rolesIdentifier];

      if (profile === undefined || profile === null) {
        return false;
      }

      if (userRoles && userRoles.length > 0) {
        const accountProviderId = profileWithRoles.sub;
        if (accountProviderId && profileWithRoles.name) {
          const accountData = await usersRepository.getAccountDataByProviderId(
            accountProviderId,
          );

          if (accountData) {
            await usersRepository.updateUser(accountData.userId, {
              name: profileWithRoles.name,
              role: userRoles[0] as EUserRole,
            });
          }
        }
      }

      return true;
    },
    redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? `${baseUrl}/` : baseUrl;
    },
    async session({ session, user }) {
      const userWithRoles = user as TSessionWithRoles;

      return {
        ...session,
        user: {
          ...session.user,
          id: userWithRoles.id,
          roles: userWithRoles.roles,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
