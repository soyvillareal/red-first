import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

import { env } from './env';

const httpLink = new HttpLink({
  uri: env.GRAPHQL_SUFFIX,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export const MovementMutation = gql`
  mutation ($concept: EMovementConcept!, $amount: String!, $date: String!) {
    createMovement(
      movement: { concept: $concept, amount: $amount, date: $date }
    )
  }
`;

export const MovementsQuery = gql`
  query GetMovements(
    $page: Float!
    $limit: Float!
    $order: String!
    $filterType: String
    $queryValue: String
    $fieldOrder: String!
  ) {
    getMovements(
      pagination: {
        page: $page
        limit: $limit
        order: $order
        filterType: $filterType
        queryValue: $queryValue
        fieldOrder: $fieldOrder
      }
    ) {
      data {
        total
        movements {
          id
          userName
          amount
          concept
          date
        }
      }
      meta {
        page
        limit
        itemCount
        pageCount
        hasPreviousPage
        hasNextPage
        errorMessage
      }
    }
  }
`;

export const UserMutation = gql`
  mutation ($userId: String!, $name: String!, $role: EUserRole!) {
    updateUser(user: { userId: $userId, name: $name, role: $role })
  }
`;

export const UsersQuery = gql`
  query GetUsers(
    $page: Float!
    $limit: Float!
    $order: String!
    $filterType: String
    $queryValue: String
    $fieldOrder: String!
  ) {
    getUsers(
      pagination: {
        page: $page
        limit: $limit
        order: $order
        filterType: $filterType
        queryValue: $queryValue
        fieldOrder: $fieldOrder
      }
    ) {
      data {
        id
        name
        email
        phone
      }
      meta {
        page
        limit
        itemCount
        pageCount
        hasPreviousPage
        hasNextPage
        errorMessage
      }
    }
  }
`;

export const MovementsChartQuery = gql`
  query GetMovementsChart($year: String) {
    getMovementsChart(year: $year) {
      name
      income
      expense
    }
  }
`;

export const AdditionalMovementsChartQuery = gql`
  query GetAdditionalMovements {
    getAdditionalMovements {
      balance
      movements
      recentMovements {
        id
        name
        email
        image
        movement
        concept
      }
    }
  }
`;

export const ValidYearsQuery = gql`
  query GetValidYears {
    getValidYears
  }
`;
