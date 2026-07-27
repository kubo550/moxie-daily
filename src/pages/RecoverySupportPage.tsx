import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, MessageCircle, Phone, Users } from 'lucide-react';
import { APP_CONFIG } from '@/config/appConfig.ts';
import {
  FALLBACK_RECOVERY_AFFIRMATIONS,
  NATIONAL_RECOVERY_RESOURCES,
  RECOVERY_QUOTE_TYPES,
} from '@/config/recoverySupport.ts';
import { getQuotesByType } from '@/infrastructure/qoutes.ts';
import { QuoteType } from '@/types/QuoteType.ts';

const AFFIRMATIONS_SHOWN = 5;

const cardClass =
  'bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3';

export const RecoverySupportPage = () => {
  const [affirmations, setAffirmations] = useState<string[]>(
    FALLBACK_RECOVERY_AFFIRMATIONS
  );
  const { meetingFinderUrl, sponsorContact } = APP_CONFIG.recoveryResources;

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
    <div className="min-h-screen pt-[60px] pb-[100px]">
      <div className="text-white px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-left">
          Recovery Support
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          One day at a time. Everything here is free and available right now.
        </p>

        {/* Org-specific support first - it is the closest help available */}
        {(sponsorContact || meetingFinderUrl) && (
          <div className="space-y-3 mb-6">
            {sponsorContact && (
              <a
                href={`tel:${sponsorContact.phone}`}
                className="block bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-400/30 rounded-xl p-4 transition-all active:scale-95"
              >
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold mb-1">
                      {sponsorContact.label}
                    </h2>
                    <p className="text-teal-200 text-sm">
                      {sponsorContact.phone}
                    </p>
                  </div>
                </div>
              </a>
            )}

            {meetingFinderUrl && (
              <a
                href={meetingFinderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-teal-500/20 to-blue-500/20 border border-teal-400/30 rounded-xl p-4 transition-all active:scale-95"
              >
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold mb-1">
                      Find a meeting near you
                    </h2>
                    <p className="text-teal-200 text-sm">Local meeting finder</p>
                  </div>
                </div>
              </a>
            )}
          </div>
        )}

        {/* Meetings & helplines */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Meetings & Helplines
        </h2>
        <ul className="space-y-3 mb-8">
          {NATIONAL_RECOVERY_RESOURCES.map((resource) => {
            const isPhone = resource.href.startsWith('tel:');

            return (
              <li key={resource.label}>
                <div className={cardClass}>
                  {isPhone ? (
                    <Phone className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Globe className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{resource.label}</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      {resource.description}
                    </p>
                    <a
                      href={resource.href}
                      target={isPhone ? undefined : '_blank'}
                      rel={isPhone ? undefined : 'noopener noreferrer'}
                      className={`inline-flex items-center gap-2 text-sm font-medium ${
                        isPhone
                          ? 'text-purple-400 hover:text-purple-300'
                          : 'text-amber-400 hover:text-amber-300'
                      }`}
                    >
                      {resource.linkText}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Affirmations */}
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          One Day at a Time
        </h2>
        <div className="space-y-2 mb-8">
          {affirmations.map((affirmation, index) => (
            <motion.p
              key={`${index}-${affirmation}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-200 italic"
            >
              &ldquo;{affirmation}&rdquo;
            </motion.p>
          ))}
        </div>

        <Link
          to={`/pages/chat/${QuoteType.recovery_strength}`}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-base font-medium transition-colors active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          Talk to the Recovery Coach
        </Link>
      </div>
    </div>
  );
};
