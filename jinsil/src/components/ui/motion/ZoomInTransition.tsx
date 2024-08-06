import { motion, AnimatePresence } from "framer-motion";

export const ZoomInTransition = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-blue-300'
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-blue-500'
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-blue-700'
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    );
};
