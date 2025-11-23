import { randomElement } from '../utils/functions.ts';
import { QuoteType } from '@/types/QuoteType.ts';
import { CacheProvider } from '@/infrastructure/cacheProvider.ts';
import { QuoteDBProvider } from '@/infrastructure/quoteDBProvider.ts';

export type Quote = {
  type: QuoteType;
  quote: string;
  id: string;
  caption?: string;
};

export const getRandomQuote = async (type: string): Promise<Quote> => {
  try {
    const quotes = await QuoteDBProvider.getInstance().fetchQuotesFromDB();
    const currentTypeQuotes = quotes.filter((quote) => quote.type === type);
    return randomElement(currentTypeQuotes) || randomElement(quotes);
  } catch (error) {
    console.log('Error getting quote:', error as unknown);
    return randomElement(fallbackQuotes);
  }
};

export const getQuoteById = async (id: string): Promise<Quote> => {
  try {
    const cachedQuote = CacheProvider.getInstance().getQuote(id);
    if (cachedQuote) {
      return cachedQuote;
    }
    const quotes = await QuoteDBProvider.getInstance().fetchQuotesFromDB();

    return (
      quotes.find((quote) => quote.id === id) || randomElement(fallbackQuotes)
    );
  } catch (error) {
    console.log('Error getting quote: ', error as unknown);
    return randomElement(fallbackQuotes);
  }
};

export const getQuotesByType = async (
  types: QuoteType[] = []
): Promise<Quote[]> => {
  try {
    let quotes = CacheProvider.getInstance().getAllQuotes();

    if (!quotes.length) {
      quotes = await QuoteDBProvider.getInstance().fetchQuotesFromDB();
    }
    if (!types.length) {
      return quotes;
    }

    return quotes.filter((quote) => types.includes(quote.type));
  } catch (error) {
    console.log('Error getting quote:', error as unknown);
    return fallbackQuotes;
  }
};
export type Category = {
  id: string;
  name: string;
  subcategories: QuoteType[];
};

export const CATEGORIES: Category[] = [
  {
    id: 'mental_health',
    name: 'Mental Health & Emotional Support',
    subcategories: [
      QuoteType.anxiety_relief,
      QuoteType.stress_overwhelm,
      QuoteType.hard_times,
      QuoteType.mental_health,
      QuoteType.calm_mind,
      QuoteType.emotional_reset,
      QuoteType.overcoming_fear,
      QuoteType.not_alone,
    ],
  },
  {
    id: 'confidence',
    name: 'Confidence, Identity & Self-Worth',
    subcategories: [
      QuoteType.build_confidence,
      QuoteType.love_yourself,
      QuoteType.self_belief,
      QuoteType.inner_strength,
      QuoteType.overcoming_self_doubt,
      QuoteType.mindset_rewiring,
    ],
  },
  {
    id: 'motivation',
    name: 'Motivation, Discipline & Daily Drive',
    subcategories: [
      QuoteType.motivation,
      QuoteType.discipline,
      QuoteType.focus,
      QuoteType.positive_mindset,
      QuoteType.success_mindset,
      QuoteType.personal_growth,
      QuoteType.consistency_habits,
      QuoteType.goal_crusher,
    ],
  },
  {
    id: 'athlete',
    name: 'Athlete Mindset',
    subcategories: [
      QuoteType.athlete_confidence,
      QuoteType.game_day_focus,
      QuoteType.pre_workout_motivation,
      QuoteType.mental_toughness,
      QuoteType.bounce_back,
      QuoteType.pressure_performance,
    ],
  },
  {
    id: 'wellness',
    name: 'Wellness, Mindfulness & Inner Peace',
    subcategories: [
      QuoteType.meditation,
      QuoteType.breathe_reset,
      QuoteType.healthy_habits,
      QuoteType.mind_body_wellness,
      QuoteType.lose_weight,
      QuoteType.energy_renewal,
    ],
  },
  {
    id: 'spiritual',
    name: 'Spiritual & Faith-Based',
    subcategories: [
      QuoteType.devotional,
      QuoteType.prayer_peace,
      QuoteType.scripture_strength,
      QuoteType.gods_plan,
      QuoteType.hope_healing,
      QuoteType.walk_in_faith,
    ],
  },
  {
    id: 'business',
    name: 'Business, Leadership & Work',
    subcategories: [
      QuoteType.leadership_mindset,
      QuoteType.career_calling,
      QuoteType.productivity_boost,
      QuoteType.entrepreneur_fuel,
      QuoteType.employee_wellness,
      QuoteType.resilience_work,
    ],
  },
  {
    id: 'recovery',
    name: 'Addiction, Recovery & Overcoming',
    subcategories: [
      QuoteType.recovery_strength,
      QuoteType.one_day_at_time,
      QuoteType.freedom_addiction,
      QuoteType.new_beginnings,
      QuoteType.stay_the_course,
      QuoteType.rebuild_life,
    ],
  },
  {
    id: 'relationships',
    name: 'Relationships, Love & Connection',
    subcategories: [
      QuoteType.relationships,
      QuoteType.forgiveness_letting_go,
      QuoteType.compassion_kindness,
      QuoteType.strengthening_bonds,
      QuoteType.healing_broken_heart,
    ],
  },
  {
    id: 'gratitude',
    name: 'Gratitude & Joy',
    subcategories: [
      QuoteType.gratitude,
      QuoteType.joyful_living,
      QuoteType.appreciation_presence,
      QuoteType.celebrate_wins,
    ],
  },
  {
    id: 'first_responders',
    name: 'First Responders & Helpers',
    subcategories: [
      QuoteType.first_responder_support,
      QuoteType.share_hope,
      QuoteType.calming_crisis,
      QuoteType.you_matter,
      QuoteType.crisis_comfort,
      QuoteType.grounding_tools,
    ],
  },
];

export const getAvailableTypes = () => {
  return CATEGORIES.flatMap((category) => category.subcategories);
};

const fallbackQuotes = [
  {
    id: '1',
    type: QuoteType.affirmation,
    quote: 'I am worthy of all the good things that come my way',
  },
  {
    id: '2',
    type: QuoteType.affirmation,
    quote: 'Every day, in every way, I am becoming better and better',
  },
  {
    id: '3',
    type: QuoteType.affirmation,
    quote: 'I choose to focus on what I can control and let go of what I can’t',
  },
  {
    id: '4',
    type: QuoteType.affirmation,
    quote: 'Happiness is a choice, and today I choose to be happy',
  },
  {
    id: '5',
    type: QuoteType.affirmation,
    quote: 'I am resilient, strong, and brave in the face of challenges',
  },
  {
    id: '6',
    type: QuoteType.affirmation,
    quote: 'I am enough, just as I am, and I deserve love and respect',
  },
  {
    id: '7',
    type: QuoteType.affirmation,
    quote: 'I have the power to create the life I desire',
  },
  {
    id: '8',
    type: QuoteType.affirmation,
    quote: 'My thoughts shape my reality, and I choose to think positively',
  },
  {
    id: '9',
    type: QuoteType.affirmation,
    quote: 'I am grateful for the abundance that flows into my life',
  },
  {
    id: '10',
    type: QuoteType.affirmation,
    quote:
      'I trust myself to make the right decisions for my growth and happiness',
  },
];
