import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { UploadIcon } from "./ui/icons";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

interface CertificateUploadFormProps {
    isOpen: boolean;
    onClose: () => void;
    setIsLoading: (value: boolean) => void;
}

interface CertificateUploadFormData {
    photo: File;
    dateCompleted: string; // Change this to string to match the date input value
    title: string;
}

const schema = yup.object().shape({
    photo: yup.mixed().required("Certificate image is required"),
    dateCompleted: yup.string().required("Date completed is required"),
    title: yup
        .string()
        .required("Title is required")
        .min(2, "Title must be at least 2 characters long"),
});

export const CertificateUploadForm = ({ isOpen, onClose, setIsLoading }: CertificateUploadFormProps) => {
    const { toast } = useToast();
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<CertificateUploadFormData>({
        // @ts-ignore
        resolver: yupResolver(schema),
    });
    const [dragging, setDragging] = useState(false);
    const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(null);

    const onSubmit = async (data: CertificateUploadFormData) => {
        try {
            setIsLoading(true);
            // Simulate form submission delay
            console.log("Form Data:", data);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast({
                title: "Success",
                description: "Successfully Uploaded Certificate!",
                variant: "success",
                duration: 3000
            });
            handleClose();
        } catch (error: unknown) {
            if (error instanceof Error) {
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

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setValue("photo", file);
            previewFile(file);
        }
    };

    const previewFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleClose = () => {
        reset(); // Reset the form fields
        setFilePreview(null); // Clear the file preview
        onClose(); // Close the dialog
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogTrigger asChild>
                <button className="hidden">Upload Certificate</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload Certificate</DialogTitle>
                    <DialogDescription>
                        Fill out the form to upload your certificate.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div>
                        <label htmlFor="certificate-image">Certificate Image</label>
                        <div
                            className={`mt-2 flex justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 ${dragging ? 'border-blue-500' : 'border-muted-foreground'}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="space-y-1 text-center">
                                <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                                <div className="flex text-sm text-muted-foreground">
                                    <label
                                        htmlFor="certificate-image"
                                        className="relative cursor-pointer rounded-md bg-white text-black font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-black hover:underline"
                                    >
                                        <span>Upload a file</span>
                                        <Controller
                                            name="photo"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    id="certificate-image"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            setValue("photo", e.target.files[0]);
                                                            previewFile(e.target.files[0]);
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                {errors.photo && (
                                    <p className="text-xs text-red-500">{errors.photo.message}</p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                                {filePreview && (
                                    <div className="mt-4">
                                        <img src={filePreview as string} alt="Preview" className="w-full h-32 rounded-md" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date-completed">Date Completed</label>
                            <Controller
                                name="dateCompleted"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="date-completed"
                                        type="date"
                                        {...field}
                                        value={field.value || ""}
                                        className="w-full"
                                    />
                                )}
                            />
                            {errors.dateCompleted && (
                                <p className="text-xs text-red-500">
                                    {errors.dateCompleted.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="certificate-title">Certificate Title</label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        id="certificate-title"
                                        placeholder="Enter certificate title"
                                        {...field}
                                        className="w-full"
                                    />
                                )}
                            />
                            {errors.title && (
                                <p className="text-xs text-red-500">{errors.title.message}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <motion.button 
                            whileHover={{ scale: 1.04, backgroundColor: '#1e40af', transition: { duration: 0.3 } }}
                            whileTap={{ scale: 0.95, backgroundColor: '#1e40af', transition: { type: 'spring', stiffness: 300, damping: 10 } }}
                            type="submit" className="bg-primary text-white rounded-lg p-2"
                        >
                            Upload Certificate
                        </motion.button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
