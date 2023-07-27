import type {NextAuthOptions} from 'next-auth';

export const options: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: '/next-stores/login',
    signOut: '/next-stores/logout',
    newUser: '/next-stores/register',
  },
};
