import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Link } from "react-router-dom";
import { LogOutIcon, SettingsIcon, ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { motion, AnimatePresence } from "framer-motion";

export const SideMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => setIsCollapsed(!isCollapsed);

    return (
        <motion.div
            className={`bg-primary text-primary-foreground p-6 flex flex-col justify-between h-full ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 ${isCollapsed ? "md:w-20" : "md:w-64"} hidden md:flex`}
            initial={{ width: 64 }}
            animate={{ width: isCollapsed ? 80 : 256 }}
            exit={{ width: 64 }}
        >
            <div className="flex flex-col items-center gap-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className={`h-12 w-12 cursor-pointer ${isCollapsed ? "ml-2" : ""}`}>
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
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.nav
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col gap-4"
                        >
                            <Link to="/Home" className="text-lg font-medium hover:underline">
                                Dashboard
                            </Link>
                            <Link to="/Home" className="text-lg font-medium hover:underline">
                                Certificates
                            </Link>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>

            <motion.button 
                whileFocus={{ scale: 1.04, backgroundColor: '#ffffff', color: '#000000' }}
                whileHover={{ scale: 1.04, backgroundColor: '#ffffff', color: '#000000' }}
                
                onClick={handleToggle} className="  text-white rounded-full">
                {isCollapsed ? (
                    <ArrowRightIcon className="h-6 w-6" />
                ) : (
                    <ArrowLeftIcon className="h-6 w-6" />
                )}
            </motion.button>
        </motion.div>
    );
};
