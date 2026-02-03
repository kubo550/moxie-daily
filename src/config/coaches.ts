import { QuoteType } from '@/types/QuoteType.ts';

export type Coach = {
  id: QuoteType;
  name: string;
  description: string;
};

export const COACHES: Coach[] = [
  {
    id: QuoteType.healthy_habits,
    name: 'Get Healthy',
    description: 'Build lasting healthy habits',
  },
  {
    id: QuoteType.motivation,
    name: 'Get Motivated',
    description: 'Stay focused and driven',
  },
  {
    id: QuoteType.joyful_living,
    name: 'Get Happier',
    description: 'Find more joy and positivity',
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
  },
  {
    id: QuoteType.mental_health,
    name: 'Get Mental Health Support',
    description: 'Mental wellness and support',
  },
  {
    id: QuoteType.recovery_strength,
    name: 'Get Addiction & Recovery Help',
    description: 'Recovery support and strength',
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
    name: 'Disciplined',
    description: 'Build unwavering discipline',
  },
];
