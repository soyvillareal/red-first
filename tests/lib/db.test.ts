import { PrismaClient } from '@prisma/client';
import { prisma } from '@/tests/setupNODE';

describe('Prisma Client Singleton', () => {
  it('should create a new instance if none exists', () => {
    const instance = new PrismaClient();
    expect(instance).toBe(prisma);
  });

  it('should reuse the instance if it exists', () => {
    const firstInstance = prisma;
    const secondInstance = new PrismaClient();
    expect(firstInstance).toBe(secondInstance);
  });
});
