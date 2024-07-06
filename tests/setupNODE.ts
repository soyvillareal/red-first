import { PrismaClient } from '@prisma/client';

import { IMockPrismaClient } from './tests.types';

jest.mock('@/lib/env');
jest.mock('@prisma/client', () => {
  const mPrismaClient: IMockPrismaClient = {
    user: {
      update: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      findMany: jest.fn(),
    },
    account: {
      findUnique: jest.fn(),
    },
    movements: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

// Export the mocked Prisma Client for use in tests
export const prisma = new PrismaClient() as jest.Mocked<PrismaClient> &
  IMockPrismaClient;
