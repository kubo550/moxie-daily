export enum QuoteType {
  affirmation = 'affirmation',
  anxiety_relief = 'anxiety_relief',
  attract_love = 'attract_love',
  attract_money = 'attract_money',
  breakups = 'breakups',
  build_confidence = 'build_confidence',
  devotional = 'devotional',
  discipline = 'discipline',
  drink_less = 'drink_less',
  focus = 'focus',
  hard_times = 'hard_times',
  law_of_attraction = 'law_of_attraction',
  lose_weight = 'lose_weight',
  love_yourself = 'love_yourself',
  marriage = 'marriage',
  meditation = 'meditation',
  mental_health = 'mental_health',
  motivation = 'motivation',
  personal_growth = 'personal_growth',
  phone_addiction = 'phone_addiction',
  positive_mindset = 'positive_mindset',
  power_life = 'power_life',
  relationships = 'relationships',
  success_mindset = 'success_mindset',
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
