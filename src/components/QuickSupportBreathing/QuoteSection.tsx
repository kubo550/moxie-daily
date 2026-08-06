import { getRandomQuote } from '@/infrastructure/qoutes';
import { QuoteType } from '@/types/QuoteType';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function QuoteSection({
  type,
}: {
  type: QuoteType | undefined;
}) {
  const [quote, setQuote] = useState<string>('');
  useEffect(() => {
    const fetchQuote = async () => {
      if (type) {
        const randomQuote = await getRandomQuote(type as QuoteType);
        setQuote(
          randomQuote?.quote || 'You are not alone. Take a deep breath.'
        );
      }
    };
    fetchQuote();
  }, [type]);

  return (
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
  );
}
