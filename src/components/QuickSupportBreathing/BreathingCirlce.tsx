import { motion } from 'framer-motion';

export function BreathingnCircle({
  isBreathing,
  duration,
}: {
  isBreathing: boolean;
  duration: number;
}) {
  return (
    <div className="mb-12">
      <motion.div
        animate={
          isBreathing
            ? {
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }
            : {}
        }
        transition={
          isBreathing
            ? {
                duration: duration,
                repeat: 2,
                ease: 'easeInOut',
              }
            : {}
        }
        className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-lg border border-white/20 flex items-center justify-center"
      >
        <div className="text-center">
          {isBreathing ? (
            <p className="text-white text-sm font-medium">Breathe</p>
          ) : (
            <p className="text-white/60 text-sm">Ready?</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
