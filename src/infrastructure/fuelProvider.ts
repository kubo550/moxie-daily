import { FuelPage, FuelProvider, FuelVideo } from '@/types/Fuel.ts';
import { FUEL_VIDEOS } from '@/config/fuelVideos.ts';
import { isContentAllowed, isFaithQuoteType } from '@/config/appConfig.ts';

/**
 * Clips carrying an explicitly religious type are gated the same way quote
 * types are - see `getVisibleCategories` in qoutes.ts. Untyped clips are
 * always allowed. Filtering happens before pagination so cursors stay stable.
 */
const getVisibleVideos = (): FuelVideo[] =>
  FUEL_VIDEOS.filter(
    (video) => !video.type || isContentAllowed(isFaithQuoteType(video.type))
  );

export class LocalFuelProvider implements FuelProvider {
  private static instance: LocalFuelProvider;

  private constructor() {}

  public static getInstance(): LocalFuelProvider {
    if (!LocalFuelProvider.instance) {
      LocalFuelProvider.instance = new LocalFuelProvider();
    }
    return LocalFuelProvider.instance;
  }

  public async list(cursor?: string | null, limit = 5): Promise<FuelPage> {
    const videos = getVisibleVideos();
    let startIndex = 0;

    if (cursor) {
      const parsed = Number.parseInt(cursor, 10);
      if (!Number.isNaN(parsed)) {
        startIndex = parsed;
      }
    }

    const end = startIndex + limit;
    const items = videos.slice(startIndex, end);
    const nextCursor = end < videos.length ? String(end) : null;

    return {
      items,
      nextCursor,
    };
  }
}

/**
 * Get the Fuel provider instance. This is the single place to change when
 * swapping in a streaming host provider.
 */
export const getFuelProvider = (): FuelProvider =>
  LocalFuelProvider.getInstance();
