import { motion, AnimatePresence } from "framer-motion";

export const RotatingOverlayTransition = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-teal-500'
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 360, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-purple-500'
                initial={{ rotate: 360, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 360, opacity: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    );
};
