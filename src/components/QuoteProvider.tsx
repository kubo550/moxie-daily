import {FC} from "react";
import {QuoteComponent} from "./QuoteComponent.tsx";
import {AnimatePresence, motion} from "motion/react"
import type {Quote} from "@/infrastructure/qoutes.ts";

interface QuoteProviderProps {
 quote: Quote | null;
}


export const QuoteProviderProps: FC<QuoteProviderProps> = ({quote}) => {

    return (
        <AnimatePresence mode="wait">
            {quote && (
                <motion.div
                    key={quote.id}
                    initial={{ y: 450, scale: 0 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: -250, scale: 0 }}
                    transition={{ duration: 0.5, case: 'linear' }}
                >
                    <QuoteComponent text={quote.quote} caption={quote.caption} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}