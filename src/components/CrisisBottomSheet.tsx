import { X, Phone, MessageSquare, Globe, AlertCircle, Heart, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CrisisBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CrisisBottomSheet = ({ isOpen, onClose }: CrisisBottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-b from-gray-900 to-gray-900/95 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">
                    Crisis Resources
                  </h2>
                  <p className="text-gray-400 text-xs">
                    24/7 support available
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-4">
              {/* Emergency */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-red-400 font-semibold mb-1">
                      Emergency: 911
                    </h3>
                    <p className="text-gray-300 text-sm">
                      For immediate danger or medical emergencies
                    </p>
                  </div>
                </div>
              </div>

              {/* 988 Lifeline */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      988 Suicide & Crisis Lifeline
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      24/7 support for emotional distress & crisis
                    </p>
                    <a
                      href="tel:988"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      Call 988
                    </a>
                  </div>
                </div>
              </div>

              {/* Crisis Text Line */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      Crisis Text Line
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Free, confidential texting support
                    </p>
                    <p className="text-green-400 text-sm font-medium">
                      Text HOME to 741741
                    </p>
                  </div>
                </div>
              </div>

              {/* SAMHSA */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      SAMHSA National Helpline
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Substance use & mental health support
                    </p>
                    <a
                      href="tel:1-800-662-4357"
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      1-800-662-HELP (4357)
                    </a>
                  </div>
                </div>
              </div>

              {/* AA */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      Alcoholics Anonymous (AA)
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Find local meetings & support groups
                    </p>
                    <a
                      href="https://www.aa.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium"
                    >
                      <Globe className="w-4 h-4" />
                      aa.org
                    </a>
                  </div>
                </div>
              </div>

              {/* NA */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      Narcotics Anonymous (NA)
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Recovery support for drug addiction
                    </p>
                    <a
                      href="https://www.na.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium"
                    >
                      <Globe className="w-4 h-4" />
                      na.org
                    </a>
                  </div>
                </div>
              </div>

              {/* NAMI */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      NAMI Helpline
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      National Alliance on Mental Illness support
                    </p>
                    <a
                      href="tel:1-800-950-6264"
                      className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      1-800-950-NAMI (6264)
                    </a>
                  </div>
                </div>
              </div>

              {/* Veterans */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">
                      Veterans Crisis Line
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Crisis support for veterans
                    </p>
                    <a
                      href="tel:988"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      988 (press 1)
                    </a>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-gray-500 text-xs text-center leading-relaxed">
                  These resources are provided for informational purposes. If you're in immediate danger, please call 911.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
