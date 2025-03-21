import {db} from "./firebase.ts";
import {collection, getDocs} from "firebase/firestore";
import {randomElement} from "../utils/functions.ts";
import {QuoteType} from "@/types/QouteType.ts";

const QUOTES_COLLECTION_NAME = 'quotes';

export type Quote = { type: QuoteType, quote: string, id: string };

async function fetchQuotesFromDB() {
    const querySnapshot = await getDocs(collection(db, QUOTES_COLLECTION_NAME));
    return querySnapshot.docs.map(doc => doc.data()) as Quote[];
}

export const getRandomQuote = async (type: string): Promise<Quote> => {
    try {
        const quotes = await fetchQuotesFromDB();
        const currentTypeQuotes = quotes.filter(quote => quote.type === type);
        return randomElement(currentTypeQuotes) || randomElement(quotes);
    } catch (error) {
        console.log('Error getting quote:', error as unknown);
        return randomElement(fallbackQuotes);
    }
}

export const getQuoteById = async (id: string): Promise<Quote> => {
    try {
        const querySnapshot = await getDocs(collection(db, QUOTES_COLLECTION_NAME));
        const quotes = querySnapshot.docs.map(doc => doc.data()) as Quote[];

        return quotes.find(quote => quote.id === id) || randomElement(fallbackQuotes);
    } catch (error) {
        console.log('Error getting quote:', error as unknown);
        return randomElement(fallbackQuotes);
    }
}

export const getQuotesByType = async (types: QuoteType[] = []): Promise<Quote[]> => {
    try {
        const quotes = await fetchQuotesFromDB();

        if (!types.length) {
            return quotes;
        }

        return quotes.filter(quote => types.includes(quote.type));
    } catch (error) {
        console.log('Error getting quote:', error as unknown);
        return fallbackQuotes;
    }

}
export const getAvailableTypes = () => {
    return [
        QuoteType.affirmation,
        QuoteType.anxiety_relief,
        QuoteType.attract_love,
        QuoteType.attract_money,
        QuoteType.breakups,
        QuoteType.build_confidence,
        QuoteType.devotional,
        QuoteType.discipline,
        QuoteType.drink_less,
        QuoteType.focus,
        QuoteType.hard_times,
        QuoteType.law_of_attraction,
        QuoteType.lose_weight,
        QuoteType.love_yourself,
        QuoteType.marriage,
        QuoteType.meditation,
        QuoteType.mental_health,
        QuoteType.motivation,
        QuoteType.personal_growth,
        QuoteType.phone_addiction,
        QuoteType.positive_mindset,
        QuoteType.power_life,
        QuoteType.relationships,
        QuoteType.success_mindset,
        QuoteType.toxic_relationships
    ]
}


const fallbackQuotes = [
    {id: '1', type: QuoteType.affirmation, quote: "I am worthy of all the good things that come my way"},
    {id: '2', type: QuoteType.affirmation, quote: "Every day, in every way, I am becoming better and better"},
    {id: '3', type: QuoteType.affirmation, quote: "I choose to focus on what I can control and let go of what I can’t"},
    {id: '4', type: QuoteType.affirmation, quote: "Happiness is a choice, and today I choose to be happy"},
    {id: '5', type: QuoteType.affirmation, quote: "I am resilient, strong, and brave in the face of challenges"},
    {id: '6', type: QuoteType.affirmation, quote: "I am enough, just as I am, and I deserve love and respect"},
    {id: '7', type: QuoteType.affirmation, quote: "I have the power to create the life I desire"},
    {id: '8', type: QuoteType.affirmation, quote: "My thoughts shape my reality, and I choose to think positively"},
    {id: '9', type: QuoteType.affirmation, quote: "I am grateful for the abundance that flows into my life"},
    {id: '10', type: QuoteType.affirmation, quote: "I trust myself to make the right decisions for my growth and happiness"}
];
