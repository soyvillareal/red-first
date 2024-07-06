import {
  IGetMovementsChart,
  IGetRecentMovements,
} from '@/types/graphql/resolvers';

export const movementsChartMock: IGetMovementsChart[] = [
  { name: 'jan', expense: '100', income: '200' },
  { name: 'feb', expense: '200', income: '300' },
  {
    name: 'mar',
    expense: '300',
    income: '400',
  },
  {
    name: 'apr',
    expense: '400',
    income: '500',
  },
  {
    name: 'may',
    expense: '500',
    income: '600',
  },
  {
    name: 'jun',
    expense: '600',
    income: '700',
  },
  {
    name: 'jul',
    expense: '700',
    income: '800',
  },
  {
    name: 'aug',
    expense: '800',
    income: '900',
  },
  {
    name: 'sep',
    expense: '900',
    income: '1000',
  },
  {
    name: 'oct',
    expense: '1000',
    income: '1100',
  },
  {
    name: 'nov',
    expense: '1100',
    income: '1200',
  },
  {
    name: 'dec',
    expense: '1200',
    income: '1300',
  },
];

export const recentMovementsMock: IGetRecentMovements[] = [
  {
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    concept: 'income',
    id: '123e456',
    image: 'https://example.com/image.jpg',
    movement: '1000',
  },
  {
    name: 'John Doe',
    email: 'jonh.doe@gmail.com',
    concept: 'expense',
    id: '123e457',
    image: 'https://example.com/image.jpg',
    movement: '500',
  },
  {
    name: 'John Smith',
    email: 'john.smith@gmail.com',
    concept: 'expense',
    id: '123e458',
    image: 'https://example.com/image.jpg',
    movement: '250',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@gmail.com',
    concept: 'income',
    id: '123e459',
    image: 'https://example.com/image.jpg',
    movement: '750',
  },
];

export const mockClientCache = {
  ROOT_QUERY: {
    'getMovements({"pagination":{"fieldOrder":"date","filterType":null,"limit":10,"order":"asc","page":1,"queryValue":""}})':
      {
        __typename: 'PaginatedMovements',
        data: {
          __typename: 'GetMovementsWithTotal',
          total: '$ 1.161.985,00',
          movements: [
            {
              __ref: 'GetMovements:f39750d5-b85e-47fc-804a-32f6a51ff4a0',
            },
            {
              __ref: 'GetMovements:86b1e942-8cf8-487e-b5f1-4d68826c8072',
            },
            {
              __ref: 'GetMovements:7dfbf47b-7830-4e71-87f2-177341cb89cf',
            },
            {
              __ref: 'GetMovements:e41d2b9c-e252-41e8-b873-bd0b0aac5f76',
            },
            {
              __ref: 'GetMovements:7d92ce98-1215-428b-89cb-3f280dce7f6a',
            },
            {
              __ref: 'GetMovements:692ca175-04e6-440b-b84a-af52469dd50a',
            },
          ],
        },
        meta: {
          __typename: 'PageMeta',
          page: 1,
          limit: 10,
          itemCount: 6,
          pageCount: 1,
          hasPreviousPage: false,
          hasNextPage: false,
          errorMessage: null,
        },
      },
  },
};
