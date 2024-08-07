import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { LogOutIcon, MenuIcon, SettingsIcon } from "./icons";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "@/assets/assets"; 
import { MapIcon, UserIcon } from "lucide-react";

export const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => setIsExpanded(!isExpanded);

    const userName = "John Doe";
    const userEmail = "johndoe@example.com";

    return (
        <div className="fixed top-0 right-0 w-full bg-primary text-primary-foreground p-4 md:hidden z-10">
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
                            <AvatarImage src="/placeholder-user.jpg" alt={userName} />
                            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Link to="/manage-profile" className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                Manage Profile
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
                            <Link to="/certificates" className="w-full item-center text-center align-middle flex items-center gap-2 p-2 text-white rounded-lg hover:bg-white hover:text-black transition">
                                <MapIcon className="h-5 w-5" />
                                <span>Certificates</span>
                            </Link>
                            <Link to="/settings" className=" w-full item-center text-center align-middle flex items-center gap-2 p-2  text-white rounded-lg hover:bg-white hover:text-black transition">
                                <SettingsIcon className="h-5 w-5" />
                                <span>Settings</span>
                            </Link>
                            <Link to="/logout" className="w-full item-center text-center align-middle flex items-center gap-2 p-2 text-white rounded-lg hover:bg-white hover:text-black transition">
                                <LogOutIcon className="h-5 w-5" />
                                <span>Logout</span>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
