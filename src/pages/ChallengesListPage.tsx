import {
  Challenge,
  getCuratedChallenges,
  getVisibleChallenges,
  groupChallenges,
} from '@/config/challenges.ts';
import { useMemo, useState } from 'react';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '@/utils/localStorage.ts';
import { Check } from 'lucide-react';
import HeaderSection from '@/components/Common/HeaderSection';

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
  const [showAll, setShowAll] = useState(false);

  const curated = useMemo(() => getCuratedChallenges(), []);
  const allVisible = useMemo(() => getVisibleChallenges(), []);
  const shown = showAll ? allVisible : curated;
  const sections = useMemo(() => groupChallenges(shown), [shown]);
  const hasMore = allVisible.length > curated.length;

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

  const completedInView = shown.filter((challenge) =>
    completed.has(challenge.id)
  ).length;

  const renderChallenge = (challenge: Challenge) => {
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
            <p className="text-sm text-gray-300">{challenge.description}</p>
          </div>
        </button>
      </li>
    );
  };

  return (
    <div className="min-h-full pb-20">
      <div className="text-white px-4 py-6 max-w-2xl mx-auto">
        <HeaderSection
          title="Daily Challenges"
          desc="Small steps, big changes. Pick one - that's enough for today"
        />
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.group}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {section.label}
              </h2>
              <ul className="space-y-3">
                {section.challenges.map(renderChallenge)}
              </ul>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 w-full py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors active:scale-95"
          >
            {showAll
              ? 'Show fewer challenges'
              : `Show all ${allVisible.length} challenges`}
          </button>
        )}

        {/* Progress indicator */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-center text-white text-sm">
            <span className="text-2xl font-bold text-blue-400">
              {completedInView}
            </span>
            <span className="text-gray-400">
              {' '}
              / {shown.length} completed today
            </span>
          </p>
          {completedInView === shown.length && shown.length > 0 && (
            <p className="text-center text-green-400 text-xs mt-2">
              That&apos;s everything for today. Well done. 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
