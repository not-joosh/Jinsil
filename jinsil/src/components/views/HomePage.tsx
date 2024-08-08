import { useEffect, useState } from "react";
import { ShareIcon, UploadIcon } from "../ui/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DiagonalSlideTransition } from "../ui/motion/DiagonalSlideTransition";
import { SideMenu } from "../ui/side-menu";
import { Navbar } from "../ui/mobile-navbar";
import { Download } from "lucide-react";
import { LANDINGPAGE } from "@/lib/routes";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../ui/motion/LoadingIcon";
import { CertificateUploadForm } from "../certificate-upload-form";
import { Delete } from "lucide-react";
import { auth } from "@/config/firebase";
import { DeleteCertificateDialogue } from "../ui/delete-certificate-modal";
import { 
    stock03,
} from "@/assets/assets";

export const HomePage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [certificateToDelete, setCertificateToDelete] = useState<string | null>(null);

    // Dummy data
    const [certificates, setCertificates] = useState([
        { 
            id: "BARSKLHB7yVifQ7cdVcK", 
            title: "Certificate of Appreciation", 
            date: "June 15, 2023", 
            imageUrl: {stock03}
        },

    ]);

    const filteredCertificates = certificates.filter(cert =>
        cert.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e: any) => setSearchTerm(e.target.value);

    const handleDelete = (id: string) => {
        setCertificateToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (certificateToDelete !== null) {
            setCertificates(certificates.filter(cert => cert.id !== certificateToDelete));
            setCertificateToDelete(null);
        }
    };

    useEffect(() => {
        const uid = auth.currentUser?.uid || localStorage.getItem('uid');
        if (!uid) {
            navigate(LANDINGPAGE);
        };
    }, [navigate]);

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {filteredCertificates.map(cert => (
                                    <Card key={cert.id} className="bg-background p-4 rounded-lg shadow-lg relative">
                                        <CardHeader>
                                            <CardTitle>{cert.title}</CardTitle>
                                            <CardDescription>Completed on: {cert.date}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="relative hover:cursor-pointer"
                                                onClick={() => navigate(`/certificate/${cert.id}`)}
                                            >
                                                <img
                                                    // src={cert.imageUrl}
                                                    src={cert.imageUrl.stock03}
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
                                            <button className="flex flex-row items-center justify-center text-center p-2 px-3 bg-blue-700 text-white rounded-lg hover:border-black hover:border-2 hover:bg-white hover:text-black border-2 transition-all text-xs">
                                                <ShareIcon className="h-4 w-4 mr-1" />
                                                Share
                                            </button>
                                            <button className="flex flex-row items-center justify-center text-center p-2 px-2 bg-red-500 text-white rounded-lg hover:border-black hover:border-2 hover:bg-white hover:text-black border-2 transition-all text-xs">
                                                <Download className="h-4 w-4 mr-1" />
                                                Download
                                            </button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
