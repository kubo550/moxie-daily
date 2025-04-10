import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/infrastructure/firebase.ts';
import { Quote } from '@/infrastructure/qoutes.ts';
import { CacheProvider } from '@/infrastructure/cacheProvider.ts';

export class QuoteDBProvider {
  private static instance: QuoteDBProvider;
  private QUOTES_COLLECTION_NAME = 'quotes';

  private constructor() {}

  public static getInstance(): QuoteDBProvider {
    if (!QuoteDBProvider.instance) {
      QuoteDBProvider.instance = new QuoteDBProvider();
    }
    return QuoteDBProvider.instance;
  }

  public async fetchQuotesFromDB(): Promise<Quote[]> {
    const querySnapshot = await getDocs(
      collection(db, this.QUOTES_COLLECTION_NAME)
    );

    const quotes = querySnapshot.docs.map((doc) => doc.data()) as Quote[];

    if (quotes.length) {
      console.log('quotes - fetched from DB', { count: quotes.length });
      CacheProvider.getInstance().addMultipleQuotes(quotes);
    }
    return quotes;
  }
}
