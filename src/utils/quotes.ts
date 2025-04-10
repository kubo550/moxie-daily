import { QuoteType } from '@/types/QuoteType.ts';

export const getQuoteTypeName = (type: QuoteType) => {
  switch (type) {
    case QuoteType.affirmation:
      return 'Affirmation';
    case QuoteType.anxiety_relief:
      return 'Anxiety Relief';
    case QuoteType.attract_love:
      return 'Attract Love';
    case QuoteType.attract_money:
      return 'Attract Money';
    case QuoteType.breakups:
      return 'Breakups';
    case QuoteType.build_confidence:
      return 'Build Confidence';
    case QuoteType.devotional:
      return 'Devotional';
    case QuoteType.discipline:
      return 'Discipline';
    case QuoteType.drink_less:
      return 'Drink Less';
    case QuoteType.focus:
      return 'Focus';
    case QuoteType.hard_times:
      return 'Hard Times';
    case QuoteType.law_of_attraction:
      return 'Law of Attraction';
    case QuoteType.lose_weight:
      return 'Lose Weight';
    case QuoteType.love_yourself:
      return 'Love Yourself';
    case QuoteType.marriage:
      return 'Marriage';
    case QuoteType.meditation:
      return 'Meditation';
    case QuoteType.mental_health:
      return 'Mental Health';
    case QuoteType.motivation:
      return 'Motivation';
    case QuoteType.personal_growth:
      return 'Personal Growth';
    case QuoteType.phone_addiction:
      return 'Phone Addiction';
    case QuoteType.positive_mindset:
      return 'Positive Mindset';
    case QuoteType.power_life:
      return 'Power Life';
    case QuoteType.relationships:
      return 'Relationships';
    case QuoteType.success_mindset:
      return 'Success Mindset';
    case QuoteType.toxic_relationships:
      return 'Toxic Relationships';
    default:
      return 'Random Quote';
  }
};
