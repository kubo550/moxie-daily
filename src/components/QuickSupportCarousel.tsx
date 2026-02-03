import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QUICK_SUPPORT_ITEMS } from '@/config/quickSupport.ts';

export const QuickSupportCarousel = () => {
  return (
    <div className="w-screen max-w-screen px-4">
      <h2 className="text-lg font-bold text-white mb-4 text-left md:text-center">
        Quick Support
      </h2>

      <div
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory touch-pan-x -mx-4 px-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {QUICK_SUPPORT_ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 snap-start"
            style={{ width: '180px' }}
          >
            <Link
              to={`/pages/support/${item.coachType}`}
              className="block w-full group"
            >
              <div
                className={`relative w-[180px] h-[120px] rounded-xl overflow-hidden mb-2 bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 transition-all active:scale-95 hover:border-white/20 p-4 flex flex-col justify-between`}
              >
                <div className="text-4xl">{item.emoji}</div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-xs">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-1" />
      </div>

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
