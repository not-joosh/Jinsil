import { Link, useNavigate } from "react-router-dom";
import { ChromeIcon } from "../ui/icons";
import { stock03, stock04 } from "../../assets/assets";
import { LANDINGPAGE } from "../../lib/routes";
import { motion } from "framer-motion";

export const AuthView = () => {
    const navigate = useNavigate();

    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="relative flex items-center justify-center bg-muted lg:bg-transparent p-4">
                <div className="bg-white z-10 w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg backdrop-blur-lg mx-4 lg:mx-0">
                    <motion.button
                        onClick={() => navigate(LANDINGPAGE)}
                        whileHover={{ scale: 1.1, backgroundColor: '#ffffff', color: '#000000', transition: { duration: 0.3 } }}
                        whileTap={{ scale: 0.9, backgroundColor: '#ffffff', color: '#000000', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                        className="text-center text-white bg-black border-2 px-4 py-2 rounded-xl"
                    >
                        Go Back
                    </motion.button>
                    <div className="flex justify-between items-center">
                        <div className="space-y-4 text-center flex-1">
                            <h1 className="text-4xl font-bold">Login</h1>
                            <p className="text-muted-foreground">Enter your credentials to access your account</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <motion.button
                            whileHover={{ scale: 1.04, backgroundColor: '#1e3a8a', transition: { duration: 0.3 } }}
                            whileTap={{ scale: 0.96, backgroundColor: '#1e3a8a', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg"
                        >
                            <ChromeIcon className="mr-2 h-5 w-5" />
                            Sign in with Google
                        </motion.button>
                        <div className="relative flex items-center justify-center">
                            <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">Or continue with</span>
                            <div className="w-full border-t"></div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Username</label>
                                <input id="email" type="text" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter your email or username" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <Link to="/" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                </div>
                                <input id="password" type="password" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter your password" />
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.04, backgroundColor: '#1e40af', transition: { duration: 0.3 } }}
                                whileTap={{ scale: 0.95, backgroundColor: '#1e40af', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                            >
                                Sign in
                            </motion.button>
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link to="/" className="text-primary hover:underline">Sign up</Link>
                    </p>
                </div>
                <div
                    className={`bg-black absolute inset-0 -z-10 !bg-cover bg-center blur-sm`}
                    style={{ backgroundImage: `url('${stock04}')` }}
                />
            </div>

            <div className="hidden lg:block relative">
                <img
                    src={stock03}
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover border-l-8 border-black/10"
                    style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
                />
            </div>
        </div>
    );
};
