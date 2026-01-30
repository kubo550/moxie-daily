import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuoteTypeName } from '@/utils/quotes.ts';
import { CATEGORIES } from '@/infrastructure/qoutes.ts';
import { QuoteType } from '@/types/QuoteType.ts';
import { getCategoryImage } from '@/types/typesBacgroundImages.ts';

interface QuotesModalContentProps {
  selectedTypes: string[];
  handleQuoteTypeSelect: (type: QuoteType) => void;
  handleQuoteTypeRemove: (type: QuoteType) => void;
}

export const QuotesModalContent: React.FC<QuotesModalContentProps> = ({
  selectedTypes,
  handleQuoteTypeSelect,
  handleQuoteTypeRemove,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getSelectedCountInCategory = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return 0;
    return category.subcategories.filter((type) =>
      selectedTypes.includes(type)
    ).length;
  };

  const areAllSelectedInCategory = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return false;
    return category.subcategories.every((type) => selectedTypes.includes(type));
  };

  const handleSubcategoryToggle = (type: QuoteType) => {
    if (selectedTypes.includes(type)) {
      handleQuoteTypeRemove(type);
    } else {
      handleQuoteTypeSelect(type);
    }
  };

  const handleSelectAllInCategory = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return;

    // Remove condition check - handlers read from localStorage directly
    // and are idempotent, so safe to call even if already selected
    category.subcategories.forEach((type) => {
      handleQuoteTypeSelect(type);
    });
  };

  const handleDeselectAllInCategory = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return;

    // Remove condition check - handlers read from localStorage directly
    // and are idempotent, so safe to call even if already deselected
    category.subcategories.forEach((type) => {
      handleQuoteTypeRemove(type);
    });
  };

  return (
    <div className="flex flex-col gap-3 py-4">
      {CATEGORIES.map((category) => {
        const isExpanded = expandedCategory === category.id;
        const selectedCount = getSelectedCountInCategory(category.id);
        const allSelected = areAllSelectedInCategory(category.id);
        const noneSelected = selectedCount === 0;

        return (
          <div key={category.id} className="flex flex-col">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="relative w-full h-20 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98] transition-transform"
            >
              {/* Background Image */}
              <img
                src={getCategoryImage(category.id)}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-between px-4">
                <div className="flex flex-col items-start">
                  <span className="text-white text-base font-semibold text-left leading-tight">
                    {category.name}
                  </span>
                  {selectedCount > 0 && (
                    <span className="text-indigo-300 text-xs mt-0.5">
                      {selectedCount} selected
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedCount > 0 && (
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {selectedCount}
                    </span>
                  )}
                  <motion.svg
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </div>
              </div>
            </button>

            {/* Subcategories */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-1 px-1">
                    {/* Select/Deselect All Buttons */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => handleSelectAllInCategory(category.id)}
                        disabled={allSelected}
                        className={`flex-1 min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium
                          transition-all duration-150 border
                          ${
                            allSelected
                              ? 'bg-indigo-600/10 text-indigo-300/40 border-indigo-600/20 cursor-not-allowed'
                              : 'bg-indigo-600/40 text-indigo-200 hover:bg-indigo-600/50 hover:text-white active:scale-95 border-indigo-600/50'
                          }`}
                      >
                        Select All
                      </button>
                      <button
                        onClick={() => handleDeselectAllInCategory(category.id)}
                        disabled={noneSelected}
                        className={`flex-1 min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium
                          transition-all duration-150 border
                          ${
                            noneSelected
                              ? 'bg-white/5 text-white/30 border-white/5 cursor-not-allowed'
                              : 'bg-white/5 text-white/70 hover:bg-white/10 active:scale-95 border-white/10'
                          }`}
                      >
                        Deselect All
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((type) => {
                        const isSelected = selectedTypes.includes(type);

                        return (
                          <button
                            key={type}
                            onClick={() => handleSubcategoryToggle(type)}
                            className={`
                              min-h-[44px] px-3 py-2 rounded-[14px] text-sm font-medium
                              transition-all duration-150 active:scale-95
                              ${
                                isSelected
                                  ? 'bg-[rgba(139,141,255,0.14)] text-[#8B8DFF] shadow-[0_0_16px_rgba(139,141,255,0.35)]'
                                  : 'bg-white/10 text-white/90 hover:bg-white/20'
                              }
                            `}
                          >
                            <span className="flex items-center gap-1.5">
                              {isSelected && (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                              {getQuoteTypeName(type)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
