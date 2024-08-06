import { motion, AnimatePresence } from "framer-motion";

export const WipeTransition = () => {
    return (
        <AnimatePresence>
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-gray-900'
                initial={{ width: '100%' }}
                animate={{ width: '100%' }}
                exit={{ width: '0%' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-gray-700'
                initial={{ width: '100%' }}
                animate={{ width: '100%' }}
                exit={{ width: '0%' }}
                transition={{ delay: 0.2, duration: 1, ease: 'easeInOut' }}
            />
            <motion.div
                className='fixed top-0 left-0 w-screen h-screen bg-gray-500'
                initial={{ width: '100%' }}
                animate={{ width: '100%' }}
                exit={{ width: '0%' }}
                transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
            />
        </AnimatePresence>
    );
};
