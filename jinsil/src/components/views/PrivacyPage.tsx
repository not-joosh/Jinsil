import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../ui/icons";

export const PrivacyPage = () => {
    return (
        <div className="min-h-[100dvh] bg-background text-foreground">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    <div>
                        <Link
                            className="bg-black text-white inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            to="/"
                        >
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
                        <p className="text-muted-foreground">
                            At our company, we are committed to protecting your privacy and the security of your personal information.
                            This privacy policy outlines how we collect, use, and safeguard your data.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">Data Collection</h2>
                            <p className="text-muted-foreground">
                                We collect various types of information from you, including your name, email address, and any other
                                information you provide to us through our website or services. This information is used to provide you
                                with the best possible experience and to improve our products and services.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Data Protection</h2>
                            <p className="text-muted-foreground">
                                We take the security of your data very seriously. We use industry-standard encryption and other security
                                measures to protect your information from unauthorized access, disclosure, or misuse. We also regularly
                                review and update our security protocols to ensure they remain effective.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Data Sharing</h2>
                            <p className="text-muted-foreground">
                                We do not share your personal information with any third parties without your consent, except as
                                required by law or to provide you with the services you have requested. We may share aggregated,
                                non-personally identifiable information with our partners and affiliates to improve our products and
                                services.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">User Rights</h2>
                            <p className="text-muted-foreground">
                                You have the right to access, correct, or delete your personal information at any time. You can also
                                opt-out of receiving marketing communications from us. If you have any questions or concerns about your
                                data, please contact our privacy team.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Changes to Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this privacy policy from time to time to reflect changes in our practices or applicable
                                laws. We will notify you of any material changes by posting the updated policy on our website and, if
                                necessary, obtaining your consent.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
