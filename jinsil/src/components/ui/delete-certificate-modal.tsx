import * as Dialog from '@radix-ui/react-dialog';
import { XCircleIcon } from 'lucide-react'; // Import XCircleIcon or any other close icon

interface DeleteCertificateProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    certificateId: number;
}

export const DeleteCertificate: React.FC<DeleteCertificateProps> = ({ isOpen, onClose, onDelete, certificateId }) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                <Dialog.Content className="fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">Confirm Deletion</h3>
                        <Dialog.Close asChild>
                            <button className="text-gray-500 hover:text-gray-700">
                                <XCircleIcon className="w-6 h-6" />
                                <span className="sr-only">Close</span>
                            </button>
                        </Dialog.Close>
                    </div>
                    <p className="mt-4">Are you sure you want to delete this certificate?</p>
                    <div className="mt-6 flex justify-end gap-4">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">Cancel</button>
                        <button onClick={() => {
                            onDelete();
                            onClose();
                        }} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
