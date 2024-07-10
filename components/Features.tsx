import { useTranslation } from 'next-i18next';

export const Features = () => {
  const { t } = useTranslation();

  return (
    <section id="features">
      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
        <div className="flex flex-col space-y-12 md:w-1/2">
          <h2 className="max-w-md text-4xl font-bold text-center md:text-left">
            {t('landing.whatsDifferentAbout')}
          </h2>
          <p className="max-w-sm text-center text-muted md:text-left">
            {t('landing.manageProvidesAllTheFunctionality')}
          </p>
        </div>
        <div className="flex flex-col space-y-8 md:w-1/2">
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-destructive md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-primary">
                  01
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  {t('landing.trackTheProgressOfAll')}
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                {t('landing.trackTheProgressOfAll')}
              </h3>
              <p className="text-muted">
                {t('landing.seeHowYourDailyAccountsFitInto')}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-destructive md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-primary">
                  02
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  {t('landing.advancedBuiltInReports')}
                </h3>
              </div>
            </div>
            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                {t('landing.advancedBuiltInReports')}
              </h3>
              <p className="text-muted">
                {t('landing.setEstimatesForYourAccounts')}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-destructive md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-primary">
                  03
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  {t('landing.everythingYouNeedOnePlace')}
                </h3>
              </div>
            </div>
            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                {t('landing.everythingYouNeedOnePlace')}
              </h3>
              <p className="text-muted">
                {t('landing.stopJumpingFromOneService')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
