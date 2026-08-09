import { useCallback, useEffect, useRef, useState } from 'react';
import { FuelVideo, FuelPlaybackState, FuelPage } from '@/types/Fuel.ts';
import { getFuelProvider } from '@/infrastructure/fuelProvider.ts';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '@/utils/localStorage.ts';

export type UseFuelFeed = {
  videos: FuelVideo[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  muted: boolean;
  toggleMute: () => void;
  playbackStateFor: (index: number) => FuelPlaybackState;
};

export default function useFuelFeed(): UseFuelFeed {
  const [videos, setVideos] = useState<FuelVideo[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [muted, setMuted] = useState(() => {
    const stored = getFromLocalStorage<boolean>('fuelMuted');
    return stored === null ? true : stored;
  });

  const loadingRef = useRef(false);
  const strictModeGuardRef = useRef(false);

  // Initial load
  useEffect(() => {
    if (strictModeGuardRef.current) {
      return;
    }
    strictModeGuardRef.current = true;

    const fetchInitial = async () => {
      try {
        setLoading(true);
        setError(null);
        const page: FuelPage = await getFuelProvider().list();
        setVideos(page.items);
        setNextCursor(page.nextCursor);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load videos';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  const loadMore = useCallback(() => {
    if (loadingRef.current || nextCursor === null) {
      return;
    }

    loadingRef.current = true;

    const fetchMore = async () => {
      try {
        const page: FuelPage = await getFuelProvider().list(nextCursor, 5);
        setVideos((prev) => [...prev, ...page.items]);
        setNextCursor(page.nextCursor);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load more videos';
        setError(message);
      } finally {
        loadingRef.current = false;
      }
    };

    fetchMore();
  }, [nextCursor]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const newValue = !prev;
      setToLocalStorage('fuelMuted', newValue);
      return newValue;
    });
  }, []);

  const playbackStateFor = useCallback(
    (index: number): FuelPlaybackState => {
      if (index === activeIndex) {
        return 'active';
      }
      if (
        index === activeIndex - 1 ||
        (index > activeIndex && index <= activeIndex + 2)
      ) {
        return 'warm';
      }
      return 'idle';
    },
    [activeIndex]
  );

  return {
    videos,
    activeIndex,
    setActiveIndex,
    loading,
    error,
    hasMore: nextCursor !== null,
    loadMore,
    muted,
    toggleMute,
    playbackStateFor,
  };
}
