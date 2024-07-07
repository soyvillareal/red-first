import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { EUserRole, TProfileWithRoles } from '@/types';
import { AuthOptions, CallbacksOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { env } from '@/lib/env';

jest.mock('@/server/dataAccess/users', () => ({
  UsersRepository: jest.fn().mockImplementation(() => ({
    updateUser: jest.fn(),
    getAccountDataByProviderId: jest.fn(),
  })),
}));

jest.mock('next-auth/providers/auth0', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { env } = require('@/lib/env');
  return {
    default: jest.fn().mockImplementation(() => ({
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
    })),
    __esModule: true,
  };
});
jest.mock('@next-auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(),
}));
jest.mock('@/lib/env');
jest.mock('@/lib/db', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('logo and providers', () => {
  it('should have the a logo in the theme', () => {
    expect(authOptions?.theme?.logo).toBeDefined();
  });

  it('should defined providers in authOptions', () => {
    expect(authOptions.providers[0]).toMatchObject(
      Auth0Provider({
        idToken: true,
        checks: ['pkce', 'state'],
        clientId: expect.any(String),
        clientSecret: expect.any(String),
        issuer: expect.any(String),
        authorization: {
          params: {
            prompt: 'login',
            audience: expect.any(String),
            scope: expect.any(String),
            client_id: expect.any(String),
            redirect_uri: expect.any(String),
            response_type: 'code',
          },
        },
      }),
    );
  });
});

describe('callbacks', () => {
  const authOptionsRequired = authOptions as Required<AuthOptions>;

  describe('signIn callback', () => {
    it('should define a sign in callback', () => {
      const signInCallback = authOptions?.callbacks?.signIn;
      expect(signInCallback).toBeTruthy();
    });

    it('should allow sign in if profile is not null', () => {
      const signInCallback = authOptionsRequired?.callbacks
        ?.signIn as CallbacksOptions<TProfileWithRoles>['signIn'];

      expect(
        signInCallback({
          account: {
            userId: '12345',
            roles: [EUserRole.USER],
            provider: 'auth0',
            providerAccountId: '12345',
            type: 'email',
            access_token: '12345',
            refresh_token: '123',
            expires_at: 12345,
            id_token: '12345',
            scope: 'openid profile email',
            session_state: '12345',
            token_type: 'Bearer',
          },
          profile: {
            email: 'john.doe@gmail.com',
            name: 'John Doe',
            image: 'https://example.com/john-doe.jpg',
            sub: 'auth0|12345',
            [env.AUTH0_ROLES_IDENTIFIER]: [EUserRole.USER],
          },
          user: {
            id: '12345',
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            image: 'https://example.com/john-doe.jpg',
            emailVerified: new Date(),
          },
        }),
      ).toBeTruthy();
    });

    it('should deny sign in if profile is null', async () => {
      const signInCallback = authOptionsRequired?.callbacks
        ?.signIn as CallbacksOptions['signIn'] & {
        (props: { profile: null | undefined }): Promise<boolean>;
      };
      const result = await signInCallback({ profile: null });
      expect(result).toBeFalsy();
    });
  });

  it('should define a redirect callback', () => {
    const redirectCallback = authOptions?.callbacks?.redirect;
    expect(redirectCallback).toBeTruthy();
  });

  it('should define a jwt callback', () => {
    const jwtCallback = authOptions?.callbacks?.jwt;
    expect(jwtCallback).toBeTruthy();
  });

  it('should define a session callback', () => {
    const sessionCallback = authOptions?.callbacks?.session;
    expect(sessionCallback).toBeTruthy();
  });

  it('should define secret in authOptions', () => {
    expect(authOptions.secret).toBeDefined();
  });

  it('should define session property in authOptions', () => {
    expect(authOptions.session).toMatchObject({
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60,
    });
  });

  it('should define cookies in authOptions', () => {
    expect(authOptions.cookies).toMatchObject({
      sessionToken: {
        name: expect.stringMatching(/next-auth.session-token/),
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: expect.any(Boolean),
        },
      },
      callbackUrl: {
        name: expect.stringMatching(/next-auth.callback-url/),
        options: {
          sameSite: 'lax',
          path: '/',
          secure: expect.any(Boolean),
        },
      },
      csrfToken: {
        name: expect.stringMatching(/next-auth.csrf-token/),
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: expect.any(Boolean),
        },
      },
      pkceCodeVerifier: {
        name: expect.stringMatching(/next-auth.pkce.code_verifier/),
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: expect.any(Boolean),
          maxAge: expect.any(Number),
        },
      },
      state: {
        name: expect.stringMatching(/next-auth.state/),
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: expect.any(Boolean),
          maxAge: expect.any(Number),
        },
      },
      nonce: {
        name: expect.stringMatching(/next-auth.nonce/),
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: expect.any(Boolean),
        },
      },
    });
  });
});
