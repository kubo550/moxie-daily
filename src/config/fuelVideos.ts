import { FuelVideo } from '@/types/Fuel.ts';
// QuoteType import is needed once you assign `type` to a clip - see the
// EXAMPLE blocks below.

/**
 * Raw, unlabeled export batch dropped into public/video/ for local preview.
 * These clips have no caption or QuoteType assigned yet - fill those in per
 * clip as you review them, or delete entries for ones that don't fit. Large
 * exports like these should not ship as-is; see public/video/README.md and
 * .gitignore before committing.
 */
export const FUEL_VIDEOS: FuelVideo[] = [
  { id: 'new-04', source: { kind: 'file', url: '/video/New_04.mp4' } },
  { id: 'new-05', source: { kind: 'file', url: '/video/New_05.mp4' } },
  { id: 'new-06', source: { kind: 'file', url: '/video/New_06.mp4' } },
  { id: 'new-07', source: { kind: 'file', url: '/video/New_07.mp4' } },
  { id: 'new-08', source: { kind: 'file', url: '/video/New_08.mp4' } },
  { id: 'new-09', source: { kind: 'file', url: '/video/New_09.mp4' } },
  { id: 'new-10', source: { kind: 'file', url: '/video/New_10.mp4' } },
  { id: 'new-11', source: { kind: 'file', url: '/video/New_11.mp4' } },
  { id: 'new-12', source: { kind: 'file', url: '/video/New_12.mp4' } },
  { id: 'new-14', source: { kind: 'file', url: '/video/New_14.mp4' } },
  { id: 'new-15', source: { kind: 'file', url: '/video/New_15.mp4' } },
  { id: 'new-70', source: { kind: 'file', url: '/video/New_70.mp4' } },
  { id: 'new-78', source: { kind: 'file', url: '/video/New_78.mp4' } },
  { id: 'new-79', source: { kind: 'file', url: '/video/New_79.mp4' } },
  { id: 'new-53', source: { kind: 'file', url: '/video/New_53.mp4' } },
];

/*
 * EXAMPLE: Local video clip in public/video/
 * {
 *   id: 'fuel-sample-local',
 *   source: { kind: 'file', url: '/video/my-short-clip.mp4' },
 *   caption: 'Every small step forward counts.',
 *   type: QuoteType.motivation,
 *   posterUrl: '/video/my-short-clip-poster.png',
 * },
 */

/*
 * EXAMPLE: Streaming host (Cloudflare Stream, Bunny, Mux)
 * {
 *   id: 'fuel-streaming-example',
 *   source: {
 *     kind: 'hls',
 *     url: 'https://streaming-host.com/manifest.m3u8',
 *     playbackId: 'abc123def456',
 *   },
 *   caption: 'Your resilience is proof of your strength.',
 *   type: QuoteType.recovery_strength,
 *   posterUrl: 'https://streaming-host.com/poster.jpg',
 * },
 */
