import { Link } from 'react-router-dom';
import { getBackgroundImage } from '@/types/typesBacgroundImages.ts';
import { motion } from 'framer-motion';
import { COACHES } from '@/config/coaches.ts';

export const ChatCarousel = () => {
  return (
    <div className="w-screen max-w-screen px-4">
      <h2 className="text-lg font-bold text-white mb-4 text-left md:text-center">
        AI Coaches
      </h2>

      {/* Horizontal scrollable container - shows ~2.8 cards on mobile */}
      <div
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory touch-pan-x -mx-4 px-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {COACHES.map((coach, index) => (
          <motion.div
            key={coach.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 snap-start"
            style={{ width: '130px' }}
          >
            <Link to={`/pages/chat/${coach.id}`} className="block w-full group">
              {/* Image container */}
              <div className="relative w-[130px] h-[130px] rounded-lg overflow-hidden mb-2 bg-gray-800 transition-transform active:scale-95">
                <img
                  src={getBackgroundImage(coach.id)}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              {/* Coach info */}
              <h3 className="text-white font-semibold text-xs mb-0.5 truncate">
                {coach.name}
              </h3>
              <p className="text-gray-400 text-[11px] line-clamp-1">
                {coach.description}
              </p>
            </Link>
          </motion.div>
        ))}
        {/* Add spacer at the end for better scrolling */}
        <div className="flex-shrink-0 w-1" />
      </div>

      {/* Custom scrollbar hide styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .touch-pan-x {
          touch-action: pan-x;
        }
      `}</style>
    </div>
  );
};
