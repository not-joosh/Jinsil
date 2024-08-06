import { motion, AnimatePresence } from "framer-motion";

export const DiagonalSlideTransition = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='z-30 fixed top-0 left-0 w-screen h-screen bg-blue-500'
                initial={{ x: 0, y: 0 }}
                animate={{ x: [0, '100vw'], y: [0, '100vh'] }}
                exit={{ x: [0, '100vw'], y: [0, '100vh'] }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='z-40 fixed top-0 left-0 w-screen h-screen bg-red-500'
                initial={{ x: 0, y: 0 }}
                animate={{ x: [0, '-100vw'], y: [0, '100vh'] }}
                exit={{ x: [0, '-100vw'], y: [0, '100vh'] }}
                transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='z-50 fixed top-0 left-0 w-screen h-screen bg-yellow-500'
                initial={{ x: 0, y: 0 }}
                animate={{ x: [0, '100vw'], y: [0, '-100vh'] }}
                exit={{ x: [0, '100vw'], y: [0, '-100vh'] }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='z-50 fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-orange-500 to-yellow-500'
                initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
                animate={{ scale: 0, rotateX: -90, rotateY: 90 }}
                exit={{ scale: 1, rotateX: 0, rotateY: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
        
        </AnimatePresence>
    );
};
