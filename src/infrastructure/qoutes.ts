import {db} from "./firebase.ts";
import {collection, getDocs} from "firebase/firestore";
import {randomElement} from "../utils/functions.ts";

const QUOTES_COLLECTION_NAME = 'quotes';

type Quote = { type: string, quote: string, id: string };

export const getRandomQuote = async (type: string): Promise<Quote> => {
    try {
        const querySnapshot = await getDocs(collection(db, QUOTES_COLLECTION_NAME));
        const quotes = querySnapshot.docs.map(doc => doc.data()) as Quote[];
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


const fallbackQuotes = [
    {id: '1', type: 'affirmation', quote: "I am worthy of all the good things that come my way"},
    {id: '2', type: 'affirmation', quote: "Every day, in every way, I am becoming better and better"},
    {id: '3', type: 'affirmation', quote: "I choose to focus on what I can control and let go of what I can’t"},
    {id: '4', type: 'affirmation', quote: "Happiness is a choice, and today I choose to be happy"},
    {id: '5', type: 'affirmation', quote: "I am resilient, strong, and brave in the face of challenges"},
    {id: '6', type: 'affirmation', quote: "I am enough, just as I am, and I deserve love and respect"},
    {id: '7', type: 'affirmation', quote: "I have the power to create the life I desire"},
    {id: '8', type: 'affirmation', quote: "My thoughts shape my reality, and I choose to think positively"},
    {id: '9', type: 'affirmation', quote: "I am grateful for the abundance that flows into my life"},
    {id: '10', type: 'affirmation', quote: "I trust myself to make the right decisions for my growth and happiness"}
];