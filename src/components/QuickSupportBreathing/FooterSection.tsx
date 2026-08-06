import { motion } from 'motion/react';

export default function FooterSection() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-gray-500 text-xs text-center mt-8 max-w-xs"
    >
      Remember: This moment is temporary. You have the strength to get through
      it.
    </motion.p>
  );
}
