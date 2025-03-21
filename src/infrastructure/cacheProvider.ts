import {Quote} from "@/infrastructure/qoutes.ts";

export class CacheProvider {
    private static instance: CacheProvider;
    private quotes = new Map<string, Quote>();

    public static getInstance(): CacheProvider {
        if (!CacheProvider.instance) {
            CacheProvider.instance = new CacheProvider();
        }
        return CacheProvider.instance;
    }

    public getQuote(id: string) {
        return this.quotes.get(id);
    }

    public addQuote(quote: Quote) {
        this.quotes.set(quote.id, quote);
    }

    public addMultipleQuotes(quotes: Quote[]) {
        quotes.forEach(quote => this.addQuote(quote));
    }

}