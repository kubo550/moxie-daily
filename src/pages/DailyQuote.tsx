import {useParams} from "react-router-dom";
import {QuoteProviderProps} from "../components/QuoteProvider.tsx";
import {ShopRef} from "../components/ShopRef.tsx";

export const DailyQuote = () => {
    const { type = 'affirmation' } = useParams();

    return (
        <>
            <QuoteProviderProps quoteType={type} />
            <ShopRef />
        </>
    );
}