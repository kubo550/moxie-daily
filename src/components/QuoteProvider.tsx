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
                    initial={{ y: 450, scale: 0 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: -250, scale: 0 }}
                    transition={{ duration: 0.5, case: 'linear' }}
                >
                    <Quote text={quote} />
                </motion.div>
            )}
        </AnimatePresence>
    )
}