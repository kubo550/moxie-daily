import HeaderSection from '@/components/Common/HeaderSection';
import CoachButton from '@/components/RecoverySupport/CoachButton';
import HelpSection from '@/components/RecoverySupport/HelpSection';
import QuoteSection from '@/components/RecoverySupport/QuoteSection';
import SponsoredSection from '@/components/RecoverySupport/SponsoredSection';

export const RecoverySupportPage = () => {
  return (
    <div className="min-h-full flex flex-1 min-w-full justify-center p-2">
      <div className="max-w-2xl flex flex-col flex-1 gap-10 pb-20 pt-5">
        <HeaderSection
          title="Recovery Support"
          desc="One day at a time. Everything here is free and available right now."
        />
        <SponsoredSection />
        <HelpSection />
        <QuoteSection />
        <CoachButton />
      </div>
    </div>
  );
};
