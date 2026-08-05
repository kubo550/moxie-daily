import ChallengesSection from '@/components/ChallengesList/ChallengesSection';
import ProgressSection from '@/components/ChallengesList/ProgressSection';
import useChallenges from '@/components/ChallengesList/useChallenges';
import HeaderSection from '@/components/Common/HeaderSection';

export const ChallengesListPage = () => {
  const {
    sections,
    hasMore,
    showAll,
    setShowAll,
    allVisible,
    completedInView,
    shown,
    toggleChallenge,
    completed,
  } = useChallenges();

  return (
    <div className="min-h-full flex w-full items-center justify-center">
      <div className="text-white p-2 max-w-2xl flex flex-col gap-6 pb-25">
        <HeaderSection
          title="Small steps, big changes. Pick one - that's enough for today."
          desc="Small steps, big changes. Pick one - that's enough for today"
        />
        <ChallengesSection
          setShowAll={setShowAll}
          sections={sections}
          completed={completed}
          toggleChallenge={toggleChallenge}
          hasMore={hasMore}
          showAll={showAll}
          allVisible={allVisible}
        />

        <ProgressSection completed={completedInView} shown={shown} />
      </div>
    </div>
  );
};
