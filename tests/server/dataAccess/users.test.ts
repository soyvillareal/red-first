import { prisma } from '@/tests/setup';
import {
  IGetAccountDataByProviderIdResult,
  IGetAccountDataResult,
  IGetUsersRepository,
  IUpdateUserParams,
} from '@/types/dataAccess/users';
import { EUserRole } from '@/types';
import { UsersRepository } from '@/server/dataAccess/users';
import { IPaginationParams } from '@/types/graphql/pagination';
import { TValidsUserTypes } from '@/types/graphql/resolvers';

const repository = new UsersRepository();

describe('UsersRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = '123c4567-89ab-cdef-1234-567890123456';
      const mockUser: IUpdateUserParams = {
        name: 'John Doe',
        role: EUserRole.ADMIN,
      };

      const updatedUser = {
        id: userId,
      };

      prisma.user.update.mockResolvedValue(updatedUser);

      const result = await repository.updateUser(userId, mockUser);

      expect(result).toEqual(true);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
        data: {
          name: mockUser.name,
          roles: {
            set: [mockUser.role],
          },
        },
      });
    });

    it('should return null if there is an error', async () => {
      const userId = '123c4567-89ab-cdef-1234-567890123456';
      const mockUser: IUpdateUserParams = {
        name: 'John Doe',
        role: EUserRole.ADMIN,
      };

      prisma.user.update.mockRejectedValue(false);

      const result = await repository.updateUser(userId, mockUser);

      expect(result).toBe(false);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userId = '123c4567-89ab-cdef-1234-567890123456';
      const mockUser = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: 'image-url',
        roles: [EUserRole.ADMIN],
      };
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await repository.getUserById(userId);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          roles: true,
        },
        where: {
          id: userId,
        },
      });
    });

    it('should return undefined if the user is not found', async () => {
      const userId = '123c4567-89ab-cdef-1234-567890123456';
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await repository.getUserById(userId);

      expect(result).toBe(undefined);
    });

    it('should return null if there is an error', async () => {
      const userId = '123c4567-89ab-cdef-1234-567890123456';
      prisma.user.findUnique.mockRejectedValue(null);

      const result = await repository.getUserById(userId);

      expect(result).toBe(null);
    });
  });

  describe('getTotalUsers', () => {
    it('should return the total of users', async () => {
      prisma.user.count.mockResolvedValue(5);

      const result = await repository.getTotalUsers('');

      expect(result).toBe(5);
      expect(prisma.user.count).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              name: {
                contains: '',
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: '',
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    });

    it('should return the total of users with a query value', async () => {
      prisma.user.count.mockResolvedValue(5);

      const result = await repository.getTotalUsers('John Doe');

      expect(result).toBe(5);
      expect(prisma.user.count).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              name: {
                contains: 'John Doe',
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: 'John Doe',
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    });

    it('should return null if there is an error', async () => {
      prisma.user.count.mockRejectedValue(null);

      const result = await repository.getTotalUsers();

      expect(result).toBe(null);
    });

    it('should return null if there is an error with a query value', async () => {
      prisma.user.count.mockRejectedValue(null);

      const result = await repository.getTotalUsers();

      expect(result).toBe(null);
      expect(prisma.user.count).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              name: {
                contains: undefined,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: undefined,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    });
  });

  describe('getUsers', () => {
    it('should return users', async () => {
      const paginationParams: IPaginationParams<TValidsUserTypes> = {
        limit: 10,
        skip: 0,
        order: 'asc',
        queryValue: '',
        filterType: null,
        fieldOrder: 'name',
      };

      const mockUsers: IGetUsersRepository[] = [
        {
          id: '123c4567-89ab-cdef-1234-567890123456',
          name: 'John Doe',
          email: 'jogn.doe@example.com',
          phone: '123456789',
        },
        {
          id: '123c4567-89ab-cdef-1234-567890123457',
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          phone: '123456789',
        },
        {
          id: '123c4567-89ab-cdef-1234-567890123458',
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '123456789',
        },
        {
          id: '123c4567-89ab-cdef-1234-567890123459',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '123456789',
        },
      ];

      prisma.user.findMany.mockResolvedValue(mockUsers);

      const result = await repository.getUsers(paginationParams);

      expect(result).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
        where: {
          OR: [
            {
              name: {
                contains: '',
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: '',
                mode: 'insensitive',
              },
            },
          ],
        },
        skip: 0,
        take: 10,
        orderBy: {
          name: 'asc',
        },
      });
    });
    it('should return null if there is an error', async () => {
      const paginationParams: IPaginationParams<TValidsUserTypes> = {
        limit: 10,
        skip: 0,
        order: 'asc',
        queryValue: '',
        filterType: null,
        fieldOrder: 'name',
      };

      prisma.user.findMany.mockRejectedValue(null);

      const result = await repository.getUsers(paginationParams);

      expect(result).toBe(null);
    });
  });

  describe('getAccountData', () => {
    it('should return user account data', async () => {
      const accountId = '123c4567-89ab-cdef-1234-567890123456';
      const userId = '123c4567-89ab-cdef-1234-567890123457';
      const mockUser: IGetAccountDataResult = {
        id: accountId,
        access_token: 'access-token',
        providerAccountId: 'provider-account-id',
        scope: 'scope',
        type: 'type',
      };

      prisma.account.findUnique.mockResolvedValue(mockUser);

      const result = await repository.getAccountData(userId);

      expect(result).toEqual(mockUser);
      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        select: {
          id: true,
          access_token: true,
          providerAccountId: true,
          type: true,
          scope: true,
        },
        where: {
          userId,
        },
      });
    });
    it('should return null if there is an error', async () => {
      const userId = '123c4567-89ab-cdef-1234-567890123456';

      prisma.account.findUnique.mockRejectedValue(null);

      const result = await repository.getAccountData(userId);

      expect(result).toBe(null);
    });
  });

  describe('getAccountDataByProviderId', () => {
    it('should return user account data', async () => {
      const providerId = '123c4567-89ab-cdef-1234-567890123456';
      const userId = '123c4567-89ab-cdef-1234-567890123457';
      const mockUser: IGetAccountDataByProviderIdResult = {
        id: '123c4567-89ab-cdef-1234-567890123458',
        userId,
      };

      prisma.account.findUnique.mockResolvedValue(mockUser);

      const result = await repository.getAccountDataByProviderId(providerId);

      expect(result).toEqual(mockUser);
      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        select: {
          id: true,
          userId: true,
        },
        where: {
          providerAccountId: providerId,
        },
      });
    });
    it('should return null if there is an error', async () => {
      const providerId = '123c4567-89ab-cdef-1234-567890123456';

      prisma.account.findUnique.mockRejectedValue(null);

      const result = await repository.getAccountDataByProviderId(providerId);

      expect(result).toBe(null);
    });
  });
});
