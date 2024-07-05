import { type INextAuthUserSession } from '@/types';

declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session {
    user: INextAuthUserSession;
    accessToken?: string;
  }
}
