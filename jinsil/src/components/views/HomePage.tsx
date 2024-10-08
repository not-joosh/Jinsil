import { useEffect, useState } from "react";
import { ShareIcon, UploadIcon } from "../ui/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DiagonalSlideTransition } from "../ui/motion/DiagonalSlideTransition";
import { SideMenu } from "../ui/side-menu";
import { Navbar } from "../ui/mobile-navbar";
import { LANDINGPAGE } from "@/lib/routes";
import { useNavigate } from "react-router-dom";
import { CertificateUploadForm } from "../certificate-upload-form";
import { Delete } from "lucide-react";
import { auth, certificatesRef } from "@/config/firebase";
import { DeleteCertificateDialogue } from "../ui/delete-certificate-modal";
import { onSnapshot, query, where } from "firebase/firestore";
import { useCertificate } from "@/hooks/useCertificate";
import { useToast } from "../ui/use-toast";
import { LoadingIcon } from "../ui/motion/LoadingIcon";
import { SkeletonLoader } from "../ui/motion/skeleton-loader"; // Import the SkeletonLoader

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


export const HomePage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false); 
    const [pageLoading, setPageLoading] = useState(true);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [certificateToDelete, setCertificateToDelete] = useState<string | null>(null);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
    const { deleteCertificate } = useCertificate();

    const handleSearch = (e: any) => setSearchTerm(e.target.value);

    const handleDelete = (id: string) => {
        setCertificateToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (certificateToDelete !== null) {
            try {
                setLoading(true);
                await deleteCertificate(certificateToDelete);
                setCertificates(certificates.filter(cert => cert.id !== certificateToDelete));
                setFilteredCertificates(filteredCertificates.filter(cert => cert.id !== certificateToDelete));
                setCertificateToDelete(null);
            } catch (error: unknown) {
                console.error(error);
            } finally {
                setLoading(false);
                setDeleteModalOpen(false);
            }
        }
    };

    useEffect(() => {
        const uid = auth.currentUser?.uid || localStorage.getItem('uid');
        if (!uid) {
            navigate(LANDINGPAGE);
        }
    }, [navigate]);

    useEffect(() => {
        const uid = auth.currentUser?.uid || localStorage.getItem('uid');
        if (!uid) {
            navigate(LANDINGPAGE);
            return;
        }

        const unsubscribe = onSnapshot(query(certificatesRef, where("ownerUid", "==", uid)), (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            } as Certificate));
            setCertificates(data);
            setFilteredCertificates(data);
            setPageLoading(false); // Set pageLoading to false once data is fetched
        });

        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredCertificates(certificates);
        } else {
            setFilteredCertificates(certificates.filter(cert => 
                cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.awardedTo.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    }, [searchTerm, certificates]);

   
    // if (pageLoading) {
    //     return <SkeletonLoader width={800} height={600} minRows={8} maxRows={20} />; // Display the skeleton loader while page is loading
    // }

    return (
        <>
            {loading && <LoadingIcon />}
            <DeleteCertificateDialogue
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
            
            <CertificateUploadForm
                isOpen={isUploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                setIsLoading={setLoading}
            />
            <DiagonalSlideTransition />
            <Navbar />
            <div className="flex flex-col md:flex-row h-screen">
                <SideMenu />
                <div className="flex-1 p-8 mt-16">
                    <div className="max-w-7xl mx-auto flex flex-col h-full">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold">Manage Your Certificates</h1>
                            <button 
                                className="flex flex-row items-center border-2 justify-center text-center p-2 px-2 bg-primary text-white rounded-lg hover:border-black hover:border-2 hover:bg-white hover:text-black text-xs transition-all"
                                onClick={() => setUploadModalOpen(true)}
                            >
                                <UploadIcon className="h-4 w-4 mr-1" />
                                <span>Upload</span>
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search certificates..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full !border-black border-2 p-2 rounded mb-4"
                        />
                        <div className="flex-1 overflow-y-auto">
                            {pageLoading? (
                                <SkeletonLoader width={800} height={600} minRows={8} maxRows={20} /> // Display the skeleton loader while page is loading
                            )
                            :(
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {filteredCertificates.length > 0 ? (
                                        filteredCertificates.map(cert => (
                                            <Card key={cert.id} className="bg-background p-4 rounded-lg shadow-lg relative">
                                                <CardHeader>
                                                    <CardTitle>{cert.title}</CardTitle>
                                                    <CardDescription>Completed on: {cert.dateCompleted}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div
                                                        className="relative hover:cursor-pointer"
                                                        onClick={() => navigate(`/certificate/${cert.id}`)}
                                                    >
                                                        <img
                                                            src={cert.imageUrl}
                                                            width={300}
                                                            height={200}
                                                            alt={cert.title}
                                                            className="rounded-lg w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
                                                            style={{ aspectRatio: "300/200", objectFit: "cover" }}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                                            <span className="text-white text-xl font-bold">Expand</span>
                                                        </div>
                                                        <button
                                                            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-700 transition-all"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(cert.id);
                                                            }}
                                                        >
                                                            <Delete className="w-6 h-6" />
                                                            <span className="sr-only">Delete</span>
                                                        </button>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-between mt-4">
                                                    <button 
                                                        onClick={() => {
                                                            const certificateLink = `https://jinsil-15c6c.web.app/certificate/${cert.id}`;
                                                            navigator.clipboard.writeText(certificateLink)
                                                                .then(() => {
                                                                    toast({
                                                                        title: "Copied to clipboard",
                                                                        description: "The URL has been copied to your clipboard.",
                                                                        variant: "success",
                                                                        duration: 3000
                                                                    })
                                                                })
                                                                .catch(err => {
                                                                    console.error('Failed to copy: ', err);
                                                                });
                                                        }}
                                                        className="flex flex-row items-center justify-center text-center p-2 px-3 bg-blue-700 text-white rounded-lg hover:border-black hover:border-2 hover:bg-white hover:text-black border-2 transition-all text-xs">
                                                        <ShareIcon className="h-4 w-4 mr-1" />
                                                        Share
                                                    </button>
                                                </CardFooter>
                                            </Card>
                                        ))
                                    ) : (
                                        <p>No certificates found</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
