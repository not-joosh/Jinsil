import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HOME, LANDINGPAGE } from "../lib/routes";
import * as yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/config/firebase";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required("Confirm password is required"),
});

interface RegisterFormProps {
    setIsLoading: (value: boolean) => void;
    switchMode: () => void;
};

export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterForm = ({ setIsLoading, switchMode }: RegisterFormProps) => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const { clientRegister } = useAuth();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setIsLoading(true);
            console.log(data);
            await clientRegister(data);

            // // If Successfull navigate them
            if(auth.currentUser?.uid) {
                localStorage.setItem("uid", auth.currentUser.uid);
            } else {
                throw new Error("User not found");
            }
            navigate(HOME);
        } catch(error: unknown) {
            if(error instanceof Error) {
                console.log(error.message);
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
                <h1 className="text-4xl font-bold">Register</h1>
                <p className="text-muted-foreground">Create an account to access our services</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <input {...field} id="firstName" type="text" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter your first name" />
                            )}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <input {...field} id="lastName" type="text" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter your last name" />
                            )}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>
                </div>
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <input {...field} id="password" type="password" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Enter your password" />
                        )}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <input {...field} id="confirmPassword" type="password" className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Confirm your password" />
                        )}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04, backgroundColor: '#1e40af', transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.95, backgroundColor: '#1e40af', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                    Sign up
                </motion.button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <motion.span 
                    whileHover={{ scale: 1.04, color: '#1e40af' }}
                    onClick={switchMode} className="hover:cursor-pointer text-blue-400 underline">Login</motion.span>
            </p>
        </motion.div>
    );
};
