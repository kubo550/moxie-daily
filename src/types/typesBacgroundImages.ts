import { QuoteType } from '@/types/QuoteType.ts';

// Import all available images
import affirmation from '/types/affirmation.jpg';
import anxiety_relief from '/types/anxiety_relief.jpg';
import attract_love from '/types/attract_love.jpg';
import attract_money from '/types/attract_money.jpg';
import breakups from '/types/breakups.jpg';
import build_confidence from '/types/build_confidence.jpg';
import devotional from '/types/devotional.jpg';
import discipline from '/types/discipline.jpg';
import drink_less from '/types/drink_less.jpg';
import focus from '/types/focus.jpg';
import hard_times from '/types/hard_times.jpg';
import law_of_attraction from '/types/law_of_attraction.jpg';
import lose_weight from '/types/lose_weight.jpg';
import love_yourself from '/types/love_yourself.jpg';
import marriage from '/types/marriage.jpg';
import meditation from '/types/meditation.jpg';
import mental_health from '/types/mental_health.jpg';
import motivation from '/types/motivation.jpg';
import personal_growth from '/types/personal_growth.jpg';
import phone_addiction from '/types/phone_addiction.jpg';
import positive_mindset from '/types/positive_mindset.jpg';
import power_life from '/types/power_life.jpg';
import relationships from '/types/relationships.jpg';
import success_mindset from '/types/success_mindset.jpg';
import toxic_relationships from '/types/toxic_relationships.jpg';

// Category images mapping - using existing images for main categories
const categoryImages: Record<string, string> = {
  mental_health: mental_health,
  confidence: build_confidence,
  motivation: motivation,
  athlete: discipline,
  wellness: meditation,
  spiritual: devotional,
  business: success_mindset,
  recovery: hard_times,
  relationships: relationships,
  gratitude: positive_mindset,
  first_responders: affirmation,
};

// Get image for a category by its ID
export const getCategoryImage = (categoryId: string): string => {
  return categoryImages[categoryId] || affirmation;
};

// Legacy function for backward compatibility with QuoteType
export const getBackgroundImage = (type: QuoteType): string => {
  return backgroundImages[type] || affirmation;
};

const backgroundImages: Record<QuoteType, string> = {
  // Mental Health & Emotional Support
  [QuoteType.anxiety_relief]: anxiety_relief,
  [QuoteType.stress_overwhelm]: mental_health,
  [QuoteType.hard_times]: hard_times,
  [QuoteType.mental_health]: mental_health,
  [QuoteType.calm_mind]: meditation,
  [QuoteType.emotional_reset]: mental_health,
  [QuoteType.overcoming_fear]: hard_times,
  [QuoteType.not_alone]: affirmation,

  // Confidence, Identity & Self-Worth
  [QuoteType.build_confidence]: build_confidence,
  [QuoteType.love_yourself]: love_yourself,
  [QuoteType.self_belief]: build_confidence,
  [QuoteType.inner_strength]: power_life,
  [QuoteType.overcoming_self_doubt]: build_confidence,
  [QuoteType.mindset_rewiring]: positive_mindset,

  // Motivation, Discipline & Daily Drive
  [QuoteType.motivation]: motivation,
  [QuoteType.discipline]: discipline,
  [QuoteType.focus]: focus,
  [QuoteType.positive_mindset]: positive_mindset,
  [QuoteType.success_mindset]: success_mindset,
  [QuoteType.personal_growth]: personal_growth,
  [QuoteType.consistency_habits]: discipline,
  [QuoteType.goal_crusher]: success_mindset,

  // Athlete Mindset
  [QuoteType.athlete_confidence]: discipline,
  [QuoteType.game_day_focus]: focus,
  [QuoteType.pre_workout_motivation]: motivation,
  [QuoteType.mental_toughness]: discipline,
  [QuoteType.bounce_back]: hard_times,
  [QuoteType.pressure_performance]: focus,

  // Wellness, Mindfulness & Inner Peace
  [QuoteType.meditation]: meditation,
  [QuoteType.breathe_reset]: meditation,
  [QuoteType.healthy_habits]: lose_weight,
  [QuoteType.mind_body_wellness]: meditation,
  [QuoteType.lose_weight]: lose_weight,
  [QuoteType.energy_renewal]: positive_mindset,

  // Spiritual & Faith-Based
  [QuoteType.devotional]: devotional,
  [QuoteType.prayer_peace]: devotional,
  [QuoteType.scripture_strength]: devotional,
  [QuoteType.gods_plan]: devotional,
  [QuoteType.hope_healing]: devotional,
  [QuoteType.walk_in_faith]: devotional,

  // Business, Leadership & Work
  [QuoteType.leadership_mindset]: success_mindset,
  [QuoteType.career_calling]: personal_growth,
  [QuoteType.productivity_boost]: focus,
  [QuoteType.entrepreneur_fuel]: success_mindset,
  [QuoteType.employee_wellness]: positive_mindset,
  [QuoteType.resilience_work]: discipline,

  // Addiction, Recovery & Overcoming
  [QuoteType.recovery_strength]: hard_times,
  [QuoteType.one_day_at_time]: affirmation,
  [QuoteType.freedom_addiction]: hard_times,
  [QuoteType.new_beginnings]: personal_growth,
  [QuoteType.stay_the_course]: discipline,
  [QuoteType.rebuild_life]: personal_growth,

  // Relationships, Love & Connection
  [QuoteType.relationships]: relationships,
  [QuoteType.forgiveness_letting_go]: relationships,
  [QuoteType.compassion_kindness]: love_yourself,
  [QuoteType.strengthening_bonds]: relationships,
  [QuoteType.healing_broken_heart]: breakups,

  // Gratitude & Joy
  [QuoteType.gratitude]: positive_mindset,
  [QuoteType.joyful_living]: positive_mindset,
  [QuoteType.appreciation_presence]: meditation,
  [QuoteType.celebrate_wins]: success_mindset,

  // First Responders & Helpers
  [QuoteType.first_responder_support]: affirmation,
  [QuoteType.share_hope]: affirmation,
  [QuoteType.calming_crisis]: meditation,
  [QuoteType.you_matter]: love_yourself,
  [QuoteType.crisis_comfort]: affirmation,
  [QuoteType.grounding_tools]: meditation,

  // Legacy types
  [QuoteType.affirmation]: affirmation,
  [QuoteType.attract_love]: attract_love,
  [QuoteType.attract_money]: attract_money,
  [QuoteType.breakups]: breakups,
  [QuoteType.drink_less]: drink_less,
  [QuoteType.law_of_attraction]: law_of_attraction,
  [QuoteType.marriage]: marriage,
  [QuoteType.phone_addiction]: phone_addiction,
  [QuoteType.power_life]: power_life,
  [QuoteType.toxic_relationships]: toxic_relationships,
};
