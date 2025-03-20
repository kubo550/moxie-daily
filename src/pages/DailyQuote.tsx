import {useParams, useSearchParams} from "react-router-dom";
import {QuoteProviderProps} from "../components/QuoteProvider.tsx";
import {ButtonsContainer} from "../components/ShopRef.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {add, isAfter} from "date-fns";
import {getAvailableTypes, getQuoteById, getRandomQuote} from "../infrastructure/qoutes.ts";
import {Button} from "@/components/ui/button.tsx";
import QuotesModal from "@/components/QuotesModal.tsx";
import {QuoteType} from "@/types/QouteType.ts";
import {getQuoteTypeName} from "@/utils/quotes.ts";
import {getFromLocalStorage, setToLocalStorage} from "@/utils/localStorage.ts";

function loadFromCache(quoteType: string) {
    return JSON.parse(localStorage.getItem(`quote:${quoteType}`) || '{}');
}

function saveToCache(quoteType: string, quote: unknown) {
    const expirationDate = add(new Date(), {days: 1});
    localStorage.setItem(`quote:${quoteType}`, JSON.stringify({quote, expirationDate}));
}

export const DailyQuote = () => {
    const { type = 'affirmation' } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [quote, setQuote] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<QuoteType[]>(getFromLocalStorage<QuoteType[]>("quoteTypes") || []);
    const availableTypes = getAvailableTypes();

    const ref = useRef<HTMLDivElement | null>(null);

    const [quotesModalOpen, setQuotesModalOpen] = useState(false)

    const fetchRandomQuote = useCallback( async ()  => {
        setQuote('')
        const q = await getRandomQuote(type)
        setSearchParams({q: q.id})
        setQuote(q.quote);
        saveToCache(type, q.quote);
    }, [type, setSearchParams]);

    const fetchQuoteById = useCallback(async (id: string) => {
        setQuote('')
        const q = await getQuoteById(id)
        setQuote(q.quote);
        saveToCache(type, q.quote);
    }, [type]);


    useEffect(() => {
        if (searchParams.has('q')) {
            const id = searchParams.get('q');

            if (id) {
                fetchQuoteById(id)
            } else {
                fetchRandomQuote()
            }
        }
        const quoteFromLocalStore = loadFromCache(type);

        if (quoteFromLocalStore && isAfter(new Date(quoteFromLocalStore.expirationDate), new Date())) {
            setQuote(quoteFromLocalStore.quote);
        } else {
            fetchRandomQuote();
        }
    }, [type, fetchRandomQuote, fetchQuoteById, searchParams]);

    const handleQuoteTypeSelect = useCallback((type: QuoteType) => {
        const prevSavedQuoteTypes = getFromLocalStorage<QuoteType[]>("quoteTypes") || []
        const filteredQuoteTypes = prevSavedQuoteTypes.filter((quoteType) => quoteType !== type)
        const newFilteredQuoteTypes = [...filteredQuoteTypes, type]

        setToLocalStorage("quoteTypes", newFilteredQuoteTypes)
        setSelectedTypes(newFilteredQuoteTypes)
    }, [])

    const handleQuoteTypeRemove = useCallback((type: QuoteType) => {
        const prevSavedQuoteTypes = getFromLocalStorage<QuoteType[]>("quoteTypes") || []
        const filteredQuoteTypes = prevSavedQuoteTypes.filter((quoteType) => quoteType !== type)
        const newFilteredQuoteTypes = [...filteredQuoteTypes]

        setToLocalStorage("quoteTypes", newFilteredQuoteTypes)
        setSelectedTypes(newFilteredQuoteTypes)
    }, [])


    return (
        <div ref={ref}>
            <QuoteProviderProps quote={quote} />

            <Button onClick={() => setQuotesModalOpen(true)}>Hello</Button>

            <QuotesModal open={quotesModalOpen} onOpenChange={setQuotesModalOpen}>
                <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(4,minmax(100px,1fr))]'>
                    {availableTypes.map(type => {
                        const isSelected = selectedTypes.find(selectedType => selectedType === type)

                        return (
                            <div>
                                <Button key={type} variant={isSelected ? 'secondary' : 'ghost'} onClick={() => isSelected ? handleQuoteTypeRemove(type) : handleQuoteTypeSelect(type)}>
                                    {getQuoteTypeName(type)}
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </QuotesModal>

            <ButtonsContainer onNextQuote={fetchRandomQuote} />
        </div>
    );
}