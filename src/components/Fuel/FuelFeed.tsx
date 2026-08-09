import { useEffect, useRef, useCallback } from 'react';
import useFuelFeed from './useFuelFeed.ts';
import { FuelVideoItem } from './FuelVideoItem.tsx';
import { FuelEmptyState } from './FuelEmptyState.tsx';

export function FuelFeed() {
  const {
    videos,
    activeIndex,
    setActiveIndex,
    loading,
    error,
    hasMore,
    loadMore,
    muted,
    toggleMute,
    playbackStateFor,
  } = useFuelFeed();

  const scrollRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for active item detection
  useEffect(() => {
    if (videos.length === 0 || !scrollRef.current) {
      return;
    }

    const items = scrollRef.current.querySelectorAll('[data-index]');
    if (items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Find the entry with the highest intersectionRatio that is intersecting
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting
        );
        if (intersectingEntries.length === 0) {
          return;
        }

        const maxEntry = intersectingEntries.reduce((max, entry) =>
          entry.intersectionRatio > max.intersectionRatio ? entry : max
        );

        const target = maxEntry.target as HTMLElement;
        const indexAttr = target.getAttribute('data-index');
        if (indexAttr !== null) {
          const index = Number(indexAttr);
          if (!Number.isNaN(index)) {
            setActiveIndex(index);
          }
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.6,
      }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos.length, setActiveIndex]);

  // Infinite load
  useEffect(() => {
    if (activeIndex >= videos.length - 2 && hasMore) {
      loadMore();
    }
  }, [activeIndex, videos.length, hasMore, loadMore]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const isArrowDown = event.key === 'ArrowDown';
      const isArrowUp = event.key === 'ArrowUp';
      const isPageDown = event.key === 'PageDown';
      const isPageUp = event.key === 'PageUp';

      if (isArrowDown || isPageDown) {
        event.preventDefault();
        const nextIndex = Math.min(activeIndex + 1, videos.length - 1);
        const element = scrollRef.current?.querySelector(
          `[data-index="${nextIndex}"]`
        );
        if (element instanceof HTMLElement) {
          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;
          element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      } else if (isArrowUp || isPageUp) {
        event.preventDefault();
        const prevIndex = Math.max(activeIndex - 1, 0);
        const element = scrollRef.current?.querySelector(
          `[data-index="${prevIndex}"]`
        );
        if (element instanceof HTMLElement) {
          const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches;
          element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      }
    },
    [activeIndex, videos.length]
  );

  // Loading state
  if (loading && videos.length === 0) {
    return (
      <div className="h-full w-full bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Loading</p>
        </div>
      </div>
    );
  }

  // Only a first-load failure takes over the screen. A pagination error must
  // not tear down a feed the viewer is already watching.
  if (error && videos.length === 0) {
    return (
      <div className="h-full w-full bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && videos.length === 0) {
    return <FuelEmptyState />;
  }

  // Feed
  return (
    <div className="h-full w-full bg-black flex justify-center">
      <div
        ref={scrollRef}
        className="relative h-full w-full sm:max-w-[430px] overflow-y-scroll snap-y snap-mandatory no-scrollbar overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            data-index={index}
            className="snap-start snap-always h-full w-full shrink-0"
          >
            <FuelVideoItem
              video={video}
              state={playbackStateFor(index)}
              muted={muted}
              onToggleMute={toggleMute}
              index={index}
              total={videos.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
