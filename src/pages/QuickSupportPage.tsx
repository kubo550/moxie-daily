import HeaderSection from '@/components/Common/HeaderSection';
import { BreathingnCircle } from '@/components/QuickSupportBreathing/BreathingCirlce';
import { ButtonSection } from '@/components/QuickSupportBreathing/ButtonSection';
import FooterSection from '@/components/QuickSupportBreathing/FooterSection';
import QuoteSection from '@/components/QuickSupportBreathing/QuoteSection';
import { QuoteType } from '@/types/QuoteType.ts';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const BREATHING_ANIMATION_DURATION = 4;

export const QuickSupportPage = () => {
  const { type } = useParams<{ type: QuoteType }>();
  const [isBreathing, setIsBreathing] = useState(false);
  const startBreathing = () => {
    setIsBreathing(true);
    setTimeout(
      () => setIsBreathing(false),
      BREATHING_ANIMATION_DURATION * 3 * 1000
    );
  };

  return (
    <div className="min-h-full flex flex-col p-2 pb-25 gap-4 items-center justify-between">
      <HeaderSection
        title="Quick Support"
        desc="Take a moment. You're in the right place."
      />

      <BreathingnCircle
        isBreathing={isBreathing}
        duration={BREATHING_ANIMATION_DURATION}
      />

      <QuoteSection type={type} />

      <ButtonSection
        className="w-full gap-4 flex flex-col max-w-md"
        type={type}
        isBreathing={isBreathing}
        startBreathing={startBreathing}
      />

      <FooterSection />
    </div>
  );
};
