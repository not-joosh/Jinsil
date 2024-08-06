import { motion, AnimatePresence } from "framer-motion";

export const CubingTransition = () => {
    return (
        <AnimatePresence>

            <motion.div
                className='z-50 fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-red-300 to-yellow-300'
                initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
                animate={{ scale: 0, rotateX: 90, rotateY: 90 }}
                exit={{ scale: 1, rotateX: 0, rotateY: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
            <motion.div
                className='z-50 fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-blue-300 to-indigo-300'
                initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
                animate={{ scale: 0, rotateX: 90, rotateY: 90 }}
                exit={{ scale: 1, rotateX: 0, rotateY: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
            />
            <motion.div
                className='z-50 fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-blue-300 to-green-300'
                initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
                animate={{ scale: 0, rotateX: 90, rotateY: 90 }}
                exit={{ scale: 1, rotateX: 0, rotateY: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    );
};
