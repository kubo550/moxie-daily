import {useSearchParams} from "react-router-dom";
import {QuoteProviderProps} from "../components/QuoteProvider.tsx";
import {ButtonsContainer} from "../components/ShopRef.tsx";
import {useCallback, useLayoutEffect, useRef, useState} from "react";
import {getQuoteById, getQuotesByType, Quote} from "../infrastructure/qoutes.ts";
import {Button} from "@/components/ui/button.tsx";
import QuotesModal from "@/components/QuotesModal.tsx";
import {QuoteType} from "@/types/QuoteType.ts";
import {getFromLocalStorage, setToLocalStorage} from "@/utils/localStorage.ts";
import {randomElement} from "@/utils/functions.ts";
import {QuotesModalContent} from "@/components/QuotesModalContent.tsx";

const quoteTypesNameLocalStorageKey = "quoteTypes"

export const DailyQuotePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [quotesModalOpen, setQuotesModalOpen] = useState(false)
    const [selectedTypes, setSelectedTypes] = useState<QuoteType[]>(getFromLocalStorage<QuoteType[]>(quoteTypesNameLocalStorageKey) || [QuoteType.devotional]);

    const fetchQuoteById = async (id: string) => {
        const quote = await getQuoteById(id)

        setCurrentQuote(quote || fallbackQuote);
    };

    useLayoutEffect(() => {
        (async () => {
            const quotesArr = await getQuotesByType(selectedTypes);
            setQuotes(quotesArr)

            if (searchParams.has('q')) {
                const id = searchParams.get('q');

                if (id) {
                    await fetchQuoteById(id)
                }
            } else {
                getRandomQuote(quotesArr)
            }
        })();
    }, [selectedTypes, searchParams]);

    const ref = useRef<HTMLDivElement | null>(null);

    const handleQuoteTypeSelect = useCallback((type: QuoteType) => {
        const prevSavedQuoteTypes = getFromLocalStorage<QuoteType[]>(quoteTypesNameLocalStorageKey) || []
        const filteredQuoteTypes = prevSavedQuoteTypes.filter((quoteType) => quoteType !== type)
        const newFilteredQuoteTypes = [...filteredQuoteTypes, type]

        setToLocalStorage(quoteTypesNameLocalStorageKey, newFilteredQuoteTypes)
        setSelectedTypes(newFilteredQuoteTypes)
    }, [])

    const handleQuoteTypeRemove = useCallback((type: QuoteType) => {
        const prevSavedQuoteTypes = getFromLocalStorage<QuoteType[]>(quoteTypesNameLocalStorageKey) || []
        const filteredQuoteTypes = prevSavedQuoteTypes.filter((quoteType) => quoteType !== type)

        setToLocalStorage(quoteTypesNameLocalStorageKey, filteredQuoteTypes)
        setSelectedTypes(filteredQuoteTypes)
    }, [])

    const getRandomQuote = useCallback((quotesArr: Quote[]) => {
        const randomQuote = randomElement(quotesArr);
        setCurrentQuote(randomQuote || fallbackQuote);

        setSearchParams({q: randomQuote?.id || ''})
    }, [setSearchParams])

    return (
        <div ref={ref}>
            <QuoteProviderProps quote={currentQuote} />

            <Button onClick={() => setQuotesModalOpen(true)} className='capitalize absolute bottom-[200px] md:bottom-[180px]'> Select your inspiration </Button>

            <QuotesModal open={quotesModalOpen} onOpenChange={setQuotesModalOpen}>
                <QuotesModalContent handleQuoteTypeRemove={handleQuoteTypeRemove} handleQuoteTypeSelect={handleQuoteTypeSelect} selectedTypes={selectedTypes} />
            </QuotesModal>

            <ButtonsContainer onNextQuote={() => getRandomQuote(quotes)}/>
        </div>
    );
}

const fallbackQuote: Quote = {id: '2137', type: QuoteType.affirmation, quote: 'Remember to share your quote with others!'};
