import { QuoteType } from '@/types/QuoteType.ts';

export type QuickSupportItem = {
  id: string;
  title: string;
  subtitle: string;
  coachType: QuoteType;
  emoji: string;
  color: string;
};

export const QUICK_SUPPORT_ITEMS: QuickSupportItem[] = [
  {
    id: 'anxious',
    title: 'Feeling Anxious?',
    subtitle: 'Find calm right now',
    coachType: QuoteType.anxiety_relief,
    emoji: '🌊',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'overwhelmed',
    title: 'Overwhelmed?',
    subtitle: 'Take a breath',
    coachType: QuoteType.stress_overwhelm,
    emoji: '🧘',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'motivation',
    title: 'Need Encouragement?',
    subtitle: 'A little motivation, when you need it',
    coachType: QuoteType.motivation,
    emoji: '💛',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'lonely',
    title: 'Feeling Alone?',
    subtitle: 'You\'re not alone',
    coachType: QuoteType.not_alone,
    emoji: '🤝',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 'sad',
    title: 'Feeling Down?',
    subtitle: 'Find hope & healing',
    coachType: QuoteType.hope_healing,
    emoji: '🌅',
    color: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    id: 'doubt',
    title: 'Doubting Yourself?',
    subtitle: 'Build confidence',
    coachType: QuoteType.build_confidence,
    emoji: '💪',
    color: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    id: 'recovery',
    title: 'Struggling in Recovery?',
    subtitle: 'One day at a time',
    coachType: QuoteType.recovery_strength,
    emoji: '🌟',
    color: 'from-violet-500/20 to-purple-500/20',
  },
  {
    id: 'unfocused',
    title: 'Mind Racing?',
    subtitle: 'Find your focus',
    coachType: QuoteType.focus,
    emoji: '🌀',
    color: 'from-teal-500/20 to-blue-500/20',
  },
];
