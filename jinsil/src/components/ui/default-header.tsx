import { Link } from "react-router-dom";
import { SirenIcon } from "./icons";
import { logo } from "../../assets/assets";
export const DefaultHeader = () => {
    return (
        <header className=" bg-black text-white px-4 py-6 sm:px-6 lg:px-8">
            <div className="container mx-auto flex items-center justify-between">
            <Link  className="text-primary-foreground" to={""}>
                {/* <SirenIcon className="h-8 w-8" /> */}
                {/* <img src = {logo} className = "w-20 bg-transparent h-1/5 "/> */}
                {/* <span className=" text-white bold">Jinsil</span> */}
            </Link>
            <div className="flex items-center gap-4">
                <Link
                    className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" to={""}            
                >
                    Share Your Certificates
                </Link>
            </div>
            </div>
        </header>
    );
};