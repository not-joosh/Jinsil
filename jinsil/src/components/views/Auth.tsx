import { stock03, stock04 } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GradientSwipeBlob } from "../ui/motion/GradientSwipBlob";
import { LoadingIcon } from "../ui/motion/LoadingIcon";
import { useEffect, useState } from "react";
import { LoginForm } from "../login-form";
import { RegisterForm } from "../register-form";
import { HOME } from "@/lib/routes";

export const AuthView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const uid = localStorage.getItem('uid');
        if (uid) {
            navigate(HOME);
        }
    });

    return (
        <>
            {isLoading && <LoadingIcon />}
            <GradientSwipeBlob />
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="relative flex items-center justify-center bg-muted lg:bg-transparent p-4">
                    <div className="bg-white w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg backdrop-blur-lg mx-4 lg:mx-0">
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <LoginForm switchMode={() => setIsLogin(!isLogin)} setIsLoading={setIsLoading} key="login" />
                            ) : (
                                <RegisterForm switchMode={() => setIsLogin(!isLogin)} setIsLoading={setIsLoading} key="register" />
                            )}
                        </AnimatePresence>
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
        </>
    );
};
