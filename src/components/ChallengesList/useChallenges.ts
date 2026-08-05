import {
  getCuratedChallenges,
  getVisibleChallenges,
  groupChallenges,
} from '@/config/challenges';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';
import { useMemo, useState } from 'react';

const COMPLETED_CHALLENGES_KEY = 'completedChallenges';
type CompletedChallenges = {
  date: string;
  challengeIds: string[];
};
export type ChallengeSection = ReturnType<typeof useChallenges>['sections'];

export default function useChallenges() {
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

  return {
    completed,
    sections,
    hasMore,
    showAll,
    allVisible,
    completedInView,
    shown,
    toggleChallenge,
    setShowAll,
  };
}
