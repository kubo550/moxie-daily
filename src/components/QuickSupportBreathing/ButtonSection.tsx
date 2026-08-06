import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';
import { QuoteType } from '@/types/QuoteType';
import { getCoachLabel } from '@/config/coaches';

export function ButtonSection({
  isBreathing,
  startBreathing,
  type,
  className = '',
}: {
  isBreathing: boolean;
  startBreathing: () => void;
  type: QuoteType | undefined;
  className?: string;
}) {
  const coachLabel = type ? getCoachLabel(type as QuoteType) : 'a coach';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={className}
    >
      <Button
        onClick={startBreathing}
        disabled={isBreathing}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-6 text-base font-medium rounded-xl"
      >
        {isBreathing ? 'Breathing...' : 'Take 3 Deep Breaths'}
      </Button>

      <Link to={`/pages/chat/${type}`} className="block w-full">
        <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-6 text-base font-medium rounded-xl justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Talk to {coachLabel}
        </Button>
      </Link>

      <Link to="/" className="block w-full">
        <Button
          variant="ghost"
          className="w-full text-white/60 hover:text-white hover:bg-white/5 py-6 text-base justify-center"
        >
          Get Another Quote
        </Button>
      </Link>
    </motion.div>
  );
}
