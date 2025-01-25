import {FC} from "react";
import {Quote} from "./Quote.tsx";
import {AnimatePresence, motion} from "motion/react"

interface QuoteProviderProps {
 quote: string
}


export const QuoteProviderProps: FC<QuoteProviderProps> = ({quote}) => {

    return (
        <AnimatePresence mode="wait">
            {quote && (
                <motion.div
                    key={quote}
                    initial={{ y: -50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <Quote text={quote} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}