import { FuelVideo } from '@/types/Fuel.ts';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { shareButtonClass } from '@/components/styles.ts';
import { cn } from '@/lib/utils.ts';

export type FuelOverlayProps = {
  video: FuelVideo;
  muted: boolean;
  onToggleMute: () => void;
  index: number;
  total: number;
  progress: number;
};

export function FuelOverlay({
  video,
  muted,
  onToggleMute,
  index,
  total,
  progress,
}: FuelOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Mute button - top right */}
      <button
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        aria-pressed={muted}
        className={cn(
          shareButtonClass,
          'absolute top-4 right-4 pointer-events-auto'
        )}
      >
        {muted ? (
          <FaVolumeMute className="w-5 h-5" />
        ) : (
          <FaVolumeUp className="w-5 h-5" />
        )}
      </button>

      {/* Counter - top left */}
      <div className="absolute top-4 left-4 text-white/60 text-xs tabular-nums">
        {index + 1} / {total}
      </div>

      {/* Bottom padding clears the globally-mounted crisis FAB, which floats
          over every route and would otherwise sit on top of the caption. */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pb-24 px-4 pt-12">
        {video.title && (
          <h3 className="text-white font-semibold mb-2">{video.title}</h3>
        )}
        {video.caption && (
          <p className="text-white/80 text-sm line-clamp-3">{video.caption}</p>
        )}
      </div>

      {/* Progress bar - bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-full bg-[#8B8DFF] transition-all duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
