import { ReportsRepository } from '@/server/dataAccess/reports';
import { prisma } from '@/tests/setup';
import { IGetRecentMovementsRepository } from '@/types/dataAccess/reports';

const repository = new ReportsRepository();

describe('ReportsRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the count of movements within a date range', async () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-31');
    prisma.movements.count.mockResolvedValue(5);

    const result = await repository.findMovementsPerRange(startDate, endDate);
    expect(result).toBe(5);
    expect(prisma.movements.count).toHaveBeenCalledWith({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  });

  it('should return movements for the chart within a date range', async () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-31');
    const mockMovements = [
      { amount: 100, concept: 'income', date: new Date('2023-01-15') },
    ];
    prisma.movements.findMany.mockResolvedValue(mockMovements);

    const result = await repository.getChartMovements(startDate, endDate);
    expect(result).toEqual(mockMovements);
    expect(prisma.movements.findMany).toHaveBeenCalledWith({
      select: {
        amount: true,
        concept: true,
        date: true,
      },
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  });

  it('should return recent movements', async () => {
    const mockMovements: IGetRecentMovementsRepository[] = [
      {
        id: expect.any(String),
        userId: expect.any(String),
        amount: expect.any(String),
        concept: 'income',
      },
    ];
    prisma.movements.findMany.mockResolvedValue(mockMovements);

    const result = await repository.getRecentMovements();
    expect(result).toEqual(mockMovements);
    expect(prisma.movements.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        userId: true,
        amount: true,
        concept: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
  });

  it('should return the count of movements by range', async () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-31');
    prisma.movements.count.mockResolvedValue(5);

    const result = await repository.countMovementByRange(startDate, endDate);
    expect(result).toBe(5);
    expect(prisma.movements.count).toHaveBeenCalledWith({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  });
});
