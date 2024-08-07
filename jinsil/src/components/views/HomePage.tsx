import { useEffect, useState } from "react";
import { ShareIcon, UploadIcon } from "../ui/icons"; // Import Delete
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DiagonalSlideTransition } from "../ui/motion/DiagonalSlideTransition";
import { SideMenu } from "../ui/side-menu";
import { Navbar } from "../ui/mobile-navbar";
import { Download } from "lucide-react";
import { stock01 } from "@/assets/assets";
import { LANDINGPAGE } from "@/lib/routes";
import { useNavigate } from "react-router-dom";
import { LoadingIcon } from "../ui/motion/LoadingIcon";
import { CertificateUploadForm } from "../certificate-upload-form";
import { Delete } from "lucide-react";

export const HomePage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [filteredCertificates, setFilteredCertificates] = useState([
        {
            id: 1,
            title: "Certificate 1",
            date: "June 15, 2023",
            imageUrl: "/placeholder.svg",
        },
        {
            id: 2,
            title: "Certificate 2",
            date: "June 15, 2023",
            imageUrl: "/placeholder.svg",
        },
        {
            id: 3,
            title: "Certificate 3",
            date: "June 15, 2023",
            imageUrl: "/placeholder.svg",
        },
        {
            id: 4,
            title: "Certificate 4",
            date: "June 15, 2023",
            imageUrl: "/placeholder.svg",
        }
        // ... other certificates
    ]);

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value);
        filterCertificates();
    };

    const filterCertificates = () => {
        const filtered = filteredCertificates.filter((cert) =>
            cert.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCertificates(filtered);
    };

    const handleDelete = (id: number) => {
        setFilteredCertificates(filteredCertificates.filter(cert => cert.id !== id));
        // Add your delete logic here (e.g., API call)
    };

    useEffect(() => {
        const uid = localStorage.getItem('uid');
        if (!uid) {
            navigate(LANDINGPAGE);
        };
    }, [navigate]);

    return (
        <>
            {loading && <LoadingIcon />}
            <CertificateUploadForm
                isOpen={isUploadModalOpen}
                onClose={() => setUploadModalOpen(false)}
                setIsLoading={setLoading}
            />
            <DiagonalSlideTransition />
            <Navbar />
            <div className="flex flex-col md:flex-row h-screen">
                <SideMenu />
                <div className="flex-1 p-8 mt-16 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl font-bold mb-4">Manage Your Certificates</h1>
                        <p className="text-muted-foreground mb-8">
                            Upload and share your certificates with ease. Keep track of your achievements and showcase your skills.
                        </p>
                        <div className="bg-card p-6 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">Upload Certificate</h2>
                                <button 
                                    className="flex flex-row items-center border-2 justify-center text-center p-2 px-2 bg-primary text-white rounded-lg hover:border-black hover:border-2 hover:bg-white hover:text-black text-xs transition-all"
                                    onClick={() => setUploadModalOpen(true)}    
                                >
                                    <UploadIcon className="h-4 w-4 mr-1" />
                                    <span>Upload</span>
                                </button>
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Search certificates..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full !border-black border-2 p-2 rounded"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {filteredCertificates.map((cert) => (
                                    <Card key={cert.id} className="bg-background p-4 rounded-lg shadow-md relative">
                                        <CardHeader>
                                            <CardTitle>{cert.title}</CardTitle>
                                            <CardDescription>Completed on: {cert.date}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div 
                                                className="relative hover:cursor-pointer"
                                                onClick={() => navigate(`certificate/${cert.id}`)}
                                            >
                                                <img
                                                    src={stock01}
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
                                                        e.stopPropagation(); // Prevents triggering onClick of parent div
                                                        handleDelete(cert.id);
                                                    }}
                                                >
                                                    <Delete className="w-6 h-6" />
                                                    <span className="sr-only">Delete</span>
                                                </button>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between mt-4">
                                            <button className="flex flex-row items-center justify-center text-center p-2 px-3 bg-blue-700 text-white rounded-lg hover:border-black hover:border-2 hover:bg-white hover:text-black border-2 transition-all  text-xs">
                                                <ShareIcon className="h-4 w-4 mr-1" />
                                                Share
                                            </button>
                                            <button className="flex flex-row items-center justify-center text-center p-2 px-2 bg-red-500 text-white rounded-lg hover:border-black hover:border-2 hover:bg-white hover:text-black border-2 transition-all  text-xs">
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
