import { useToast } from "@/components/ui/use-toast";
import { CertificateUploadFormData } from "@/components/certificate-upload-form";
import { auth, certificatesRef, db, storage } from "@/config/firebase";
import { certificateStorageRef } from "@/config/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
export const useCertificate = () => {
    const { toast } = useToast();

    const createCertificate = async (data: CertificateUploadFormData) => {
        try {
            const { photo, dateCompleted, title, description, awardedTo } = data;
            const uid = auth.currentUser?.uid || localStorage.getItem("uid");

            if (!uid) {
                throw new Error("User is not authenticated");
            }

            // Step 1: Create a new document in the "certificates" collection to get the document ID
            const newDocRef = doc(certificatesRef);

            // Step 2: Create the document with the current data we have
            await setDoc(newDocRef, {
                id: newDocRef.id,
                title,
                description,
                awardedTo,
                dateCompleted,
                ownerUid: uid,
                createdAt: Timestamp.now()
            });

            // Step 3: Upload the image to Firebase Storage
            const photoName = `${uid}_${newDocRef.id}`;
            const photoRef = ref(storage, `${certificateStorageRef}/${photoName}`);
            await uploadBytes(photoRef, photo);

            // Step 4: Get the image URL
            const imageUrl = await getDownloadURL(photoRef);
            // Step 5: Update the document with the image URL
            await setDoc(newDocRef, { imageUrl }, { merge: true });

            // Step 6: Display a toast notification that the certificate was created successfully
            toast({
                title: "Success",
                description: "Certificate created successfully.",
                variant: "success",
                duration: 3000
            });
            
            // Step 7: Return true to indicate that the certificate was created successfully
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: "An Error Occurred",
                    description: `${error.message}`,
                    variant: "destructive",
                    duration: 4000
                });
            }
        }
    };

    const deleteCertificate = async (id: string) => {
        try {
            // Step 0: Check if the user is authenticated
            const uid = auth.currentUser?.uid || localStorage.getItem("uid");
            if (!uid) {
                throw new Error("Not authenticated");
            }

            // Step 1: Delete the document from the "certificates" collection
            await deleteDoc(doc(db, 'certificates', id));

            // Step 2: Now we have to delete the image from Firebase Storage. the uid_id together is the name of the image
            const photoRef = ref(storage, `${certificateStorageRef}/${uid}_${id}`);
            await deleteObject(photoRef);
            
            toast({
                title: "Success",
                description: "Certificate deleted successfully.",
                variant: "success",
                duration: 3000
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: "An Error Occurred",
                    description: `${error.message}. May be an unauthorized action. from the user.`,
                    variant: "destructive",
                    duration: 4000
                });
            }
        }
    };
    return { createCertificate, deleteCertificate };
};