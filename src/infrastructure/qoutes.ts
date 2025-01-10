import {db} from "./firebase.ts";
import {collection, getDocs} from "firebase/firestore";
import {randomElement} from "../utils/functions.ts";

const QUOTES_COLLECTION_NAME = 'quotes';

type Quote = { type: string, quote: string };

export const getQuote = async (type: string): Promise<string> => {
    try {
        const querySnapshot = await getDocs(collection(db, QUOTES_COLLECTION_NAME));
        const quotes = querySnapshot.docs.map(doc => doc.data()) as Quote[];
        const currentTypeQuotes = quotes.filter(quote => quote.type === type);
        return randomElement(currentTypeQuotes)?.quote || randomElement(quotes).quote || '';
    } catch (error) {
        console.log('get quote - error', error.message);
        return randomElement(fallbackQuotes).quote;
    }
}


const fallbackQuotes = [
    {quote: "I am worthy of all the good things that come my way"},
    {quote: "Every day, in every way, I am becoming better and better"},
    {quote: "I choose to focus on what I can control and let go of what I can’t"},
    {quote: "Happiness is a choice, and today I choose to be happy"},
    {quote: "I am resilient, strong, and brave in the face of challenges"},
    {quote: "I am enough, just as I am, and I deserve love and respect"},
    {quote: "I have the power to create the life I desire"},
    {quote: "My thoughts shape my reality, and I choose to think positively"},
    {quote: "I am grateful for the abundance that flows into my life"},
    {quote: "I trust myself to make the right decisions for my growth and happiness"}
];