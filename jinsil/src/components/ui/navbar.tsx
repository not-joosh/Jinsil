import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Link } from "react-router-dom";
import { LogOutIcon, SettingsIcon } from "./icons";


export const Navbar = () => {
    return (
        <>
            <div className="bg-primary text-primary-foreground p-6 flex flex-col justify-between h-full md:w-64">
                <div className="flex flex-col items-center gap-6">
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
                    <nav className="flex flex-col gap-4">
                        <Link to="/Home" className="text-lg font-medium hover:underline">
                            Dashboard
                        </Link>
                        <Link to="/Home" className="text-lg font-medium hover:underline">
                            Certificates
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
};
