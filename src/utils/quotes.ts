import { QuoteType } from '@/types/QuoteType.ts';

export const getQuoteTypeName = (type: QuoteType) => {
  switch (type) {
    // Mental Health & Emotional Support
    case QuoteType.anxiety_relief:
      return 'Anxiety Relief';
    case QuoteType.stress_overwhelm:
      return 'Stress & Overwhelm';
    case QuoteType.hard_times:
      return 'Hard Times';
    case QuoteType.mental_health:
      return 'Mental Health';
    case QuoteType.calm_mind:
      return 'Calm Your Mind';
    case QuoteType.emotional_reset:
      return 'Emotional Reset';
    case QuoteType.overcoming_fear:
      return 'Overcoming Fear';
    case QuoteType.not_alone:
      return 'You Are Not Alone';

    // Confidence, Identity & Self-Worth
    case QuoteType.build_confidence:
      return 'Build Confidence';
    case QuoteType.love_yourself:
      return 'Love Yourself';
    case QuoteType.self_belief:
      return 'Self-Belief';
    case QuoteType.inner_strength:
      return 'Inner Strength';
    case QuoteType.overcoming_self_doubt:
      return 'Overcoming Self-Doubt';
    case QuoteType.mindset_rewiring:
      return 'Mindset Rewiring';

    // Motivation, Discipline & Daily Drive
    case QuoteType.motivation:
      return 'Motivation';
    case QuoteType.discipline:
      return 'Discipline';
    case QuoteType.focus:
      return 'Focus';
    case QuoteType.positive_mindset:
      return 'Positive Mindset';
    case QuoteType.success_mindset:
      return 'Success Mindset';
    case QuoteType.personal_growth:
      return 'Personal Growth';
    case QuoteType.consistency_habits:
      return 'Consistency & Habits';
    case QuoteType.goal_crusher:
      return 'Goal Crusher';

    // Athlete Mindset
    case QuoteType.athlete_confidence:
      return 'Athlete Confidence';
    case QuoteType.game_day_focus:
      return 'Game-Day Focus';
    case QuoteType.pre_workout_motivation:
      return 'Pre-Workout Motivation';
    case QuoteType.mental_toughness:
      return 'Mental Toughness';
    case QuoteType.bounce_back:
      return 'Bounce Back';
    case QuoteType.pressure_performance:
      return 'Pressure & Performance';

    // Wellness, Mindfulness & Inner Peace
    case QuoteType.meditation:
      return 'Meditation';
    case QuoteType.breathe_reset:
      return 'Breathe & Reset';
    case QuoteType.healthy_habits:
      return 'Healthy Habits';
    case QuoteType.mind_body_wellness:
      return 'Mind-Body Wellness';
    case QuoteType.lose_weight:
      return 'Lose Weight';
    case QuoteType.energy_renewal:
      return 'Energy & Renewal';

    // Spiritual & Faith-Based
    case QuoteType.devotional:
      return 'Devotional';
    case QuoteType.prayer_peace:
      return 'Prayer & Peace';
    case QuoteType.scripture_strength:
      return 'Scripture Strength';
    case QuoteType.gods_plan:
      return "God's Plan";
    case QuoteType.hope_healing:
      return 'Hope & Healing';
    case QuoteType.walk_in_faith:
      return 'Walk in Faith';

    // Business, Leadership & Work
    case QuoteType.leadership_mindset:
      return 'Leadership Mindset';
    case QuoteType.career_calling:
      return 'Career & Calling';
    case QuoteType.productivity_boost:
      return 'Productivity Boost';
    case QuoteType.entrepreneur_fuel:
      return 'Entrepreneur Fuel';
    case QuoteType.employee_wellness:
      return 'Employee Wellness';
    case QuoteType.resilience_work:
      return 'Resilience at Work';

    // Addiction, Recovery & Overcoming
    case QuoteType.recovery_strength:
      return 'Recovery Strength';
    case QuoteType.one_day_at_time:
      return 'One Day at a Time';
    case QuoteType.freedom_addiction:
      return 'Freedom From Addiction';
    case QuoteType.new_beginnings:
      return 'New Beginnings';
    case QuoteType.stay_the_course:
      return 'Stay the Course';
    case QuoteType.rebuild_life:
      return 'Rebuild Your Life';

    // Relationships, Love & Connection
    case QuoteType.relationships:
      return 'Relationships';
    case QuoteType.forgiveness_letting_go:
      return 'Forgiveness & Letting Go';
    case QuoteType.compassion_kindness:
      return 'Compassion & Kindness';
    case QuoteType.strengthening_bonds:
      return 'Strengthening Bonds';
    case QuoteType.healing_broken_heart:
      return 'Healing a Broken Heart';

    // Gratitude & Joy
    case QuoteType.gratitude:
      return 'Gratitude';
    case QuoteType.joyful_living:
      return 'Joyful Living';
    case QuoteType.appreciation_presence:
      return 'Appreciation & Presence';
    case QuoteType.celebrate_wins:
      return 'Celebrate the Wins';

    // First Responders & Helpers
    case QuoteType.first_responder_support:
      return 'First Responder Support';
    case QuoteType.share_hope:
      return 'Share Hope';
    case QuoteType.calming_crisis:
      return 'Calming in Crisis';
    case QuoteType.you_matter:
      return 'You Matter';
    case QuoteType.crisis_comfort:
      return 'Crisis Comfort';
    case QuoteType.grounding_tools:
      return 'Grounding Tools';

    // Legacy types
    case QuoteType.affirmation:
      return 'Affirmation';
    case QuoteType.attract_love:
      return 'Attract Love';
    case QuoteType.attract_money:
      return 'Attract Money';
    case QuoteType.breakups:
      return 'Breakups';
    case QuoteType.drink_less:
      return 'Drink Less';
    case QuoteType.law_of_attraction:
      return 'Law of Attraction';
    case QuoteType.marriage:
      return 'Marriage';
    case QuoteType.phone_addiction:
      return 'Phone Addiction';
    case QuoteType.power_life:
      return 'Power Life';
    case QuoteType.toxic_relationships:
      return 'Toxic Relationships';

    default:
      return 'Random Quote';
  }
};
