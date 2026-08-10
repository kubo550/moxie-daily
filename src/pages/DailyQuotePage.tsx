import { useSearchParams } from 'react-router-dom';
import { QuoteProviderProps } from '../components/QuoteProvider.tsx';
import { ShareButton } from '../components/ShopRef.tsx';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  getQuoteById,
  getQuotesByType,
  Quote,
  getAvailableTypes,
} from '../infrastructure/qoutes.ts';
import { Button } from '@/components/ui/button.tsx';
import { QuoteType } from '@/types/QuoteType.ts';
import { randomElement } from '@/utils/functions.ts';
import { ChatCarousel } from '@/components/ChatCarousel.tsx';
import { QuickSupportCarousel } from '@/components/QuickSupportCarousel.tsx';
import { DailyChallengesCarousel } from '@/components/DailyChallengesCarousel.tsx';
import { ChevronRight } from 'lucide-react';

export const DailyQuotePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const selectedTypes = getAvailableTypes();

  const fetchQuoteById = async (id: string) => {
    const quote = await getQuoteById(id);

    setCurrentQuote(quote || fallbackQuote);
  };

  useLayoutEffect(() => {
    (async () => {
      const quotesArr = await getQuotesByType(selectedTypes);
      setQuotes(quotesArr);

      if (searchParams.has('q')) {
        const id = searchParams.get('q');

        if (id) {
          await fetchQuoteById(id);
        }
      } else {
        getRandomQuote(quotesArr);
      }
    })();
  }, [searchParams]);

  const ref = useRef<HTMLDivElement | null>(null);

  const getRandomQuote = useCallback(
    (quotesArr: Quote[]) => {
      const randomQuote = randomElement(quotesArr);
      setCurrentQuote(randomQuote || fallbackQuote);

      setSearchParams({ q: randomQuote?.id || '' });
    },
    [setSearchParams]
  );

  const getNextQuote = useCallback(() => {
    getRandomQuote(quotes);
  }, [quotes, getRandomQuote]);

  return (
    <div ref={ref} className="min-h-full">
      {/* Top section - Quote - half of the content area (viewport minus header/footer) */}
      <section
        className="flex flex-col items-center justify-center px-4 relative"
        style={{ height: 'calc(50dvh - 60px)' }}
      >
        {/* pb leaves room for the absolutely positioned Next button below */}
        <div
          className="flex-1 flex items-center justify-center w-full pb-16"
          aria-live="polite"
        >
          <QuoteProviderProps quote={currentQuote} />
        </div>

        {/* Share button - visible on mobile */}
        <div className="absolute top-4 right-4">
          <ShareButton />
        </div>

        {/* Labelled instead of a bare arrow, so it reads as "there are more quotes" */}
        <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center px-4">
          <Button
            onClick={getNextQuote}
            variant="ghost"
            className="h-11 gap-2 rounded-full border border-[#8B8DFF]/40 bg-[#8B8DFF]/10 px-6 text-sm font-semibold text-[#8B8DFF] backdrop-blur-sm select-none hover:bg-[#8B8DFF]/20 hover:text-[#8B8DFF] active:scale-95"
          >
            Next Quote
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
      <section
        className="py-6 pb-20 w-full max-w-full space-y-8"
        style={{ minHeight: 'calc(50dvh - 60px)' }}
      >
        <ChatCarousel />
        <QuickSupportCarousel />
        <DailyChallengesCarousel />
      </section>
    </div>
  );
};

const fallbackQuote: Quote = {
  id: '2137',
  type: QuoteType.affirmation,
  quote: 'Remember to share your quote with others!',
};
