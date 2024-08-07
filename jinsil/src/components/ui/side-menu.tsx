import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Link } from "react-router-dom";
import { LogOutIcon, SettingsIcon, ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { motion, AnimatePresence } from "framer-motion";

import { MapIcon, UserIcon } from "lucide-react";

export const SideMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleToggle = () => setIsCollapsed(!isCollapsed);

    const userName = "John Doe";
    const userEmail = "johndoe@example.com";

    return (
        <motion.div
            className={`bg-black text-primary-foreground p-6 flex flex-col justify-between h-full ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 ${isCollapsed ? "md:w-20" : "md:w-64"} hidden md:flex`}
            initial={{ width: 64 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            exit={{ width: 64 }}
        >
            <div className="flex flex-col items-center gap-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className={`h-12 w-12 cursor-pointer ${isCollapsed ? "ml-2" : ""}`}>
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
                {!isCollapsed && (
                    <div className="text-center">
                        <p className="font-bold">{userName}</p>
                        <p className="text-sm">{userEmail}</p>
                    </div>
                )}
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col gap-4 w-full"
                        >
                            <Link to="/settings" className="flex items-center gap-2 p-2  text-white rounded-lg hover:bg-gray-200 hover:text-black transition">
                                <SettingsIcon className="h-5 w-5" />
                                <span>Settings</span>
                            </Link>
                            <Link to="/certificates" className="flex items-center gap-2 p-2  text-white rounded-lg hover:bg-gray-200 hover:text-black transition">
                                <MapIcon className="h-5 w-5" />
                                <span>Certificates</span>
                            </Link>
                            <Link to="/logout" className="flex items-center gap-2 p-2  text-white rounded-lg hover:bg-gray-200 hover:text-black transition">
                                <LogOutIcon className="h-5 w-5" />
                                <span>Logout</span>
                            </Link>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
            <motion.button 
                whileFocus={{ scale: 1.04, backgroundColor: '#ffffff', color: '#000000' }}
                whileHover={{ scale: 1.04, backgroundColor: '#ffffff', color: '#000000' }}
                onClick={handleToggle} 
                className="text-white rounded-full p-2"
            >
                {isCollapsed ? (
                    <ArrowRightIcon className="h-6 w-6" />
                ) : (
                    <ArrowLeftIcon className="h-6 w-6" />
                )}
            </motion.button>
        </motion.div>
    );
};
