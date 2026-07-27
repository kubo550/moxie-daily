import { QuoteType } from '@/types/QuoteType.ts';
import { getQuoteTypeName } from '@/utils/quotes.ts';
import {
  getBackgroundImage,
  TYPE_IMAGES,
} from '@/types/typesBacgroundImages.ts';
import { isContentAllowed } from '@/config/appConfig.ts';

export type Coach = {
  id: QuoteType;
  name: string;
  description: string;
  /**
   * Label used in the chat header ("Chatting with ..."). Set it for coaches
   * whose `name` already reads as a noun phrase; coaches without it fall back
   * to the quote type name (see getCoachLabel).
   */
  chatTitle?: string;
  /**
   * Card image. Set it whenever the quote type's default image is wrong for
   * this coach — the type map is shared by up to 6 types, so it cannot be
   * fixed per card there.
   */
  image?: string;
  /** Explicitly religious coach — hidden unless faith content is enabled. */
  faith?: boolean;
};

export const COACHES: Coach[] = [
  {
    id: QuoteType.healthy_habits,
    name: 'Wellness Coach',
    description: 'Support for healthy habits, one day at a time',
    chatTitle: 'Wellness Coach',
    // Was the lose_weight waistband photo - body-focused.
    image: TYPE_IMAGES.path_valley,
  },
  {
    id: QuoteType.motivation,
    name: 'Encouragement Coach',
    description: 'Steady encouragement when you need it',
    chatTitle: 'Encouragement Coach',
    // Was motivation.jpg - a "SUCCESS go get it" chalkboard.
    image: TYPE_IMAGES.sunny_path,
  },
  {
    id: QuoteType.joyful_living,
    name: 'Mindset Coach',
    description: 'Support for shifting how today feels',
    chatTitle: 'Mindset Coach',
  },
  {
    id: QuoteType.productivity_boost,
    name: 'Get Productive',
    description: 'Maximize your productivity',
  },
  {
    id: QuoteType.forgiveness_letting_go,
    name: 'Get Over It',
    description: 'Release and move forward',
  },
  {
    id: QuoteType.focus,
    name: 'Get Focused',
    description: 'Sharpen your concentration',
  },
  {
    id: QuoteType.entrepreneur_fuel,
    name: 'Get Wealthy',
    description: 'Business and wealth mindset',
  },
  {
    id: QuoteType.personal_growth,
    name: 'Get Wiser',
    description: 'Wisdom and personal growth',
    // Freed personal_growth.jpg up for the Recovery coach.
    image: TYPE_IMAGES.mountain_peak,
  },
  {
    id: QuoteType.energy_renewal,
    name: 'Get Energized',
    description: 'Recharge and renew your energy',
  },
  {
    id: QuoteType.walk_in_faith,
    name: 'Get Spiritual',
    description: 'Strengthen your faith journey',
    faith: true,
    // Was devotional.jpg - a specific religious ceremony, also used by the
    // Depression Support card. A candle is non-denominational.
    image: TYPE_IMAGES.candle,
  },
  {
    id: QuoteType.mental_health,
    name: 'Get Mental Health Support',
    description: 'Mental wellness and support',
    // Was mental_health.jpg - a shirtless figure in red light clutching his
    // head, which reads as a breakdown scene.
    image: TYPE_IMAGES.still_water,
  },
  {
    id: QuoteType.recovery_strength,
    name: 'Recovery Coach',
    description: 'One day at a time — support for your recovery journey',
    chatTitle: 'Recovery Coach',
    // Was hard_times.jpg - two people on a bed with pill packs around them,
    // which reads as an overdose scene on a recovery card.
    image: TYPE_IMAGES.personal_growth,
  },
  {
    id: QuoteType.build_confidence,
    name: 'Get Confidence',
    description: 'Build unshakeable confidence',
  },
  {
    id: QuoteType.anxiety_relief,
    name: 'Get Anxiety Relief',
    description: 'Find calm and peace of mind',
  },
  {
    id: QuoteType.hope_healing,
    name: 'Get Depression Support',
    description: 'Hope and healing support',
    // Was devotional.jpg - a religious ceremony photo, shared with Get
    // Spiritual and wrong for depression support.
    image: TYPE_IMAGES.love_yourself,
  },
  {
    id: QuoteType.gratitude,
    name: 'Get Gratitude & Joy',
    description: 'Cultivate gratitude and joy',
  },
  {
    id: QuoteType.pre_workout_motivation,
    name: 'Get Fit',
    description: 'Workout motivation and fitness mindset',
  },
  {
    id: QuoteType.discipline,
    name: 'Get Disciplined',
    description: 'Build unwavering discipline',
  },
];

export const getCoachLabel = (type: QuoteType): string => {
  const coach = COACHES.find((c) => c.id === type);

  return coach?.chatTitle || `${getQuoteTypeName(type)} Coach`;
};

export const getCoachImage = (coach: Coach): string =>
  coach.image || getBackgroundImage(coach.id);

/** Coaches the current config allows. Use this instead of COACHES in the UI. */
export const getVisibleCoaches = (): Coach[] =>
  COACHES.filter((coach) => isContentAllowed(Boolean(coach.faith)));
