import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import {
  AlertCircle,
  ExternalLink,
  Globe,
  Heart,
  type LucideIcon,
  MessageCircle,
  MessageSquare,
  Phone,
  Shield,
  Users,
  X,
} from 'lucide-react';
import {
  CRISIS_LINES,
  FALLBACK_RECOVERY_AFFIRMATIONS,
  NATIONAL_RECOVERY_RESOURCES,
  RECOVERY_QUOTE_TYPES,
  getOrgSupportResources,
  type SupportIcon,
  type SupportResource,
  type SupportTone,
} from '@/config/recoverySupport.ts';
import { getQuotesByType } from '@/infrastructure/qoutes.ts';
import { randomElement } from '@/utils/functions.ts';
import { QuoteType } from '@/types/QuoteType.ts';
import { cn } from '@/lib/utils.ts';

const ICONS: Record<SupportIcon, LucideIcon> = {
  phone: Phone,
  text: MessageSquare,
  globe: Globe,
  heart: Heart,
  shield: Shield,
  users: Users,
};

const TONES: Record<SupportTone, { icon: string; action: string }> = {
  red: { icon: 'text-red-400', action: 'text-red-300' },
  blue: { icon: 'text-blue-400', action: 'text-blue-300' },
  green: { icon: 'text-green-400', action: 'text-green-300' },
  purple: { icon: 'text-purple-400', action: 'text-purple-300' },
  amber: { icon: 'text-amber-400', action: 'text-amber-300' },
  teal: { icon: 'text-teal-300', action: 'text-teal-200' },
  pink: { icon: 'text-pink-400', action: 'text-pink-300' },
  cyan: { icon: 'text-cyan-400', action: 'text-cyan-300' },
};

const DISMISS_OFFSET = 120;
const DISMISS_VELOCITY = 600;

type CrisisBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CrisisBottomSheet = ({
  isOpen,
  onClose,
}: CrisisBottomSheetProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);
  const affirmation = useRecoveryAffirmation(isOpen);

  // Kept in a ref so the focus effect below only depends on `isOpen` — callers
  // pass an inline arrow, which would otherwise re-run it on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    sheetRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !sheetRef.current) {
        return;
      }

      // Keep Tab inside the sheet while it covers the page.
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable.length) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === sheetRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const orgResources = getOrgSupportResources();
  const recoveryResources = [...orgResources, ...NATIONAL_RECOVERY_RESOURCES];
  // Chat pages already are the coach — no point sending them to another one.
  const showCoachButton = !location.pathname.startsWith('/pages/chat/');

  const openRecoveryCoach = () => {
    onClose();
    navigate(`/pages/chat/${QuoteType.recovery_strength}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-sheet-title"
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (
                info.offset.y > DISMISS_OFFSET ||
                info.velocity.y > DISMISS_VELOCITY
              ) {
                onClose();
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[88dvh] flex-col rounded-t-3xl bg-gradient-to-b from-gray-900 to-black shadow-2xl outline-none"
          >
            {/* Grab handle — drags the sheet away without hijacking the scroll below */}
            <div
              onPointerDown={(event) => dragControls.start(event)}
              className="flex shrink-0 cursor-grab touch-none justify-center pt-3 pb-1 active:cursor-grabbing"
            >
              <div
                aria-hidden="true"
                className="h-1.5 w-10 rounded-full bg-white/25"
              />
            </div>

            <div className="mx-auto flex w-full max-w-2xl shrink-0 items-center justify-between gap-3 border-b border-white/10 px-6 pb-4 text-left">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="min-w-0">
                  <h2
                    id="help-sheet-title"
                    className="text-lg font-semibold text-white"
                  >
                    Get Help
                  </h2>
                  <p className="truncate text-xs text-gray-400">
                    Crisis lines, meetings & recovery support — free, 24/7
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="mx-auto w-full max-w-2xl flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-left">
              <section className="space-y-3">
                <SectionTitle>If you need help right now</SectionTitle>
                {CRISIS_LINES.map((resource) => (
                  <ResourceCard key={resource.label} resource={resource} />
                ))}
              </section>

              <section className="space-y-3">
                <SectionTitle>Meetings & ongoing support</SectionTitle>
                {recoveryResources.map((resource) => (
                  <ResourceCard key={resource.label} resource={resource} />
                ))}
              </section>

              {showCoachButton && (
                <button
                  onClick={openRecoveryCoach}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 font-semibold text-white transition-colors hover:bg-white/15 active:scale-[0.99]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Talk to the Recovery Coach
                </button>
              )}

              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-gray-800/60 to-black/60 p-4 text-center">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  One day at a time
                </p>
                <p className="text-sm italic text-gray-200">
                  &ldquo;{affirmation}&rdquo;
                </p>
              </div>

              <p className="border-t border-white/10 pt-4 text-center text-xs leading-relaxed text-gray-500">
                These resources are provided for informational purposes. If
                you&rsquo;re in immediate danger, please call 911.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
    {children}
  </h3>
);

const ResourceCard = ({ resource }: { resource: SupportResource }) => {
  const Icon = ICONS[resource.icon];
  const tone = TONES[resource.tone];
  const isExternal = resource.href?.startsWith('http');

  const content = (
    <div className="flex items-start gap-3">
      <Icon
        aria-hidden="true"
        className={cn('mt-0.5 h-5 w-5 shrink-0', tone.icon)}
      />
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-white">{resource.label}</h4>
        <p className="mt-0.5 text-sm text-gray-300">{resource.description}</p>
        <span
          className={cn(
            'mt-2 inline-flex items-center gap-1.5 text-sm font-medium',
            tone.action
          )}
        >
          {resource.action}
          {isExternal && <ExternalLink className="h-3.5 w-3.5" />}
        </span>
      </div>
    </div>
  );

  const className = cn(
    'block rounded-xl border p-4 transition-colors',
    resource.highlight
      ? 'border-teal-400/30 bg-gradient-to-br from-teal-500/20 to-blue-500/20'
      : 'border-white/10 bg-white/5'
  );

  // Whole card is the tap target when there is somewhere to go.
  if (!resource.href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={resource.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(className, 'hover:bg-white/10 active:scale-[0.99]')}
    >
      {content}
    </a>
  );
};

/** A single recovery affirmation, refreshed each time the sheet is opened. */
const useRecoveryAffirmation = (isOpen: boolean) => {
  const [affirmation, setAffirmation] = useState(() =>
    randomElement(FALLBACK_RECOVERY_AFFIRMATIONS)
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;
    (async () => {
      const quotes = await getQuotesByType(RECOVERY_QUOTE_TYPES);
      // getQuotesByType falls back to generic affirmations on a DB error, so
      // re-check the type before showing them as recovery content.
      const recoveryQuotes = quotes.filter((quote) =>
        RECOVERY_QUOTE_TYPES.includes(quote.type)
      );

      if (!cancelled && recoveryQuotes.length) {
        setAffirmation(randomElement(recoveryQuotes).quote);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  return affirmation;
};
