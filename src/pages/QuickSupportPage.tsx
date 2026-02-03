import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuoteType } from '@/types/QuoteType.ts';
import { getRandomQuote } from '@/infrastructure/qoutes.ts';
import { Button } from '@/components/ui/button.tsx';
import { MessageCircle, Home } from 'lucide-react';
import { getQuoteTypeName } from '@/utils/quotes.ts';

const BREATHING_ANIMATION_DURATION = 4;

export const QuickSupportPage = () => {
  const { type } = useParams<{ type: QuoteType }>();
  const [quote, setQuote] = useState<string>('');
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      if (type) {
        const randomQuote = await getRandomQuote(type as QuoteType);
        setQuote(randomQuote?.quote || 'You are not alone. Take a deep breath.');
      }
    };
    fetchQuote();
  }, [type]);

  const startBreathing = () => {
    setIsBreathing(true);
    setTimeout(() => setIsBreathing(false), BREATHING_ANIMATION_DURATION * 3 * 1000);
  };

  const coachName = type ? getQuoteTypeName(type as QuoteType) : 'Support';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header */}
      <div className="pt-16 px-4 pb-6 text-center">
        <Link to="/" className="inline-block mb-4">
          <Home className="w-6 h-6 text-white/60 hover:text-white transition-colors" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Quick Support
        </h1>
        <p className="text-gray-400 text-sm">
          Take a moment. You're in the right place.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        {/* Breathing Circle */}
        <div className="mb-12">
          <motion.div
            animate={isBreathing ? {
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            } : {}}
            transition={isBreathing ? {
              duration: BREATHING_ANIMATION_DURATION,
              repeat: 2,
              ease: "easeInOut"
            } : {}}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-lg border border-white/20 flex items-center justify-center"
          >
            <div className="text-center">
              {isBreathing ? (
                <p className="text-white text-sm font-medium">
                  Breathe
                </p>
              ) : (
                <p className="text-white/60 text-sm">
                  Ready?
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mb-8"
        >
          <p className="text-white text-lg md:text-xl text-center leading-relaxed font-light italic">
            "{quote}"
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-sm space-y-3 mx-auto"
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
              Talk to {coachName} Coach
            </Button>
          </Link>

          <Link to="/" className="block w-full">
            <Button variant="ghost" className="w-full text-white/60 hover:text-white hover:bg-white/5 py-6 text-base justify-center">
              Get Another Quote
            </Button>
          </Link>
        </motion.div>

        {/* Subtle Reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 text-xs text-center mt-8 max-w-xs"
        >
          Remember: This moment is temporary. You have the strength to get through it.
        </motion.p>
      </div>
    </div>
  );
};
