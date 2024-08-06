import { motion, AnimatePresence } from "framer-motion";

export const DiagonalSlideTransition = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-blue-500'
                initial={{ x: '-100vw', y: '-100vh' }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: '100vw', y: '100vh' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-red-500'
                initial={{ x: '100vw', y: '-100vh' }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: '-100vw', y: '100vh' }}
                transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-yellow-500'
                initial={{ x: '-100vw', y: '100vh' }}
                animate={{ x: 0, y: 0 }}
                exit={{ x: '100vw', y: '-100vh' }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    );
};
