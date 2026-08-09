import { FuelVideo, FuelPlaybackState } from '@/types/Fuel.ts';
import { FuelOverlay } from './FuelOverlay.tsx';
import { FaPlay } from 'react-icons/fa';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils.ts';

export type FuelVideoItemProps = {
  video: FuelVideo;
  state: FuelPlaybackState;
  muted: boolean;
  onToggleMute: () => void;
  index: number;
  total: number;
};

export function FuelVideoItem({
  video,
  state,
  muted,
  onToggleMute,
  index,
  total,
}: FuelVideoItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Idle items never mount a <video>, so anything reading the ref has to wait
  // for the element to exist.
  const isMounted = state !== 'idle';
  const shouldPlay = state === 'active' && !userPaused && !prefersReducedMotion;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!shouldPlay) {
      el.pause();
      return;
    }

    el.play()
      .then(() => setBlocked(false))
      .catch(() => setBlocked(true));
  }, [shouldPlay, isMounted]);

  // Leaving the active slot rewinds, so a clip scrolled back to starts from
  // the top. A user-driven pause must not rewind - that would turn
  // tap-to-pause into tap-to-restart.
  useEffect(() => {
    if (state === 'active') return;

    setUserPaused(false);
    setBlocked(false);
    setProgress(0);

    const el = videoRef.current;
    if (el) {
      el.currentTime = 0;
    }
  }, [state]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleTimeUpdate = () => {
      if (el.duration > 0) {
        setProgress(el.currentTime / el.duration);
      }
    };

    el.addEventListener('timeupdate', handleTimeUpdate);
    return () => el.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isMounted]);

  // A blocked autoplay leaves `shouldPlay` true while the element sits paused,
  // so the indicator has to account for it or the clip just looks frozen.
  const showPlayIndicator = state === 'active' && (!shouldPlay || blocked);

  const handleTogglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    // A real tap is exactly what the autoplay policy was holding out for, so
    // retry directly rather than routing back through `userPaused`.
    if (blocked) {
      el.play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
      return;
    }

    setUserPaused((paused) => !paused);
  };

  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      {!isMounted ? (
        video.posterUrl ? (
          <img
            src={video.posterUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-black" />
        )
      ) : (
        <>
          {/* Native <video> plays `file` sources today. An `hls` source will
              need hls.js on every browser but Safari once a streaming host is
              plugged in. */}
          <video
            ref={videoRef}
            src={video.source.url}
            className="h-full w-full object-cover"
            playsInline
            loop
            muted={muted}
            poster={video.posterUrl}
            preload={state === 'active' ? 'auto' : 'metadata'}
          />

          <button
            onClick={handleTogglePlay}
            aria-label={showPlayIndicator ? 'Play video' : 'Pause video'}
            className={cn(
              'absolute inset-0 h-full w-full bg-transparent',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset'
            )}
          />

          {showPlayIndicator && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/40">
                <FaPlay className="w-6 h-6 text-white" />
              </div>
            </div>
          )}

          <FuelOverlay
            video={video}
            muted={muted}
            onToggleMute={onToggleMute}
            index={index}
            total={total}
            progress={progress}
          />
        </>
      )}
    </div>
  );
}
