import * as React from "react";
import {backgroundImages} from "@/types/typesBacgroundImages.ts";
import {getQuoteTypeName} from "@/utils/quotes.ts";
import {getAvailableTypes} from "@/infrastructure/qoutes.ts";
import {QuoteType} from "@/types/QuoteType.ts";

const availableTypes = getAvailableTypes();


interface QuotesModalContentProps {
    selectedTypes: string[];
    handleQuoteTypeSelect: (type: QuoteType) => void;
    handleQuoteTypeRemove: (type: QuoteType) => void;
}
export const QuotesModalContent: React.FC<QuotesModalContentProps> =  ({
    selectedTypes,
    handleQuoteTypeSelect,
    handleQuoteTypeRemove
                                              }) => {
    return <div
        className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(4,minmax(100px,1fr))]'>
        {availableTypes.map(type => {
            const isSelected = selectedTypes.find(selectedType => selectedType === type)

            return (
                <div
                    key={type}
                    onClick={() => isSelected ? handleQuoteTypeRemove(type) : handleQuoteTypeSelect(type)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-transform duration-200 ${isSelected ? 'scale-95 ring-4 ring-indigo-600' : 'scale-100'}`}
                >
                    <img
                        src={backgroundImages[type]}
                        alt={type}
                        className="w-full h-48 object-cover brightness-75 contrast-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10"></div>

                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <span className="text-white text-xl font-semibold drop-shadow-lg">{getQuoteTypeName(type)}</span>
                    </div>

                    {isSelected && (
                        <div className="absolute top-2 right-2 z-30 bg-indigo-600 p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>

            )
        })}
    </div>
};
