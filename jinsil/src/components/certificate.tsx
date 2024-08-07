import { Link } from "react-router-dom";
import { HeartIcon, ShareIcon } from "./ui/icons";
import { HOME } from "@/lib/routes";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { stock00, stock01, stock02, stock03 } from "@/assets/assets";

interface CertificateProps {
    id: string;
}

export const Certificate = ({ id }: CertificateProps) => {
    // For demonstration purposes, we are using static content.
    // You should replace this with dynamic data fetching based on `id`.
    const certificate = {
        title: "Certificate of Appreciation",
        ownedBy: "MyeongHoon",
        dateCompleted: "June 15, 2023",
        description:
            "Computer Engineering Internship at the University of San Carlos. This certificate is awarded to MyeongHoon for successfully completing the internship program.",
        imageUrl: "/path-to-certificate-image.svg", // Add a certificate image if available
    };

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-8">
            <div className="flex flex-1 flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 w-full md:w-2/3 lg:w-3/4 bg-muted rounded-lg overflow-hidden" style={{ height: '80vh' }}>
                    <img
                        src={stock03}
                        alt={certificate.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col flex-grow gap-6">
                    <div className="bg-card rounded-lg p-6 flex-grow">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold">{certificate.title}</h2>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <ShareIcon className="w-6 h-6" />
                                    <span className="sr-only">Share</span>
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <HeartIcon className="w-6 h-6" />
                                    <span className="sr-only">Like</span>
                                </button>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Awared to</p>
                                <p className="text-lg font-semibold">{certificate.ownedBy}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Date Completed</p>
                                <p className="text-lg font-semibold">{certificate.dateCompleted}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card rounded-lg p-6 flex-grow">
                        <h3 className="text-2xl font-bold mb-4">About this Certificate</h3>
                        <Separator className="my-4" />
                        <div className="prose">
                            <p>{certificate.description}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
