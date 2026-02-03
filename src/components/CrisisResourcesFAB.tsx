import { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { CrisisBottomSheet } from './CrisisBottomSheet.tsx';

export const CrisisResourcesFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 bg-gradient-to-br from-red-500/90 to-pink-500/90 hover:from-red-600 hover:to-pink-600 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center group"
        aria-label="Crisis Resources"
      >
        <HeartHandshake className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Bottom Sheet Modal */}
      <CrisisBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
