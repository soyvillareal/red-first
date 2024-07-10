import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';

import { type IGetMovementsChart } from '@/types/graphql/resolvers';
import { responseCodes } from '@/server/utils';
import { ReportsRepository } from '@/server/dataAccess/reports';
import { checkIsAdmin, checkIsLogged } from '@/server/middleware';
import { checkGetMovementsChart } from '@/server/middleware/reports';
import { MovementsChart } from '@/server/graphql/schemas/reports';
import { UsersRepository } from '@/server/dataAccess/users';
import { movementsChartSSR } from '@/server/ssr/reports';

@Resolver()
export class ReportsResolvers {
  protected reportsRepository: ReportsRepository;
  protected usersRepository: UsersRepository;

  constructor() {
    this.reportsRepository = new ReportsRepository();
    this.usersRepository = new UsersRepository();
  }

  @Query(() => [MovementsChart], {
    name: 'getMovementsChart',
    description: 'Get movements report by month.',
  })
  @UseMiddleware(checkIsLogged, checkGetMovementsChart, checkIsAdmin)
  async getMovementsChart(
    @Arg('year', () => String, {
      nullable: true,
    })
    year?: string,
  ): Promise<IGetMovementsChart[]> {
    try {
      const movementsChart = await movementsChartSSR(year);

      return movementsChart;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(responseCodes.ERROR.SOMETHING_WENT_WRONG);
    }
  }
}
