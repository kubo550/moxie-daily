import { QuoteType } from '@/types/QuoteType.ts';

/** Quote types the Recovery Support page pulls its affirmations from. */
export const RECOVERY_QUOTE_TYPES: QuoteType[] = [
  QuoteType.one_day_at_time,
  QuoteType.recovery_strength,
  QuoteType.stay_the_course,
  QuoteType.new_beginnings,
  QuoteType.rebuild_life,
  QuoteType.freedom_addiction,
];

/** Used when the quote DB has nothing for the types above. */
export const FALLBACK_RECOVERY_AFFIRMATIONS = [
  'One day at a time.',
  'Progress, not perfection.',
  'This craving will pass — you have outlasted it before.',
  "You don't have to do this alone.",
  'Trust the process.',
];

export type RecoveryResource = {
  label: string;
  description: string;
  href: string;
  linkText: string;
};

/**
 * National resources — shared by every org, never replaced by a config (an
 * org's own meeting finder is added on top, see APP_CONFIG.recoveryResources).
 */
export const NATIONAL_RECOVERY_RESOURCES: RecoveryResource[] = [
  {
    label: 'SAMHSA National Helpline',
    description: 'Free, confidential, 24/7 treatment referral and information',
    href: 'tel:1-800-662-4357',
    linkText: '1-800-662-HELP (4357)',
  },
  {
    label: 'Alcoholics Anonymous (AA)',
    description: 'Find local AA meetings and support groups',
    href: 'https://www.aa.org',
    linkText: 'aa.org',
  },
  {
    label: 'Narcotics Anonymous (NA)',
    description: 'Find local NA meetings and support groups',
    href: 'https://www.na.org',
    linkText: 'na.org',
  },
  {
    label: 'FindTreatment.gov',
    description: 'Government locator for treatment and recovery services',
    href: 'https://findtreatment.gov',
    linkText: 'findtreatment.gov',
  },
];
