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
import QuotesModal from '@/components/QuotesModal.tsx';
import { QuoteType } from '@/types/QuoteType.ts';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '@/utils/localStorage.ts';
import { randomElement } from '@/utils/functions.ts';
import { QuotesModalContent } from '@/components/QuotesModalContent.tsx';
import { ChatCarousel } from '@/components/ChatCarousel.tsx';
import { QuickSupportCarousel } from '@/components/QuickSupportCarousel.tsx';
import { DailyChallengesCarousel } from '@/components/DailyChallengesCarousel.tsx';
import { ChevronRight } from 'lucide-react';

const quoteTypesNameLocalStorageKey = 'quoteTypes';

export const DailyQuotePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesModalOpen, setQuotesModalOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<QuoteType[]>(
    getFromLocalStorage<QuoteType[]>(quoteTypesNameLocalStorageKey) ||
      getAvailableTypes()
  );

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
  }, [selectedTypes, searchParams]);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleQuoteTypeSelect = useCallback((type: QuoteType) => {
    const prevSavedQuoteTypes =
      getFromLocalStorage<QuoteType[]>(quoteTypesNameLocalStorageKey) || [];
    const filteredQuoteTypes = prevSavedQuoteTypes.filter(
      (quoteType) => quoteType !== type
    );
    const newFilteredQuoteTypes = [...filteredQuoteTypes, type];

    setToLocalStorage(quoteTypesNameLocalStorageKey, newFilteredQuoteTypes);
    setSelectedTypes(newFilteredQuoteTypes);
  }, []);

  const handleQuoteTypeRemove = useCallback((type: QuoteType) => {
    const prevSavedQuoteTypes =
      getFromLocalStorage<QuoteType[]>(quoteTypesNameLocalStorageKey) || [];
    const filteredQuoteTypes = prevSavedQuoteTypes.filter(
      (quoteType) => quoteType !== type
    );

    setToLocalStorage(quoteTypesNameLocalStorageKey, filteredQuoteTypes);
    setSelectedTypes(filteredQuoteTypes);
  }, []);

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
    <div ref={ref} className="h-screen overflow-y-auto overflow-x-hidden">
      {/* Top section - Quote - calc accounts for navbar (60px) */}
      <section
        className="flex flex-col items-center justify-center px-4 relative"
        style={{ height: 'calc(50vh - 30px)' }}
      >
        <div className="flex-1 flex items-center justify-center w-full">
          <QuoteProviderProps quote={currentQuote} />
        </div>

        {/* Share button - visible on mobile */}
        <div className="absolute top-16 right-4">
          <ShareButton />
        </div>

        {/* Navigation buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 px-4">
          <Button
            onClick={() => setQuotesModalOpen(true)}
            className="capitalize bg-transparent hover:bg-transparent text-[#8B8DFF] border-none text-sm px-3 py-2 h-9 font-medium flex items-center gap-1.5"
          >
            See more
          </Button>

          <Button
            onClick={getNextQuote}
            variant="ghost"
            size="icon"
            className="text-[#8B8DFF] hover:bg-white/10 rounded-full h-9 w-1"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      <section
        className="py-6 pb-20 w-full max-w-full space-y-8"
        style={{ minHeight: 'calc(50vh - 30px)' }}
      >
        <ChatCarousel />
        <QuickSupportCarousel />
        <DailyChallengesCarousel />
      </section>

      <QuotesModal open={quotesModalOpen} onOpenChange={setQuotesModalOpen}>
        <QuotesModalContent
          handleQuoteTypeRemove={handleQuoteTypeRemove}
          handleQuoteTypeSelect={handleQuoteTypeSelect}
          selectedTypes={selectedTypes}
        />
      </QuotesModal>
    </div>
  );
};

const fallbackQuote: Quote = {
  id: '2137',
  type: QuoteType.affirmation,
  quote: 'Remember to share your quote with others!',
};
