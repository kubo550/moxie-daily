import {
  FALLBACK_RECOVERY_AFFIRMATIONS,
  RECOVERY_QUOTE_TYPES,
} from '@/config/recoverySupport';
import { getQuotesByType } from '@/infrastructure/qoutes';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

export default function QuoteSection({ className }: { className?: string }) {
  const AFFIRMATIONS_SHOWN = 5;
  const [affirmations, setAffirmations] = useState<string[]>(
    FALLBACK_RECOVERY_AFFIRMATIONS
  );
  useEffect(() => {
    (async () => {
      const quotes = await getQuotesByType(RECOVERY_QUOTE_TYPES);
      // getQuotesByType falls back to generic affirmations on a DB error, so
      // re-check the type before showing them as recovery content.
      const recoveryQuotes = quotes.filter((quote) =>
        RECOVERY_QUOTE_TYPES.includes(quote.type)
      );

      if (recoveryQuotes.length) {
        setAffirmations(
          recoveryQuotes.slice(0, AFFIRMATIONS_SHOWN).map((q) => q.quote)
        );
      }
    })();
  }, []);

  return (
    <section className={cn(className, 'flex flex-col gap-3')}>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
        One Day at a Time
      </h2>

      {affirmations.map((affirmation, index) => (
        <motion.div
          key={`${index}-${affirmation}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className=""
        >
          <Card
            className="bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 border border-white/10 p-3"
            key={`${index}-${affirmation}`}
          >
            <CardContent className="text-gray-200 text-sm font-semibold italic">
              &ldquo;{affirmation}&rdquo;
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
