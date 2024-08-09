import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChromeIcon } from "./ui/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LANDINGPAGE } from "../lib/routes";
import { useToast } from "./ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required"),
});

interface LoginFormProps {
    setIsLoading: (value: boolean) => void;
    switchMode: () => void;
};

export interface LoginFormData {
    email: string;
    password: string;
};

export const LoginForm = ({ setIsLoading, switchMode }: LoginFormProps) => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { clientSignIn, clientSignInWithGoogle } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            await clientSignInWithGoogle();
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "An Error Occurred",
                    description: `${error.message}`,
                    variant: "destructive",
                    duration: 4000
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            await clientSignIn(data);
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
            } else {
                console.log(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
        >
                    <motion.button
                onClick={() => navigate(LANDINGPAGE)}
                whileHover={{ scale: 1.1, backgroundColor: '#ffffff', color: '#000000', transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.9, backgroundColor: '#ffffff', color: '#000000', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                className="text-center text-white bg-black border-2 px-4 py-2 rounded-xl"
            >
                Go Back
            </motion.button>

            <div className="space-y-4 text-center flex-1">
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-muted-foreground">Enter your credentials to access your account</p>
            </div>

            <motion.button
                whileHover={{ scale: 1.04, backgroundColor: '#1e3a8a', transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.96, backgroundColor: '#1e3a8a', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg"
                onClick={handleGoogleSignIn}
            >
                <ChromeIcon className="mr-2 h-5 w-5" />
                Sign in with Google
            </motion.button>
            
            <div className="relative flex items-center justify-center">
                <span className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">Or continue with</span>
                <div className="w-full border-t"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input {...field} id="email" type="text" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter your email" />
                        )}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        {/* <Link to="/" className="text-xs text-primary hover:underline">Forgot password?</Link> */}
                    </div>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <input {...field} id="password" type="password" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter your password" />
                        )}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04, backgroundColor: '#1e40af', transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.95, backgroundColor: '#1e40af', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                    Sign in
                </motion.button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <motion.span 
                    whileHover={{ scale: 1.04, color: '#1e40af' }}
                    onClick = {switchMode} 
                    className="hover:cursor-pointer text-blue-400 underline"
                >
                    Sign up
                </motion.span>
            </p>
        </motion.div>
    );
};
