import { Link } from 'react-router-dom';
import { QuoteType } from '@/types/QuoteType.ts';
import { getQuoteTypeName } from '@/utils/quotes.ts';
import { getBackgroundImage } from '@/types/typesBacgroundImages.ts';
import { COLORS } from '@/components/styles.ts';

type Coach = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const coaches: Coach[] = [
  {
    id: QuoteType.affirmation,
    name: getQuoteTypeName(QuoteType.affirmation),
    image: getBackgroundImage(QuoteType.affirmation),
    description:
      'personalized affirmations to help you build confidence and self-esteem.',
  },

  {
    id: QuoteType.devotional,
    name: getQuoteTypeName(QuoteType.devotional),
    image: getBackgroundImage(QuoteType.devotional),
    description: 'daily devotionals to inspire and uplift you.',
  },

  {
    id: QuoteType.motivation,
    name: getQuoteTypeName(QuoteType.motivation),
    image: getBackgroundImage(QuoteType.motivation),
    description: 'motivational quotes to help you stay focused and driven.',
  },
];

export const ChatList = () => {
  return (
    <div className="text-white p-3 md:p-6 max-w-xl rounded-[15px] -mt-20">
      <h1
        className="text-2xl font-bold mb-3 md:mb-6 text-left md:py-4"
        color={'#222'}
      >
        Moxie <span color={COLORS.gold}>Coach</span>{' '}
      </h1>
      <ul className="space-y-4">
        {coaches.map((coach) => (
          <li
            key={coach.id}
            className="items-center bg-[#2B2B2B] border border-gray-700 hover:bg-[#3A3A3A] transition backdrop-blur-md rounded-lg p-4 transition text-left"
          >
            <Link
              to={`/pages/chat/${coach.id}`}
              className={'flex items-center'}
            >
              <img
                src={coach.image}
                alt={coach.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold mb-2" color={'#222'}>
                  {coach.name}
                </p>
                <p className="text-sm text-gray-400 text-justify">
                  {coach.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
