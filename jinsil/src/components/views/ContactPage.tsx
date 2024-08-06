import { Link } from "react-router-dom";
import { ArrowLeftIcon, GithubIcon, GlobeIcon, InstagramIcon, LinkedinIcon } from "../ui/icons";
import { developer } from "../../assets/assets";
export const ContactPage = () => {
    return (
        <div className="bg-black text-white flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className=" rounded-lg  text-white p-10 flex flex-col items-center space-y-6">
                <img src = {developer} alt="Josh Ratificar" className="bg-white w-5/6 h-30 rounded-full" /> 
                {/* <Avatar className="w-32 h-32 ring-2 ring-primary">
                    <AvatarImage src="/placeholder-user.jpg" alt="Josh Ratificar" />
                    <AvatarFallback>JR</AvatarFallback>
                </Avatar> */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Josh Ratificar</h1>
                    <p className="text-muted-foreground bold ">Software Engineer</p>
                </div>
                <div className="flex gap-4">
                    <Link to="/" target="_blank">
                        <button className="">
                            <GithubIcon className="w-6 h-6" />
                            <span className="sr-only">GitHub</span>
                        </button>
                    </Link>
                    <Link to="/" target="_blank">
                        <button className="">
                            <LinkedinIcon className="w-6 h-6" />
                            <span className="sr-only">LinkedIn</span>
                        </button>
                    </Link>
                    <Link to="/" target="_blank">
                        <button className="">
                            <InstagramIcon className="w-6 h-6" />
                            <span className="sr-only">Instagram</span>
                        </button>
                    </Link>
                    <Link to="/" target="_blank">
                        <button className="">
                            <GlobeIcon className="w-6 h-6" />
                            <span className="sr-only">Portfolio</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-8">
                <Link
                    to="/"
                    className="text-black bg-white inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};
