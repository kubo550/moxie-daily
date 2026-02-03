import { Link } from 'react-router-dom';
import { getBackgroundImage } from '@/types/typesBacgroundImages.ts';
import { COACHES } from '@/config/coaches.ts';

export const ChatList = () => {
  return (
    <div className="text-white px-4 py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-left">
        Moxie Coach
      </h1>
      <ul className="space-y-3">
        {COACHES.map((coach) => (
          <li key={coach.id}>
            <Link
              to={`/pages/chat/${coach.id}`}
              className="flex items-center bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 border border-white/10 hover:border-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-[1.02] active:scale-95"
            >
              <img
                src={getBackgroundImage(coach.id)}
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
