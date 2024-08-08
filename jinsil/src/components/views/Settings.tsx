import { Link, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { UploadIcon } from "../ui/icons"
import { stock00 } from "@/assets/assets"
import { LoadingIcon } from "../ui/motion/LoadingIcon";
import { DiagonalSlideTransition } from "../ui/motion/DiagonalSlideTransition";
import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { HOME, LANDINGPAGE } from "@/lib/routes"
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { auth } from "@/config/firebase";
// Form types

interface EmailFormData {
    email: string;
}
interface PictureFormData {
    picture: FileList;
}
interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// Form Schemas
const emailSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
});


const pictureSchema = yup.object().shape({
    picture: yup
        .mixed()
        .required('Image is required')
        .test('fileType', 'Only PNG and JPG images are allowed', value => {
            if (!value) return false;
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            // @ts-ignore
            return validTypes.includes(value[0]?.type);
        })
        .test('fileSize', 'File is too large', value => {
            if (!value) return true; // No file selected, skip size validation
            // @ts-ignore
            return value[0]?.size <= 2000000; // 2MB max file size
        }),
});

const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup.string().required("New password is required").min(6, "Password must be at least 6 characters long"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required('Confirm password is required')
});

// Settings Component

export const Settings = () => {
    const [pictureSelected, setPictureSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const { control: emailControl, handleSubmit: handleEmailSubmit, formState: { errors: emailErrors } } = useForm<EmailFormData>({
        resolver: yupResolver(emailSchema) 
    });

    const { control: pictureControl, handleSubmit: handlePictureSubmit, formState: { errors: pictureErrors } } = useForm<PictureFormData>({
        // @ts-ignore
        resolver: yupResolver(pictureSchema)
    });

    const { control: passwordControl, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm<PasswordFormData>({
        resolver: yupResolver(passwordSchema)
    });

    const onPictureSubmit = (formData: PictureFormData) => {

        try {
            console.log("Picture Data:", formData);
            // Validate if the picture data is correctly captured
            if (formData.picture.length === 0) {
                throw new Error ("No picture selected.");
            } 
            console.log("Picture uploaded:", formData.picture[0]);

            // Reset the form state
            pictureControl._reset();
            setPictureSelected(false);

        } catch(error: unknown) {
            if(error instanceof Error) {
                console.error(error.message);
            }
        }

        
    };
    const onEmailSubmit = (formData: EmailFormData) => {
        console.log("Email Data:", formData);
    };

    const onPasswordSubmit = (formData: PasswordFormData) => {
        console.log("Password Data:", formData);
    };


    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            
            // Validate file type and size
            if (!['image/png', 'image/jpeg'].includes(file.type)) {
                toast({
                    title: "An Error Occurred",
                    description: `Only PNG and JPG images are allowed.`,
                    variant: "destructive",
                    duration: 4000
                });
                return;
            }
            
            if (file.size > 2000000) { // 2MB limit
                toast({
                    title: "An Error Occurred",
                    description: `File size exceeds the 2MB limit.`,
                    variant: "destructive",
                    duration: 4000
                });
                return;
            }
            // If validation passes, update the form state
            // @ts-ignore
            setPictureSelected(true);
            pictureControl._formValues.picture = event.target.files;
            // Clearing the errors
            // @ts-ignore
            pictureControl._setErrors.apply(null, ['picture', undefined]);
        }
    };

    const handleAccountDeletion = () => {
        try {

        } catch(error: unknown) {
            if(error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    useEffect(() => {
        const uid = auth.currentUser?.uid || localStorage.getItem('uid');
        if(!uid) {
            navigate(LANDINGPAGE);
        } 
    }, []);
    return (
        <>
            {loading && <LoadingIcon />}
            <DiagonalSlideTransition />
            <div className="!bg-slate-300/40 text-black flex flex-col w-full min-h-screen">
                <header className="sticky top-0 bg-slate-500/20 backdrop-blur-sm shadow-xl z-20 p-4 flex justify-between items-center">
                    <h1 className="font-semibold text-3xl">Settings</h1>
                    <motion.div
                    >
                        <Link to={HOME} className="border-2 px-4 rounded-lg bg-black/10 backdrop-blur-sm text-white py-2 text-primary hover:scale-50">Return</Link>
                    </motion.div>
                </header>
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                    <div className="max-w-6xl w-full mx-auto grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav className="sticky top-20 text-sm text-muted-foreground grid gap-4">

                            <Link to='' className="font-semibold text-primary">
                                General
                            </Link>
                        </nav>
                        <div className="grid gap-6">
                           <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle>Profile Picture</CardTitle>
                                        <CardDescription className="text-foreground/60">Update your profile picture.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    <form onSubmit={handlePictureSubmit(onPictureSubmit)} className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={stock00}
                                                width="80"
                                                height="80"
                                                className="rounded-full"
                                                alt="Profile Picture"
                                                style={{ aspectRatio: "80/80", objectFit: "cover" }}
                                            />
                                            <Controller
                                                name="picture"
                                                control={pictureControl}
                                                render={({ field }) => (
                                                    // @ts-ignore
                                                    <Input
                                                        {...field}
                                                        id="picture"
                                                        type="file"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={(e) => {
                                                            field.onChange(e); // Notify react-hook-form of the file change
                                                            handleFileChange(e); // Additional custom handling if needed
                                                        }}
                                                    />
                                                )}
                                            />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => document.getElementById('picture')?.click()}
                                            className="bg-slate-300/50 backdrop-blur-sm absolute -right-2 -bottom-2 rounded-full w-12 h-12 flex items-center justify-center" // Adjusted size and centering
                                        >
                                            <UploadIcon className="h-4 w-4 text-white" /> {/* Increased size and centered */}
                                            <span className="sr-only">Upload new profile picture</span>
                                        </motion.button>
                                        </div>
                                        {pictureSelected ? (
                                            <motion.div 
                                                whileHover={{ scale: 1.05 }} 
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <button type="submit" className="rounded-xl pd-1 border-2 py-2 px-3 m-2 border-slate-300 bg-blue-500 text-white">Confirm</button>
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                whileHover={{ scale: 1.05 }} 
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <button type="button" onClick={() => document.getElementById('picture')?.click()} className="rounded-xl pd-1 border-2 py-2 px-3 m-2 border-slate-300">Upload new picture</button>
                                            </motion.div>
                                        )}
                                        {pictureErrors.picture && <p className="text-xs text-red-500">{pictureErrors.picture.message}</p>}
                                    </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Email</CardTitle>
                                        <CardDescription>Update your email address.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label>Email Address</Label>
                                                <div className="flex items-center gap-2">
                                                    <Controller
                                                        name="email"
                                                        control={emailControl}
                                                        render={({ field }) => (
                                                            <Input {...field} id="email" type="email" />
                                                        )}
                                                    />
                                                    <motion.div 
                                                        whileHover={{ scale: 1.05 }} 
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <button type="submit" className="rounded-xl pd-1 border-2 py-2 px-3 m-2 border-slate-300">Update</button>
                                                    </motion.div>
                                                </div>
                                                {emailErrors.email && <p className="text-xs text-red-500">{emailErrors.email.message}</p>}
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Password</CardTitle>
                                        <CardDescription>Change your password.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label>Current Password</Label>
                                                <Controller
                                                    name="currentPassword"
                                                    control={passwordControl}
                                                    render={({ field }) => (
                                                        <Input {...field} id="current-password" type="password" />
                                                    )}
                                                />
                                                {passwordErrors.currentPassword && <p className="text-xs text-red-500">{passwordErrors.currentPassword.message}</p>}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>New Password</Label>
                                                <Controller
                                                    name="newPassword"
                                                    control={passwordControl}
                                                    render={({ field }) => (
                                                        <Input {...field} id="new-password" type="password" />
                                                    )}
                                                />
                                                {passwordErrors.newPassword && <p className="text-xs text-red-500">{passwordErrors.newPassword.message}</p>}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Confirm Password</Label>
                                                <Controller
                                                    name="confirmPassword"
                                                    control={passwordControl}
                                                    render={({ field }) => (
                                                        <Input {...field} id="confirm-password" type="password" />
                                                    )}
                                                />
                                                {passwordErrors.confirmPassword && <p className="text-xs text-red-500">{passwordErrors.confirmPassword.message}</p>}
                                            </div>
                                            <motion.div 
                                                whileHover={{ scale: 1.05 }} 
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <button type="submit" className="rounded-xl pd-1 border-2 py-2 px-3 m-2 border-slate-300">Update Password</button>
                                            </motion.div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Delete Account</CardTitle>
                                        <CardDescription>Permanently delete your account and all data.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <motion.button 
                                                    whileHover={{ scale: 1.05 }} 
                                                    whileTap={{ scale: 0.95 }}
                                                    className="bg-red-500 text-white rounded-xl pd-1 border-2 py-2 px-3 m-2 border-slate-300"
                                                >
                                                    Delete Account
                                                </motion.button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                                                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter className="flex justify-end space-x-4 mt-4">
                                                    <AlertDialogCancel className="bg-gray-200 rounded-xl py-2 px-4 border border-gray-300">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick = {() => handleAccountDeletion()} className="bg-red-500 text-white rounded-xl py-2 px-4 border border-red-500">Delete</AlertDialogAction>
                                                </AlertDialogFooter>

                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}