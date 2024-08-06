import { Link } from "react-router-dom";
import { SirenIcon } from "./icons"; // Assuming you have an ArrowUpIcon component
import { logo } from "../../assets/assets";

export const DefaultHeader = () => {
    return (
        <header className="sticky top-0 bg-black/90 text-white px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between">
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors"
                    aria-label="Scroll to Top"
                >
                    <SirenIcon className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-4">
                    <Link
                        className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        to={""}
                    >
                        Share Your Certificates
                    </Link>

                </div>
            </div>
        </header>
    );
};
