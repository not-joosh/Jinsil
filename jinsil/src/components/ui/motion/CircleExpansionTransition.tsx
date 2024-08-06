import { motion, AnimatePresence } from "framer-motion";

export const CircleExpansionTransition = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-green-500'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-orange-500'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-pink-500'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    );
};
