import { useState } from "react";
import { ShareIcon, UploadIcon } from "../ui/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DiagonalSlideTransition } from "../ui/motion/DiagonalSlideTransition";
import { LoadingIcon } from "../ui/motion/LoadingIcon";
import { SideMenu } from "../ui/side-menu";
import { Navbar } from "../ui/mobile-navbar";

export const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
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
            date: "May 20, 2023",
            imageUrl: "/placeholder.svg",
        },
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

    return (
        <>
            {/* <LoadingIcon /> */}
            <DiagonalSlideTransition />
            <Navbar />
            <div className="flex flex-col md:flex-row h-screen">
                <SideMenu />
                <div className="flex-1 p-8 mt-16 overflow-y-auto md:ml-64">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-4">Manage Your Certificates</h1>
                        <p className="text-muted-foreground mb-8">
                            Upload and share your certificates with ease. Keep track of your achievements and showcase your skills.
                        </p>
                        <div className="bg-card p-6 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">Upload Certificate</h2>
                                <button>
                                    <UploadIcon className="h-5 w-5 mr-2" />
                                    Upload
                                </button>
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Search certificates..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {filteredCertificates.map((cert) => (
                                    <Card key={cert.id} className="bg-background p-4 rounded-lg shadow-md">
                                        <CardHeader>
                                            <CardTitle>{cert.title}</CardTitle>
                                            <CardDescription>Completed on: {cert.date}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <img
                                                src="/placeholder.svg"
                                                width={300}
                                                height={200}
                                                alt={cert.title}
                                                className="rounded-lg"
                                                style={{ aspectRatio: "300/200", objectFit: "cover" }}
                                            />
                                        </CardContent>
                                        <CardFooter>
                                            <button>
                                                <ShareIcon className="h-5 w-5 mr-2" />
                                                Share
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
