import {useParams} from "react-router-dom";
import {QuoteProviderProps} from "../components/QuoteProvider.tsx";
import {ButtonsContainer} from "../components/ShopRef.tsx";
import {useEffect, useState} from "react";
import {add, isAfter} from "date-fns";
import {getQuote} from "../infrastructure/qoutes.ts";

function loadFromCache(quoteType: string) {
    return JSON.parse(localStorage.getItem(`quote:${quoteType}`) || '{}');
}

function saveToCache(quoteType: string, quote: unknown) {
    const expirationDate = add(new Date(), {days: 1});
    localStorage.setItem(`quote:${quoteType}`, JSON.stringify({quote, expirationDate}));
}

export const DailyQuote = () => {
    const { type = 'affirmation' } = useParams();

    const [quote, setQuote] = useState('');

    const fetchQuote = async ()  => {
        setQuote('')
        const q = await getQuote(type)
        setQuote(q);
        saveToCache(quote, q);
    }


    useEffect(() => {
        const quoteFromLocalStore = loadFromCache(quote);

        if (quoteFromLocalStore && isAfter(new Date(quoteFromLocalStore.expirationDate), new Date())) {
            setQuote(quoteFromLocalStore.quote);
        } else {
            fetchQuote();
        }
    }, [type]);


    return (
        <>
            <QuoteProviderProps quote={quote} />

            <ButtonsContainer onNextQuote={fetchQuote} />
        </>
    );
}