import { 
    // HeartIcon,
    ShareIcon
} from "./ui/icons";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { certificatesRef } from "@/config/firebase";
import { useToast } from "./ui/use-toast";
import { SkeletonLoader } from "./ui/motion/skeleton-loader";
import { useNavigate } from "react-router-dom"; 

export interface Certificate {
    id: string;
    title: string;
    description: string;
    awardedTo: string;
    dateCompleted: string;
    imageUrl: string;
    ownerUid: string;
    photoName: string;
    createdAt: string;
}

interface CertificateProps {
    id: string;
}

export const Certificate = ({ id }: CertificateProps) => {
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(certificatesRef, where("id", "==", id)), 
            (snapshot) => {
                const data = snapshot.docs.map((doc) => doc.data());
                
                if (data.length === 0) {
                    // If no certificate is found, navigate to the 404 page
                    navigate(`/certificate/${id}/notfound`);
                    return;
                }
                
                setCertificate(data[0] as Certificate);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [id, navigate]);

    if (loading) {
        return <SkeletonLoader width={800} height={600} minRows={8} maxRows={20} />;
    }

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-8">
            <div className="flex flex-1 flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 w-full md:w-2/3 lg:w-3/4 bg-muted rounded-lg overflow-hidden" style={{ height: '80vh' }}>
                    <img
                        src={certificate?.imageUrl}
                        alt={certificate?.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col flex-grow gap-6">
                    <div className="bg-card rounded-lg p-6 flex-grow">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold">{certificate?.title}</h2>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast({
                                            title: "Copied to clipboard",
                                            description: "The URL has been copied to your clipboard.",
                                            variant: "success",
                                            duration: 3000
                                        });
                                    }}
                                    className="p-2 rounded-full hover:bg-gray-100">
                                    <ShareIcon className="w-6 h-6" />
                                    <span className="sr-only">Share</span>
                                </button>
                                {/* <button className="p-2 rounded-full hover:bg-gray-100">
                                    <HeartIcon className="w-6 h-6" />
                                    <span className="sr-only">Like</span>
                                </button> */}
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Awarded to</p>
                                <p className="text-lg font-semibold">{certificate?.awardedTo}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Date Completed</p>
                                <p className="text-lg font-semibold">{certificate?.dateCompleted}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card rounded-lg p-6 flex-grow">
                        <h3 className="text-2xl font-bold mb-4">About this Certificate</h3>
                        <Separator className="my-4" />
                        <div className="prose">
                            <p>{certificate?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
