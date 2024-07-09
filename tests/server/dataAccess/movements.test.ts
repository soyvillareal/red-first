import { prisma } from '@/tests/setup';

import {
  ICreateUserRepository,
  IGetMovementsRepository,
} from '@/types/dataAccess/movements';
import {
  IPaginationMovementsParams,
  TValidsMovementTypes,
} from '@/types/graphql/resolvers';
import { MovementsRepository } from '@/server/dataAccess/movements';
import dayjs from 'dayjs';
import { Decimal } from '@prisma/client/runtime/library';

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

      const result = await repository.createMovement(mockMovement);

      expect(result).toEqual(createdMovement);
      expect(prisma.movements.create).toHaveBeenCalledWith({
        data: {
          userId: mockMovement.userId,
          amount: mockMovement.amount,
          concept: mockMovement.concept,
          date: dayjs(mockMovement.date).toDate(),
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

      const result = await repository.createMovement(mockMovement);

      expect(result).toBeNull();
    });
  });

  describe('getMovements', () => {
    it('should return movements for a user with pagination', async () => {
      const paginationParams: IPaginationMovementsParams<TValidsMovementTypes> =
        {
          limit: 10,
          skip: 0,
          order: 'asc',
          userId: null,
          filterType: null,
          fieldOrder: 'date',
        };

      const mockMovements: IGetMovementsRepository[] = [
        {
          id: '1',
          amount: new Decimal('9999'),
          concept: 'income',
          date: new Date('2023-01-01'),
          userId: '12ccr-1234-1234-1234',
        },
      ];

      prisma.movements.findMany.mockResolvedValue(mockMovements);

      const result = await repository.getMovements(paginationParams);

      expect(result).toEqual(mockMovements);
      expect(prisma.movements.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          userId: true,
          amount: true,
          concept: true,
          date: true,
        },
        where: {
          concept: paginationParams.filterType || undefined,
          userId: paginationParams.userId || undefined,
        },
        skip: paginationParams.skip,
        take: paginationParams.limit,
        orderBy: {
          [paginationParams.fieldOrder as string]: paginationParams.order,
        },
      });
    });

    it('should return null if there is an error', async () => {
      const paginationParams: IPaginationMovementsParams<TValidsMovementTypes> =
        {
          limit: 10,
          skip: 0,
          order: 'asc',
          userId: null,
          filterType: null,
          fieldOrder: 'date',
        };

      prisma.movements.findMany.mockRejectedValue(
        new Error('Error fetching movements'),
      );

      const result = await repository.getMovements(paginationParams);

      expect(result).toBeNull();
    });
  });

  describe('getTotalMovements', () => {
    it('should return the total number of movements for a user', async () => {
      const userId = '1fh3d-1234-1234-1234';
      const filterType = 'income';

      prisma.movements.count.mockResolvedValue(5);

      const result = await repository.getTotalMovements(filterType, userId);

      expect(result).toBe(5);
      expect(prisma.movements.count).toHaveBeenCalledWith({
        where: {
          concept: filterType || undefined,
          userId: userId || undefined,
        },
      });
    });

    it('should return null if there is an error', async () => {
      const userId = '1c32x-1234-1234-1234';
      const filterType = 'income';

      prisma.movements.count.mockRejectedValue(
        new Error('Error fetching total movements'),
      );

      const result = await repository.getTotalMovements(filterType, userId);

      expect(result).toBeNull();
    });
  });
});
