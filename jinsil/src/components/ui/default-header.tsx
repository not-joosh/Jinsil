import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon } from "./icons";
import { logo } from "../../assets/assets"; // Import the logo

export const DefaultHeader = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const isTop = scrollPosition === 0;

    return (
        <header className="sticky top-0 bg-black/90 text-white px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile view: Show scroll icons */}
                    <button
                        onClick={isTop ? scrollToBottom : scrollToTop}
                        className="bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors block lg:hidden"
                        aria-label={isTop ? "Scroll to Bottom" : "Scroll to Top"}
                    >
                        {isTop ? <ArrowDownIcon className="h-5 w-5" /> : <ArrowUpIcon className="h-5 w-5" />}
                    </button>

                    {/* Larger screens: Show logo and text */}
                    <div className="hidden lg:flex items-center hover:cursor-pointer" onClick={() => {
                        isTop ? scrollToBottom() : scrollToTop(); 
                    }}>
                        <img src={logo} alt="Jinsil Logo" className="h-8 w-8" />
                        <span className="ml-2 text-white font-bold">Jinsil</span>
                    </div>
                </div>
                <Link
                    className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    to={""}
                >
                    Share Your Certificates
                </Link>
            </div>
        </header>
    );
};