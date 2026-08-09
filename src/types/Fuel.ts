import { QuoteType } from '@/types/QuoteType.ts';

/**
 * Where the bytes come from. `file` is a plain progressive-download MP4 served
 * from `public/` - what we use today. `hls` is the shape a streaming host
 * (Cloudflare Stream, Bunny, Mux) hands back, so plugging one in later is a
 * provider swap rather than a change to the feed.
 */
export type FuelSource =
  | { kind: 'file'; url: string }
  | { kind: 'hls'; url: string; playbackId?: string };

export type FuelVideo = {
  id: string;
  source: FuelSource;
  title?: string;
  caption?: string;
  type?: QuoteType;
  posterUrl?: string;
  durationSec?: number;
};

export type FuelPage = {
  items: FuelVideo[];
  nextCursor: string | null;
};

/**
 * The seam a streaming host plugs into. `cursor` is opaque to callers: the
 * local provider uses an index, a remote one would use whatever token the
 * host returns.
 */
export interface FuelProvider {
  list(cursor?: string | null, limit?: number): Promise<FuelPage>;
}

/** How loaded an item is, by distance from the active item in the feed. */
export type FuelPlaybackState = 'active' | 'warm' | 'idle';
