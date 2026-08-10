import { QuoteType } from '@/types/QuoteType.ts';
import { APP_CONFIG } from '@/config/appConfig.ts';

/** Quote types the recovery affirmations are pulled from. */
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

export type SupportIcon =
  | 'phone'
  | 'text'
  | 'globe'
  | 'heart'
  | 'shield'
  | 'users';

export type SupportTone =
  | 'red'
  | 'blue'
  | 'green'
  | 'purple'
  | 'amber'
  | 'teal'
  | 'pink'
  | 'cyan';

export type SupportResource = {
  label: string;
  description: string;
  /** `tel:` / `https:` target. Absent when the action is an instruction rather than a link. */
  href?: string;
  /** Link text, or the instruction itself when `href` is absent. */
  action: string;
  icon: SupportIcon;
  tone: SupportTone;
  /** Visually promoted card — used for the org's own contacts. */
  highlight?: boolean;
};

/** Life-threatening / right-now help. Always rendered first. */
export const CRISIS_LINES: SupportResource[] = [
  {
    label: 'Emergency: 911',
    description: 'Immediate danger or a medical emergency',
    href: 'tel:911',
    action: 'Call 911',
    icon: 'phone',
    tone: 'red',
  },
  {
    label: '988 Suicide & Crisis Lifeline',
    description: '24/7 support for emotional distress and crisis',
    href: 'tel:988',
    action: 'Call or text 988',
    icon: 'phone',
    tone: 'blue',
  },
  {
    label: 'Crisis Text Line',
    description: 'Free, confidential texting support',
    action: 'Text HOME to 741741',
    icon: 'text',
    tone: 'green',
  },
  {
    label: 'Veterans Crisis Line',
    description: 'Crisis support for veterans and their families',
    href: 'tel:988',
    action: 'Call 988, then press 1',
    icon: 'shield',
    tone: 'cyan',
  },
];

/**
 * National meetings, helplines and treatment locators — shared by every org.
 * An org's own contacts are added on top, see `getOrgSupportResources`.
 */
export const NATIONAL_RECOVERY_RESOURCES: SupportResource[] = [
  {
    label: 'SAMHSA National Helpline',
    description: 'Free, confidential, 24/7 treatment referral and information',
    href: 'tel:1-800-662-4357',
    action: '1-800-662-HELP (4357)',
    icon: 'phone',
    tone: 'purple',
  },
  {
    label: 'Alcoholics Anonymous (AA)',
    description: 'Find local AA meetings and support groups',
    href: 'https://www.aa.org',
    action: 'aa.org',
    icon: 'globe',
    tone: 'amber',
  },
  {
    label: 'Narcotics Anonymous (NA)',
    description: 'Find local NA meetings and support groups',
    href: 'https://www.na.org',
    action: 'na.org',
    icon: 'globe',
    tone: 'teal',
  },
  {
    label: 'FindTreatment.gov',
    description: 'Government locator for treatment and recovery services',
    href: 'https://findtreatment.gov',
    action: 'findtreatment.gov',
    icon: 'globe',
    tone: 'blue',
  },
  {
    label: 'NAMI Helpline',
    description: 'National Alliance on Mental Illness — mental health support',
    href: 'tel:1-800-950-6264',
    action: '1-800-950-NAMI (6264)',
    icon: 'heart',
    tone: 'pink',
  },
];

/** The org's own sponsor contact / meeting finder, when configured. */
export const getOrgSupportResources = (): SupportResource[] => {
  const { sponsorContact, meetingFinderUrl } = APP_CONFIG.recoveryResources;
  const resources: SupportResource[] = [];

  if (sponsorContact) {
    resources.push({
      label: sponsorContact.label,
      description: 'Reach out before the craving decides for you',
      href: `tel:${sponsorContact.phone}`,
      action: sponsorContact.phone,
      icon: 'phone',
      tone: 'teal',
      highlight: true,
    });
  }

  if (meetingFinderUrl) {
    resources.push({
      label: 'Find a meeting near you',
      description: 'Local meeting finder',
      href: meetingFinderUrl,
      action: 'Open meeting finder',
      icon: 'users',
      tone: 'teal',
      highlight: true,
    });
  }

  return resources;
};
