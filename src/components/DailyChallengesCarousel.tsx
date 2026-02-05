import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDailyChallenges, Challenge } from '@/config/challenges.ts';
import { QuoteType } from '@/types/QuoteType.ts';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage.ts';
import { Check } from 'lucide-react';

const RECENT_COACHES_KEY = 'recentCoaches';
const COMPLETED_CHALLENGES_KEY = 'completedChallenges';

type CompletedChallenges = {
  date: string;
  challengeIds: string[];
};

export const DailyChallengesCarousel = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const recentCoaches = getFromLocalStorage<QuoteType[]>(RECENT_COACHES_KEY) || [];
    const dailyChallenges = getDailyChallenges(recentCoaches);
    setChallenges(dailyChallenges);

    const today = new Date().toISOString().split('T')[0];
    const savedCompleted = getFromLocalStorage<CompletedChallenges>(COMPLETED_CHALLENGES_KEY);

    if (savedCompleted && savedCompleted.date === today) {
      setCompleted(new Set(savedCompleted.challengeIds));
    } else {
      setCompleted(new Set());
      setToLocalStorage(COMPLETED_CHALLENGES_KEY, { date: today, challengeIds: [] });
    }
  }, []);

  const toggleChallenge = (challengeId: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(challengeId)) {
      newCompleted.delete(challengeId);
    } else {
      newCompleted.add(challengeId);
    }

    setCompleted(newCompleted);

    const today = new Date().toISOString().split('T')[0];
    setToLocalStorage(COMPLETED_CHALLENGES_KEY, {
      date: today,
      challengeIds: Array.from(newCompleted),
    });
  };

  if (challenges.length === 0) {
    return null;
  }

  return (
    <div className="w-screen max-w-screen px-4">
      <h2 className="text-lg font-bold text-white mb-4 text-left md:text-center">
        Today's Challenges
      </h2>

      <div
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        {challenges.map((challenge, index) => {
          const isCompleted = completed.has(challenge.id);

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 snap-start"
              style={{ width: '260px' }}
            >
              <button
                onClick={() => toggleChallenge(challenge.id)}
                className={`w-full h-full text-left transition-all active:scale-95 ${
                  isCompleted ? 'opacity-60' : ''
                }`}
              >
                <div className="relative w-[260px] min-h-[140px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 backdrop-blur-sm border border-white/10 hover:border-white/20 p-4 flex flex-col">
                  {isCompleted && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <div
                        className={`w-4 h-4 rounded border-2 ${
                          isCompleted
                            ? 'bg-green-500 border-green-500'
                            : 'border-white/30'
                        } transition-all`}
                      >
                        {isCompleted && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-white font-semibold text-sm mb-2 ${isCompleted ? 'line-through' : ''}`}>
                        {challenge.title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
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
      `}</style>
    </div>
  );
};
