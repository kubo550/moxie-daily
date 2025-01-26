import {useParams, useSearchParams} from "react-router-dom";
import {QuoteProviderProps} from "../components/QuoteProvider.tsx";
import {ButtonsContainer} from "../components/ShopRef.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {add, isAfter} from "date-fns";
import {getQuoteById, getRandomQuote} from "../infrastructure/qoutes.ts";

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
    const ref = useRef<HTMLDivElement>(null!);

    const fetchRandomQuote = useCallback( async ()  => {
        setQuote('')
        const q = await getRandomQuote(type)
        setSearchParams({q: q.id})
        setQuote(q.quote);
        saveToCache(type, q.quote);
    }, [type]);

    const fetchQuoteById = useCallback(async (id: string) => {
        setQuote('')
        const q = await getQuoteById(id)
        setQuote(q.quote);
        saveToCache(type, q.quote);
    }, []);


    useEffect(() => {
        if (searchParams.has('q')) {
            const id = searchParams.get('q');
            fetchQuoteById(id);
        }
        const quoteFromLocalStore = loadFromCache(type);

        if (quoteFromLocalStore && isAfter(new Date(quoteFromLocalStore.expirationDate), new Date())) {
            setQuote(quoteFromLocalStore.quote);
        } else {
            fetchRandomQuote();
        }
    }, [type, fetchRandomQuote, fetchQuoteById, searchParams]);


    return (
        <div ref={ref}>
            <QuoteProviderProps quote={quote} />

            <ButtonsContainer onNextQuote={fetchRandomQuote} />
        </div>
    );
}