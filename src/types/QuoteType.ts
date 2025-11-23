export enum QuoteType {
  // Mental Health & Emotional Support
  anxiety_relief = 'anxiety_relief',
  stress_overwhelm = 'stress_overwhelm',
  hard_times = 'hard_times',
  mental_health = 'mental_health',
  calm_mind = 'calm_mind',
  emotional_reset = 'emotional_reset',
  overcoming_fear = 'overcoming_fear',
  not_alone = 'not_alone',

  // Confidence, Identity & Self-Worth
  build_confidence = 'build_confidence',
  love_yourself = 'love_yourself',
  self_belief = 'self_belief',
  inner_strength = 'inner_strength',
  overcoming_self_doubt = 'overcoming_self_doubt',
  mindset_rewiring = 'mindset_rewiring',

  // Motivation, Discipline & Daily Drive
  motivation = 'motivation',
  discipline = 'discipline',
  focus = 'focus',
  positive_mindset = 'positive_mindset',
  success_mindset = 'success_mindset',
  personal_growth = 'personal_growth',
  consistency_habits = 'consistency_habits',
  goal_crusher = 'goal_crusher',

  // Athlete Mindset
  athlete_confidence = 'athlete_confidence',
  game_day_focus = 'game_day_focus',
  pre_workout_motivation = 'pre_workout_motivation',
  mental_toughness = 'mental_toughness',
  bounce_back = 'bounce_back',
  pressure_performance = 'pressure_performance',

  // Wellness, Mindfulness & Inner Peace
  meditation = 'meditation',
  breathe_reset = 'breathe_reset',
  healthy_habits = 'healthy_habits',
  mind_body_wellness = 'mind_body_wellness',
  lose_weight = 'lose_weight',
  energy_renewal = 'energy_renewal',

  // Spiritual & Faith-Based Encouragement
  devotional = 'devotional',
  prayer_peace = 'prayer_peace',
  scripture_strength = 'scripture_strength',
  gods_plan = 'gods_plan',
  hope_healing = 'hope_healing',
  walk_in_faith = 'walk_in_faith',

  // Business, Leadership & Work Mindset
  leadership_mindset = 'leadership_mindset',
  career_calling = 'career_calling',
  productivity_boost = 'productivity_boost',
  entrepreneur_fuel = 'entrepreneur_fuel',
  employee_wellness = 'employee_wellness',
  resilience_work = 'resilience_work',

  // Addiction, Recovery & Overcoming
  recovery_strength = 'recovery_strength',
  one_day_at_time = 'one_day_at_time',
  freedom_addiction = 'freedom_addiction',
  new_beginnings = 'new_beginnings',
  stay_the_course = 'stay_the_course',
  rebuild_life = 'rebuild_life',

  // Relationships, Love & Connection
  relationships = 'relationships',
  forgiveness_letting_go = 'forgiveness_letting_go',
  compassion_kindness = 'compassion_kindness',
  strengthening_bonds = 'strengthening_bonds',
  healing_broken_heart = 'healing_broken_heart',

  // Gratitude & Joy
  gratitude = 'gratitude',
  joyful_living = 'joyful_living',
  appreciation_presence = 'appreciation_presence',
  celebrate_wins = 'celebrate_wins',

  // Special Categories for First Responders & Helpers
  first_responder_support = 'first_responder_support',
  share_hope = 'share_hope',
  calming_crisis = 'calming_crisis',
  you_matter = 'you_matter',
  crisis_comfort = 'crisis_comfort',
  grounding_tools = 'grounding_tools',

  // Legacy types (keeping for backward compatibility)
  affirmation = 'affirmation',
  attract_love = 'attract_love',
  attract_money = 'attract_money',
  breakups = 'breakups',
  drink_less = 'drink_less',
  law_of_attraction = 'law_of_attraction',
  marriage = 'marriage',
  phone_addiction = 'phone_addiction',
  power_life = 'power_life',
  toxic_relationships = 'toxic_relationships',
}

export enum Role {
  user = 'user',
  assistant = 'assistant',
}

export interface Message {
  id: number;
  content: string;
  role: Role;
}
