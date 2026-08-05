import { Dispatch, SetStateAction } from 'react';
import ChallengeCard from './ChallengeCard';
import { ChallengeSection } from './useChallenges';
import { Challenge } from '@/config/challenges';
import { Button } from '../ui/button';

export default function ChallengesSection({
  sections,
  completed,
  toggleChallenge,
  hasMore,
  showAll,
  setShowAll,
  allVisible,
  className = 'space-y-6',
}: {
  sections: ChallengeSection;
  completed: Set<string>;
  toggleChallenge: (id: string) => void;
  hasMore: boolean;
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
  allVisible: Challenge[];
  className?: string;
}) {
  return (
    <section className={className}>
      {sections.map((section) => (
        <div key={section.group}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            {section.label}
          </h2>
          <ul className="space-y-3">
            {section.challenges.map((c) => (
              <ChallengeCard
                isCompleted={completed.has(c.id)}
                onToggle={(id) => toggleChallenge(id)}
                title={c.title}
                description={c.description}
                key={c.id}
                id={c.id}
              />
            ))}
          </ul>
        </div>
      ))}
      {hasMore && (
        <Button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full py-7 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors active:scale-95"
        >
          {showAll
            ? 'Show fewer challenges'
            : `Show all ${allVisible.length} challenges`}
        </Button>
      )}
    </section>
  );
}
