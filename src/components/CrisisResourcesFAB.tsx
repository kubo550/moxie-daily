import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';
import { CrisisBottomSheet } from './CrisisBottomSheet.tsx';

/** Query param that opens the sheet on load (used by the old /pages/recovery link). */
export const HELP_SHEET_PARAM = 'help';

export const CrisisResourcesFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (!searchParams.has(HELP_SHEET_PARAM)) {
      return;
    }

    setIsOpen(true);

    // Drop the param straight away so the sheet is not reopened by a refresh
    // or a back navigation.
    const next = new URLSearchParams(searchParams);
    next.delete(HELP_SHEET_PARAM);
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  // Chat pages have their own "Get Help Now" button in the chat header - a FAB
  // here would sit on top of the send button.
  if (location.pathname.startsWith('/pages/chat/')) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-18 md:right-6 z-40 h-14 pl-4 pr-5 bg-gradient-to-br from-red-500/90 to-pink-500/90 hover:from-red-600 hover:to-pink-600 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 group"
        aria-label="Get help now - crisis lines, meetings and recovery support"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <HeartHandshake className="w-6 h-6 text-white group-hover:scale-110 transition-transform flex-shrink-0" />
        <span className="text-white font-semibold text-sm whitespace-nowrap">
          Get Help Now
        </span>
      </button>

      {/* Bottom Sheet Modal */}
      <CrisisBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
