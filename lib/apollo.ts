// lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = new HttpLink({
  uri: '/api/graphql', // Reemplaza esto con tu endpoint de GraphQL
});

const authLink = setContext(async (_, { headers }) => {
  // Obtén la sesión con el token JWT
  const session = await getSession();
  // Retorna los headers con el token incluido
  return {
    headers: {
      ...headers,
      authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
    }
  };
});

const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
