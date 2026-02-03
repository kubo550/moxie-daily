import { CHALLENGES } from '@/config/challenges.ts';
import { useState } from 'react';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '@/utils/localStorage.ts';
import { Check } from 'lucide-react';

const COMPLETED_CHALLENGES_KEY = 'completedChallenges';

type CompletedChallenges = {
  date: string;
  challengeIds: string[];
};

export const ChallengesListPage = () => {
  const today = new Date().toISOString().split('T')[0];
  const savedCompleted = getFromLocalStorage<CompletedChallenges>(
    COMPLETED_CHALLENGES_KEY
  );

  const [completed, setCompleted] = useState<Set<string>>(
    new Set(
      savedCompleted && savedCompleted.date === today
        ? savedCompleted.challengeIds
        : []
    )
  );

  const toggleChallenge = (challengeId: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(challengeId)) {
      newCompleted.delete(challengeId);
    } else {
      newCompleted.add(challengeId);
    }

    setCompleted(newCompleted);
    setToLocalStorage(COMPLETED_CHALLENGES_KEY, {
      date: today,
      challengeIds: Array.from(newCompleted),
    });
  };

  return (
    <div className="min-h-screen pt-[60px] pb-[80px]">
      <div className="text-white px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-left">
          Daily Challenges
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Small steps, big changes. Complete challenges to build better habits.
        </p>

        <ul className="space-y-3">
          {CHALLENGES.map((challenge) => {
            const isCompleted = completed.has(challenge.id);

            return (
              <li key={challenge.id}>
                <button
                  onClick={() => toggleChallenge(challenge.id)}
                  className={`w-full text-left flex items-start gap-4 bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 border border-white/10 hover:border-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-[1.01] active:scale-95 ${
                    isCompleted ? 'opacity-60' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-500 border-green-500'
                          : 'border-white/30 bg-transparent'
                      }`}
                    >
                      {isCompleted && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p
                      className={`font-semibold text-base mb-1 ${isCompleted ? 'line-through' : ''}`}
                    >
                      {challenge.title}
                    </p>
                    <p className="text-sm text-gray-300">
                      {challenge.description}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Progress indicator */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-center text-white text-sm">
            <span className="text-2xl font-bold text-blue-400">
              {completed.size}
            </span>
            <span className="text-gray-400">
              {' '}
              / {CHALLENGES.length} completed today
            </span>
          </p>
          {completed.size === CHALLENGES.length && (
            <p className="text-center text-green-400 text-xs mt-2">
              Amazing! You've completed all challenges! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
