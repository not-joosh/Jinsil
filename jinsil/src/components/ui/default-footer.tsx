import { Link } from "react-router-dom";

export const DefaultFooter = () => {
    return (
        <footer className="bg-black text-white py-6 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-primary-foreground">&copy; 2024 Jinsil. All rights reserved.</p>
                    <nav className="flex items-center gap-4">
                    <Link className="text-sm font-medium text-primary-foreground hover:underline" to={""}>
                        Privacy
                    </Link>
                    <Link className=" bg-black rounded-xl text-white px-4 text-xs py-2 font-medium text-primary-foreground hover:underline" to={""}>
                        Terms
                    </Link>
                    <Link className="text-sm font-medium text-primary-foreground hover:underline" to={""}>
                        Contact
                    </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};