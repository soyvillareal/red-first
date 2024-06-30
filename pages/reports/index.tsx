import { ContextLayout } from '@/components/custom/layout';
import { Button } from '@/components/custom/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserNav } from '@/components/atoms/UserNav';
import { RecentSales } from './components/RecentSales';
import { Overview } from './components/Overview';
import DashboardLayout from '@/components/atoms/DashboardLayout';
import Dollar2Icon from '@/components/icons/Dollar2Icon';
import { GetStaticProps } from 'next';
import { loadTranslations } from '@/lib/i18n';

export default function Dashboard() {
  return (
    <ContextLayout>
      <DashboardLayout>
        {/* ===== Top Heading ===== */}
        <ContextLayout.Header>
          <div className='ml-auto flex items-center space-x-4'>
            <UserNav />
          </div>
        </ContextLayout.Header>

        {/* ===== Main ===== */}
        <ContextLayout.Body>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
            <div className='flex items-center space-x-2'>
              <Button>Download</Button>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-secondary-foreground'>
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>

              <div>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-secondary-foreground text-sm font-medium'>
                      Total Revenue
                    </CardTitle>
                    <Dollar2Icon className='h-4 w-4 text-secondary-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-secondary-foreground text-2xl font-bold'>
                      $45,231.89
                    </div>
                    <p className='text-secondary-foreground text-xs text-muted-foreground'>
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-secondary-foreground'>
                      Recent Sales
                    </CardTitle>
                    <CardDescription className='text-secondary-foreground'>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ContextLayout.Body>
      </DashboardLayout>
    </ContextLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return loadTranslations(context.locale);
};
