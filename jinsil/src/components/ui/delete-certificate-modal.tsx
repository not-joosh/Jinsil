import * as Dialog from '@radix-ui/react-dialog';

interface DeleteCertificateProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteCertificateDialogue = ({ isOpen, onClose, onConfirm }: DeleteCertificateProps) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Overlay className="z-30 fixed inset-0 bg-black bg-opacity-30" />
            <Dialog.Content className="w-full min-h-fit z-40 fixed inset-1/2 bg-white p-6 rounded-lg max-w-sm mx-auto transform -translate-x-1/2 -translate-y-1/2">
                <Dialog.Title className="text-xl font-bold">Confirm Deletion</Dialog.Title>
                <Dialog.Description className="mt-2">
                    Are you sure you want to remove the certificate?
                </Dialog.Description>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        >
                        Yes, Remove
                    </button>
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-500"
                        onClick={onClose}
                        >
                        Cancel
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
