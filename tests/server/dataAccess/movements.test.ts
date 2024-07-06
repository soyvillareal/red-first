import { prisma } from '@/tests/setupNODE';

import {
  ICreateUserRepository,
  IGetMovementsRepository,
  IGetTotalAmountsResult,
} from '@/types/dataAccess/movements';
import { IPaginationParams } from '@/types/graphql/pagination';
import { TValidsMovementTypes } from '@/types/graphql/resolvers';
import { MovementsRepository } from '@/server/dataAccess/movements';

const repository = new MovementsRepository();

describe('MovementsRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user movement', async () => {
      const mockMovement: ICreateUserRepository = {
        userId: '1',
        amount: '99992',
        concept: 'income',
        date: '2023-01-01',
      };

      const createdMovement = {
        ...mockMovement,
        id: '1',
      };

      prisma.movements.create.mockResolvedValue(createdMovement);

      const result = await repository.createUser(mockMovement);

      expect(result).toEqual(createdMovement);
      expect(prisma.movements.create).toHaveBeenCalledWith({
        data: {
          user: { connect: { id: mockMovement.userId } },
          amount: mockMovement.amount,
          concept: mockMovement.concept,
          date: new Date(mockMovement.date),
        },
      });
    });

    it('should return null if there is an error', async () => {
      const mockMovement: ICreateUserRepository = {
        userId: '1',
        amount: '100',
        concept: 'income',
        date: '2024-01-01',
      };

      prisma.movements.create.mockRejectedValue(
        new Error('Error creating movement'),
      );

      const result = await repository.createUser(mockMovement);

      expect(result).toBeNull();
    });
  });

  describe('getMovements', () => {
    it('should return movements for a user with pagination', async () => {
      const userId = '1';
      const paginationParams: IPaginationParams<TValidsMovementTypes> = {
        limit: 10,
        skip: 0,
        order: 'asc',
        queryValue: '',
        filterType: null,
        fieldOrder: 'date',
      };

      const mockMovements: IGetMovementsRepository[] = [
        {
          id: '1',
          amount: '9999',
          concept: 'income',
          date: new Date('2023-01-01'),
          user: {
            name: 'John Doe',
          },
        },
      ];

      prisma.movements.findMany.mockResolvedValue(mockMovements);

      const result = await repository.getMovements(userId, paginationParams);

      expect(result).toEqual(mockMovements);
      expect(prisma.movements.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          amount: true,
          concept: true,
          date: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        where: {
          userId,
          concept: paginationParams.filterType || undefined,
          OR: [
            {
              amount: {
                contains: paginationParams.queryValue,
                mode: 'insensitive',
              },
            },
            {
              user: {
                name: {
                  contains: paginationParams.queryValue,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        skip: paginationParams.skip,
        take: paginationParams.limit,
        orderBy:
          paginationParams.fieldOrder === 'userName'
            ? {
                user: {
                  name: paginationParams.order,
                },
              }
            : {
                [paginationParams.fieldOrder as string]: paginationParams.order,
              },
      });
    });

    it('should return null if there is an error', async () => {
      const userId = '1';
      const paginationParams: IPaginationParams<TValidsMovementTypes> = {
        limit: 10,
        skip: 0,
        order: 'asc',
        queryValue: '',
        filterType: null,
        fieldOrder: 'date',
      };

      prisma.movements.findMany.mockRejectedValue(
        new Error('Error fetching movements'),
      );

      const result = await repository.getMovements(userId, paginationParams);

      expect(result).toBeNull();
    });
  });

  describe('getTotalMovements', () => {
    it('should return the total number of movements for a user', async () => {
      const userId = '1';
      const filterType = 'income';
      const queryValue = '100';

      prisma.movements.count.mockResolvedValue(5);

      const result = await repository.getTotalMovements(
        userId,
        filterType,
        queryValue,
      );

      expect(result).toBe(5);
      expect(prisma.movements.count).toHaveBeenCalledWith({
        where: {
          userId,
          concept: filterType || undefined,
          OR: [
            {
              amount: {
                contains: queryValue,
                mode: 'insensitive',
              },
            },
            {
              user: {
                name: {
                  contains: queryValue,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
      });
    });

    it('should return null if there is an error', async () => {
      const userId = '1';
      const filterType = 'income';
      const queryValue = '100';

      prisma.movements.count.mockRejectedValue(
        new Error('Error fetching total movements'),
      );

      const result = await repository.getTotalMovements(
        userId,
        filterType,
        queryValue,
      );

      expect(result).toBeNull();
    });
  });

  describe('getTotalAmounts', () => {
    it('should return the total amounts for a user with pagination', async () => {
      const userId = '1';
      const paginationParams: IPaginationParams<TValidsMovementTypes> = {
        limit: 10,
        skip: 0,
        order: 'asc',
        queryValue: '',
        filterType: null,
        fieldOrder: 'date',
      };

      const mockTotalAmounts: IGetTotalAmountsResult[] = [
        {
          amount: '99999',
        },
      ];

      prisma.movements.findMany.mockResolvedValue(mockTotalAmounts);

      const result = await repository.getTotalAmounts(userId, paginationParams);

      expect(result).toEqual(mockTotalAmounts);
      expect(prisma.movements.findMany).toHaveBeenCalledWith({
        select: {
          amount: true,
        },
        where: {
          userId,
          concept: paginationParams.filterType || undefined,
          OR: [
            {
              amount: {
                contains: paginationParams.queryValue,
                mode: 'insensitive',
              },
            },
            {
              user: {
                name: {
                  contains: paginationParams.queryValue,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        skip: paginationParams.skip,
        take: paginationParams.limit,
        orderBy:
          paginationParams.fieldOrder === 'userName'
            ? {
                user: {
                  name: paginationParams.order,
                },
              }
            : {
                [paginationParams.fieldOrder as string]: paginationParams.order,
              },
      });
    });

    it('should return undefined if there are no total amounts', async () => {
      const userId = '1';
      const paginationParams: IPaginationParams<TValidsMovementTypes> = {
        limit: 10,
        skip: 0,
        order: 'asc',
        queryValue: '',
        filterType: null,
        fieldOrder: 'date',
      };

      prisma.movements.findMany.mockResolvedValue(null);

      const result = await repository.getTotalAmounts(userId, paginationParams);

      expect(result).toBeUndefined();
    });

    it('should return null if there is an error', async () => {
      const userId = '1';
      const paginationParams: IPaginationParams<TValidsMovementTypes> = {
        limit: 10,
        skip: 0,
        order: 'asc',
        queryValue: '',
        filterType: null,
        fieldOrder: 'date',
      };

      prisma.movements.findMany.mockRejectedValue(
        new Error('Error fetching total amounts'),
      );

      const result = await repository.getTotalAmounts(userId, paginationParams);

      expect(result).toBeNull();
    });
  });
});
