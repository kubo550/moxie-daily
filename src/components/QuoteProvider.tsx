import {FC, useEffect, useState} from "react";
import {Quote} from "./Quote.tsx";
import {getQuote} from "../infrastructure/qoutes.ts";
import { isAfter , add} from 'date-fns'

interface QuoteProviderProps {
 quoteType: string
}


function loadFromCache(quoteType: string) {
    return JSON.parse(localStorage.getItem(`quote:${quoteType}`) || '{}');

}


function saveToCache(quoteType: string, quote: unknown) {
    const expirationDate = add(new Date(), {days: 1});
    localStorage.setItem(`quote:${quoteType}`, JSON.stringify({quote, expirationDate}));
}

export const QuoteProviderProps: FC<QuoteProviderProps> = ({quoteType}) => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const quoteFromLocalStore = loadFromCache(quoteType);

        if (quoteFromLocalStore && isAfter(new Date(quoteFromLocalStore.expirationDate), new Date())) {
            setQuote(quoteFromLocalStore.quote);
        } else {
            getQuote(quoteType).then(q => {
                setQuote(q);
                saveToCache(quoteType, q);
            });
        }
    }, [quoteType]);


    return (
        <>
            {!!quote && <Quote text={quote}/>}
        </>
    );
}