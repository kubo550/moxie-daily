import {useSearchParams} from "react-router-dom";
import {QuoteProviderProps} from "../components/QuoteProvider.tsx";
import {ButtonsContainer} from "../components/ShopRef.tsx";
import {useCallback, useRef, useState, useLayoutEffect} from "react";
import {getAvailableTypes, getQuoteById, getQuotesByType, Quote} from "../infrastructure/qoutes.ts";
import {Button} from "@/components/ui/button.tsx";
import QuotesModal from "@/components/QuotesModal.tsx";
import {QuoteType} from "@/types/QuoteType.ts";
import {getQuoteTypeName} from "@/utils/quotes.ts";
import {getFromLocalStorage, setToLocalStorage} from "@/utils/localStorage.ts";
import {randomElement} from "@/utils/functions.ts";

const quoteTypesNameLocalStorageKey = "quoteTypes"

export const DailyQuote = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [quoteText, setQuoteText] = useState<Quote['quote']>('');
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [quotesModalOpen, setQuotesModalOpen] = useState(false)
    const [selectedTypes, setSelectedTypes] = useState<QuoteType[]>(getFromLocalStorage<QuoteType[]>(quoteTypesNameLocalStorageKey) || []);
    const availableTypes = getAvailableTypes();

    const fetchQuoteById = async (id: string) => {
        const quote = await getQuoteById(id)

        setQuoteText(quote.quote || 'Remember to share your quote with others!');
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
        setQuoteText(randomQuote.quote  || 'Remember to share your quote with others!');

        setSearchParams({q: randomQuote?.id || ''})
    }, [setSearchParams])

    return (
        <div ref={ref}>
            <QuoteProviderProps quote={quoteText} />

            <Button onClick={() => setQuotesModalOpen(true)}>Hello</Button>

            <QuotesModal open={quotesModalOpen} onOpenChange={setQuotesModalOpen}>
                <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(4,minmax(100px,1fr))]'>
                    {availableTypes.map(type => {
                        const isSelected = selectedTypes.find(selectedType => selectedType === type)

                        return (
                            <Button key={type} variant={isSelected ? 'secondary' : 'ghost'} onClick={() => isSelected ? handleQuoteTypeRemove(type) : handleQuoteTypeSelect(type)}>
                                {getQuoteTypeName(type)}
                            </Button>
                        )
                    })}
                </div>
            </QuotesModal>

            <ButtonsContainer onNextQuote={() => getRandomQuote(quotes)} />
        </div>
    );
}