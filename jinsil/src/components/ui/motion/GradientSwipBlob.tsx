import { motion, AnimatePresence } from "framer-motion";

export const GradientSwipeBlob = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='z-30 fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-pink-200 to-orange-300'
                initial={{ x: 0 }}
                animate={{ x: '100vw' }}
                exit={{ x: '100vw' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='z-40 fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-orange-500 to-pink-300'
                initial={{ x: 0 }}
                animate={{ x: '100vw' }}
                exit={{ x: '100vw' }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
            />
            <motion.div
                className='z-50 fixed top-0 left-0 w-screen h-screen bg-gradient-to-r from-orange-400 to-pink-500'
                initial={{ x: 0 }}
                animate={{ x: '100vw' }}
                exit={{ x: '100vw' }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    );
};
