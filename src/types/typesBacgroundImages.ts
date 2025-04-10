import { QuoteType } from '@/types/QuoteType.ts';
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

export const getBackgroundImage = (type: QuoteType) => {
  return backgroundImages[type];
};

const backgroundImages = {
  [QuoteType.affirmation]: affirmation,
  [QuoteType.anxiety_relief]: anxiety_relief,
  [QuoteType.attract_love]: attract_love,
  [QuoteType.attract_money]: attract_money,
  [QuoteType.breakups]: breakups,
  [QuoteType.build_confidence]: build_confidence,
  [QuoteType.devotional]: devotional,
  [QuoteType.discipline]: discipline,
  [QuoteType.drink_less]: drink_less,
  [QuoteType.focus]: focus,
  [QuoteType.hard_times]: hard_times,
  [QuoteType.law_of_attraction]: law_of_attraction,
  [QuoteType.lose_weight]: lose_weight,
  [QuoteType.love_yourself]: love_yourself,
  [QuoteType.marriage]: marriage,
  [QuoteType.meditation]: meditation,
  [QuoteType.mental_health]: mental_health,
  [QuoteType.motivation]: motivation,
  [QuoteType.personal_growth]: personal_growth,
  [QuoteType.phone_addiction]: phone_addiction,
  [QuoteType.positive_mindset]: positive_mindset,
  [QuoteType.power_life]: power_life,
  [QuoteType.relationships]: relationships,
  [QuoteType.success_mindset]: success_mindset,
  [QuoteType.toxic_relationships]: toxic_relationships,
} as const;
