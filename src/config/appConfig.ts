import { QuoteType } from '@/types/QuoteType.ts';

/**
 * Default (general / consumer) configuration.
 *
 * This is the seed of the per-org config layer from the Org Config spec: every
 * field here is something an organisation is allowed to override, so the org
 * loader will only have to merge a partial config on top of this object.
 * Nothing else in the app should read org-configurable values from anywhere
 * but this module.
 */
export type AppConfig = {
  /**
   * Gates explicitly religious content (prayer, scripture, "God's Plan").
   * Off by default — public entities cannot distribute religious content
   * through a taxpayer-funded program. Faith-based clients turn it on.
   */
  faithContentEnabled: boolean;
  /**
   * Challenge ids shown before the user expands the full library.
   * `null` exposes the whole library (general/consumer default).
   */
  curatedChallengeIds: string[] | null;
  recoveryResources: {
    meetingFinderUrl: string | null;
    /** Per-org "call your sponsor / contact" button on the Recovery page. */
    sponsorContact: { label: string; phone: string } | null;
  };
};

export const APP_CONFIG: AppConfig = {
  faithContentEnabled: false,
  curatedChallengeIds: [
    'breathe-54321',
    'deep-breathing',
    'gratitude-3',
    'mirror-affirmation',
    'reach-out',
    'micro-goal',
  ],
  recoveryResources: {
    meetingFinderUrl: null,
    sponsorContact: null,
  },
};

/**
 * Quote types that are explicitly religious. `hope_healing` is deliberately
 * absent: it sits in the Spiritual category but it is also the content behind
 * the Depression Support coach, which must survive the faith gate.
 */
const FAITH_QUOTE_TYPES: QuoteType[] = [
  QuoteType.devotional,
  QuoteType.prayer_peace,
  QuoteType.scripture_strength,
  QuoteType.gods_plan,
  QuoteType.walk_in_faith,
];

export const isFaithQuoteType = (type: QuoteType): boolean =>
  FAITH_QUOTE_TYPES.includes(type);

/** True when the given content may be shown under the current config. */
export const isContentAllowed = (isFaithContent: boolean): boolean =>
  !isFaithContent || APP_CONFIG.faithContentEnabled;
