export type IMockPrismaClient = {
  user: {
    update: jest.Mock;
    findUnique: jest.Mock;
    count: jest.Mock;
    findMany: jest.Mock;
  };
  account: {
    findUnique: jest.Mock;
  };
  movements: {
    create: jest.Mock;
    findMany: jest.Mock;
    count: jest.Mock;
  };
};
