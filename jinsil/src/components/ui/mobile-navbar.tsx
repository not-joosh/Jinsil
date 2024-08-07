import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { LogOutIcon, SettingsIcon, MenuIcon } from "./icons";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "@/assets/assets"; // png
export const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => setIsExpanded(!isExpanded);

    return (
        <div className="fixed top-0 right-0 w-full bg-primary text-primary-foreground p-6 md:hidden z-10">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                    <button onClick={handleToggle} className="ml-4">
                        <MenuIcon className="h-6 w-6" />
                    </button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-12 w-12 cursor-pointer">
                            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link to="/Home" className="flex items-center gap-2">
                                <SettingsIcon className="h-4 w-4" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to="/Home" className="flex items-center gap-2">
                                <LogOutIcon className="h-4 w-4" />
                                Sign Out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100vh" }}
                        exit={{ height: 0 }}
                        className="absolute top-20 left-0 right-0 bg-primary text-primary-foreground overflow-y-auto"
                    >
                        <nav className="flex flex-col items-center gap-4 p-6">
                            <Link to="/Home" className="text-lg font-medium hover:underline" onClick={() => setIsExpanded(false)}>
                                Dashboard
                            </Link>
                            <Link to="/Home" className="text-lg font-medium hover:underline" onClick={() => setIsExpanded(false)}>
                                Certificates
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
