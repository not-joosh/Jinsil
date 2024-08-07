import { Link } from "react-router-dom";

interface DefaultFooterProps {
    onContactClick: () => void;
    onPrivacyClick: () => void;
}

export const DefaultFooter = ({ onContactClick, onPrivacyClick }: DefaultFooterProps) => {
    return (
        <footer className="bg-black text-white py-6 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm ">&copy; 2024 Jinsil. All rights reserved.</p>
                    <nav className="flex items-center gap-4">
                        <button
                            className="text-sm font-medium hover:underline"
                            onClick={onPrivacyClick}
                        >
                            Privacy
                        </button>
                        <button
                            className="text-sm font-medium hover:underline"
                            onClick={onContactClick}
                        >
                            Contact
                        </button>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

