import { QuoteType } from '@/types/QuoteType.ts';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  coachTypes: QuoteType[];
  icon?: string;
};

export const CHALLENGES: Challenge[] = [
  // Anxiety & Mental Health
  {
    id: 'breathe-54321',
    title: '5-4-3-2-1 Grounding',
    description: 'Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste',
    coachTypes: [QuoteType.anxiety_relief, QuoteType.mental_health, QuoteType.calm_mind],
  },
  {
    id: 'deep-breathing',
    title: 'Take 10 Deep Breaths',
    description: 'Breathe in for 4, hold for 4, out for 4. Reset your nervous system.',
    coachTypes: [QuoteType.anxiety_relief, QuoteType.meditation, QuoteType.breathe_reset],
  },
  {
    id: 'gratitude-3',
    title: 'List 3 Gratitudes',
    description: 'Write down 3 things you\'re grateful for today, no matter how small',
    coachTypes: [QuoteType.gratitude, QuoteType.joyful_living, QuoteType.mental_health],
  },

  // Motivation & Productivity
  {
    id: 'micro-goal',
    title: 'One Small Win',
    description: 'Complete one tiny task you\'ve been putting off (5 min max)',
    coachTypes: [QuoteType.motivation, QuoteType.productivity_boost, QuoteType.discipline],
  },
  {
    id: 'time-block',
    title: '25-Minute Focus Block',
    description: 'Set a timer, pick one task, eliminate distractions. Just 25 minutes.',
    coachTypes: [QuoteType.focus, QuoteType.productivity_boost, QuoteType.discipline],
  },
  {
    id: 'tomorrow-prep',
    title: 'Plan Tomorrow Tonight',
    description: 'Write down your top 3 priorities for tomorrow before bed',
    coachTypes: [QuoteType.productivity_boost, QuoteType.discipline, QuoteType.goal_crusher],
  },

  // Fitness & Health
  {
    id: 'water-intake',
    title: 'Drink 8 Glasses Today',
    description: 'Track your water intake. Your body (and mind) will thank you.',
    coachTypes: [QuoteType.healthy_habits, QuoteType.energy_renewal, QuoteType.lose_weight],
  },
  {
    id: 'movement-10',
    title: '10-Minute Movement',
    description: 'Walk, stretch, dance - just move your body for 10 minutes',
    coachTypes: [QuoteType.pre_workout_motivation, QuoteType.healthy_habits, QuoteType.energy_renewal],
  },
  {
    id: 'screen-free-hour',
    title: 'Screen-Free Hour',
    description: 'One hour today without phone/computer. Read, walk, or just be.',
    coachTypes: [QuoteType.phone_addiction, QuoteType.meditation, QuoteType.breathe_reset],
  },

  // Confidence & Self-Worth
  {
    id: 'mirror-affirmation',
    title: 'Mirror Affirmation',
    description: 'Look yourself in the eyes and say: "I am enough, exactly as I am"',
    coachTypes: [QuoteType.build_confidence, QuoteType.love_yourself, QuoteType.self_belief],
  },
  {
    id: 'compliment-self',
    title: 'Celebrate a Win',
    description: 'Write down something you did well this week, big or small',
    coachTypes: [QuoteType.build_confidence, QuoteType.celebrate_wins, QuoteType.gratitude],
  },
  {
    id: 'no-comparison',
    title: 'No Comparison Day',
    description: 'Catch yourself comparing to others. Replace with self-compassion.',
    coachTypes: [QuoteType.build_confidence, QuoteType.overcoming_self_doubt, QuoteType.love_yourself],
  },

  // Recovery & Healing
  {
    id: 'check-in',
    title: 'Honest Check-In',
    description: 'Ask yourself: "How am I really feeling?" and be honest.',
    coachTypes: [QuoteType.recovery_strength, QuoteType.mental_health, QuoteType.one_day_at_time],
  },
  {
    id: 'reach-out',
    title: 'Reach Out to Support',
    description: 'Text or call someone in your support network. You don\'t have to do this alone.',
    coachTypes: [QuoteType.recovery_strength, QuoteType.not_alone, QuoteType.hope_healing],
  },
  {
    id: 'trigger-journal',
    title: 'Journal Your Triggers',
    description: 'Write what triggered you today and how you responded (no judgment)',
    coachTypes: [QuoteType.recovery_strength, QuoteType.emotional_reset, QuoteType.rebuild_life],
  },

  // Spiritual & Faith
  {
    id: 'prayer-5min',
    title: '5 Minutes of Prayer',
    description: 'Spend 5 quiet minutes in prayer or meditation on scripture',
    coachTypes: [QuoteType.devotional, QuoteType.walk_in_faith, QuoteType.prayer_peace],
  },
  {
    id: 'faith-reflection',
    title: 'Reflect on God\'s Plan',
    description: 'Journal about how you see God working in your life right now',
    coachTypes: [QuoteType.gods_plan, QuoteType.walk_in_faith, QuoteType.hope_healing],
  },

  // Relationships
  {
    id: 'kind-message',
    title: 'Send Kindness',
    description: 'Send an unexpected kind message to someone you care about',
    coachTypes: [QuoteType.relationships, QuoteType.compassion_kindness, QuoteType.share_hope],
  },
  {
    id: 'forgiveness-step',
    title: 'One Forgiveness Step',
    description: 'What\'s one small step toward forgiving yourself or someone else?',
    coachTypes: [QuoteType.forgiveness_letting_go, QuoteType.healing_broken_heart, QuoteType.hope_healing],
  },

  // General Wellness
  {
    id: 'phone-down',
    title: 'Phone Down at Dinner',
    description: 'Eat one meal today completely phone-free. Be present.',
    coachTypes: [QuoteType.phone_addiction, QuoteType.appreciation_presence, QuoteType.meditation],
  },
  {
    id: 'early-bed',
    title: 'Sleep by 10 PM',
    description: 'Commit to getting to bed early tonight. Rest is productive.',
    coachTypes: [QuoteType.healthy_habits, QuoteType.energy_renewal, QuoteType.discipline],
  },
];

export const getChallengesByCoachType = (coachType: QuoteType): Challenge[] => {
  return CHALLENGES.filter(challenge =>
    challenge.coachTypes.includes(coachType)
  );
};

export const getDailyChallenges = (recentCoachTypes: QuoteType[]): Challenge[] => {
  if (recentCoachTypes.length === 0) {
    // Return 3 random challenges if no coach history
    const shuffled = [...CHALLENGES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  // Get challenges for most recent coach type
  const mostRecent = recentCoachTypes[0];
  const relevantChallenges = getChallengesByCoachType(mostRecent);

  if (relevantChallenges.length >= 3) {
    return relevantChallenges.slice(0, 3);
  }

  // Fill with challenges from other recent coach types
  const allRelevant = new Set<Challenge>();
  relevantChallenges.forEach(c => allRelevant.add(c));

  for (const type of recentCoachTypes.slice(1)) {
    if (allRelevant.size >= 3) break;
    getChallengesByCoachType(type).forEach(c => allRelevant.add(c));
  }

  return Array.from(allRelevant).slice(0, 3);
};
