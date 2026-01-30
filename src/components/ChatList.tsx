import { Link } from 'react-router-dom';
import { QuoteType } from '@/types/QuoteType.ts';
import { getQuoteTypeName } from '@/utils/quotes.ts';
import { getBackgroundImage } from '@/types/typesBacgroundImages.ts';

type Coach = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const coaches: Coach[] = [
  {
    id: QuoteType.motivation,
    name: getQuoteTypeName(QuoteType.motivation),
    image: getBackgroundImage(QuoteType.motivation),
    description: 'Stay focused and driven',
  },
  {
    id: QuoteType.affirmation,
    name: getQuoteTypeName(QuoteType.affirmation),
    image: getBackgroundImage(QuoteType.affirmation),
    description: 'Build confidence and self-esteem',
  },
  {
    id: QuoteType.devotional,
    name: getQuoteTypeName(QuoteType.devotional),
    image: getBackgroundImage(QuoteType.devotional),
    description: 'Daily devotionals',
  },
  {
    id: QuoteType.anxiety_relief,
    name: getQuoteTypeName(QuoteType.anxiety_relief),
    image: getBackgroundImage(QuoteType.anxiety_relief),
    description: 'Find peace and calm',
  },
  {
    id: QuoteType.build_confidence,
    name: getQuoteTypeName(QuoteType.build_confidence),
    image: getBackgroundImage(QuoteType.build_confidence),
    description: 'Boost your self-worth',
  },
  {
    id: QuoteType.meditation,
    name: getQuoteTypeName(QuoteType.meditation),
    image: getBackgroundImage(QuoteType.meditation),
    description: 'Mindfulness and inner peace',
  },
];

export const ChatList = () => {
  return (
    <div className="text-white px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
        Moxie Coach
      </h1>
      <ul className="space-y-3">
        {coaches.map((coach) => (
          <li key={coach.id}>
            <Link
              to={`/pages/chat/${coach.id}`}
              className="flex items-center bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 border border-white/10 hover:border-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-[1.02] active:scale-95"
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-14 h-14 rounded-full mr-4 object-cover"
              />
              <div className="flex-1 text-left">
                <p className="font-semibold text-base mb-1">{coach.name}</p>
                <p className="text-sm text-gray-300">{coach.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
