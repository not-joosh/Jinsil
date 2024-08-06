import { Link } from "react-router-dom";
import { ArrowLeftIcon, GithubIcon, GlobeIcon, InstagramIcon, LinkedinIcon } from "../ui/icons";
import { developer } from "../../assets/assets";
import { motion } from "framer-motion";

interface ContactPageProps {
    onBack: () => void;
}
export const ContactPage = ({onBack}: ContactPageProps) => {
    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8 z-50"
        >
            <div className="rounded-lg text-white p-10 flex flex-col items-center space-y-6">
                <img src={developer} alt="Josh Ratificar" className="bg-white w-96 h-72 rounded-full" /> 
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Josh Ratificar</h1>
                    <p className="text-muted-foreground bold">Software Engineer</p>
                </div>
                <div className="flex gap-4">
                    <a href="https://github.com/not-joosh" target="_blank" rel="noopener noreferrer">
                        <button className="">
                            <GithubIcon className="w-6 h-6" />
                            <span className="sr-only">GitHub</span>
                        </button>
                    </a>
                    <a href="https://linkedin.com/in/joshratificar" target="_blank" rel="noopener noreferrer">
                        <button className="">
                            <LinkedinIcon className="w-6 h-6" />
                            <span className="sr-only">LinkedIn</span>
                        </button>
                    </a>
                    <a href="https://www.instagram.com/joshratificar/" target="_blank" rel="noopener noreferrer">
                        <button className="">
                            <InstagramIcon className="w-6 h-6" />
                            <span className="sr-only">Instagram</span>
                        </button>
                    </a>
                    <a href="https://joshratificar.com" target="_blank" rel="noopener noreferrer">
                        <button className="">
                            <GlobeIcon className="w-6 h-6" />
                            <span className="sr-only">Portfolio</span>
                        </button>
                    </a>
                </div>
            </div>
            <div>
                <button
                    onClick={onBack}
                    className="text-black bg-white inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Home
                </button>
            </div>
        </motion.div>
    );
};
