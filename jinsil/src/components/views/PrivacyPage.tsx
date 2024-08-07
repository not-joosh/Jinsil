import { ArrowLeftIcon } from "../ui/icons";
import { motion } from "framer-motion";

interface PrivacyPageProps {
    onBack: () => void;
}

export const PrivacyPage = ({ onBack }: PrivacyPageProps) => {
    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8 z-50 overflow-y-auto"
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <button
                    className="bg-black/90 mb-4 sticky bg-white text-black inline-flex items-center rounded-md px-4 py-2 text-sm font-medium  shadow transition-colors  focus:outline-none focus:ring-2  focus:ring-offset-2"
                    onClick={onBack}
                >
                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                    Go Back
                </button>
            </motion.div>

            <div className="container !text-white mx-auto px-4 py-12 sm:px-6 lg:px-8 max-h-[90vh] overflow-y-auto">
                <div className="space-y-8">
                    <div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Privacy Policy</h1>
                        <p className="text-sm text-white">
                            At Jinsil, we are committed to protecting your privacy and ensuring that your personal information is handled with care.
                            This Privacy Policy outlines how we manage your data when you use our certificate-sharing platform.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold">Data Collection</h2>
                            <p className="text-sm text-white">
                                We only collect the essential information needed to provide our services. This includes:
                                <ul className="list-disc list-inside ml-4">
                                    <li><strong>Email Address</strong>: Used for authentication and communication.</li>
                                    <li><strong>First Name</strong>: Used to personalize your experience.</li>
                                </ul>
                                We do not collect any other personal data beyond what is required for account creation and authentication.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Data Usage</h2>
                            <p className="text-sm text-white">
                                Your data is used solely for the purpose of:
                                <ul className="list-disc list-inside ml-4">
                                    <li><strong>Authentication</strong>: To manage your account and login to our platform.</li>
                                    <li><strong>Communication</strong>: To send you updates related to your account and the platform.</li>
                                </ul>
                                We do not use your data for any other purposes or share it with third parties.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Data Security</h2>
                            <p className="text-sm text-white">
                                We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
                                However, please note that no method of electronic transmission or storage is completely secure.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Third-Party Disclosure</h2>
                            <p className="text-sm text-white">
                                We do not sell, trade, or transfer your personal information to outside parties. We use Firebase for authentication, which may involve the storage and management of your data by Firebase as part of their services.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Your Rights</h2>
                            <p className="text-sm text-white">
                                You have the right to:
                                <ul className="list-disc list-inside ml-4">
                                    <li><strong>Access</strong>: View the information we hold about you.</li>
                                    <li><strong>Update</strong>: Make changes to your account details.</li>
                                    <li><strong>Delete</strong>: Request the deletion of your account and personal information.</li>
                                </ul>
                                If you have any questions or concerns about your privacy or this policy, please contact us directly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
