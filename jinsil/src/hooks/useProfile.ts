import { certificatesRef, usersRef, pfpStorageRef, auth, storage, db } from "@/config/firebase";
import { useCertificate } from "./useCertificate";
import { deleteUser, GoogleAuthProvider, reauthenticateWithPopup, signOut } from "firebase/auth";
import { deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";


export const useProfile = () => {
    const { toast } = useToast();
    const { deleteCertificate } = useCertificate();

    const updateEmail = async () => {
        try {
            // Will not implement this until later when needed...
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                    duration: 5000,
                })
            } else {
                console.log(error);
            }
        }
    };


    const updatePassword = async () => {
        try {
            // Will not implement this yet because
            // its complicated if its a google user
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                    duration: 5000,
                })
            } else {
                console.log(error);
            }
        }
    };

    const updateProfilePicture = async (file: File): Promise<boolean> => {
        try {
            const uid = auth.currentUser?.uid || localStorage.getItem("uid");
            if (!uid) {
                throw new Error("User not found");
            }
      
            const pfpStorageRef = `pfps/${uid}`;
            const oldPfpRefJpg = ref(storage, `${pfpStorageRef}.jpg`);
            const oldPfpRefPng = ref(storage, `${pfpStorageRef}.png`);
            const oldPfpRefJpeg = ref(storage, `${pfpStorageRef}.jpeg`);
    
            // Step 1: Delete old profile picture if it exists
            try {
                await deleteObject(oldPfpRefJpg);
                console.log("Old JPG profile picture deleted");
            } catch (error) {
                console.log("No JPG profile picture found or failed to delete:", error);
            }
            
            try {
                await deleteObject(oldPfpRefPng);
                console.log("Old PNG profile picture deleted");
            } catch (error) {
                console.log("No PNG profile picture found or failed to delete:", error);
            }
            
            try {
                await deleteObject(oldPfpRefJpeg);
                console.log("Old JPEG profile picture deleted");
            } catch (error) {
                console.log("No JPEG profile picture found or failed to delete:", error);
            }
    
            // Step 2: Upload the new profile picture
            const fileExtension = file.type.split("/")[1]; // e.g., 'jpg' or 'png'
            const newPfpRef = ref(storage, `${pfpStorageRef}.${fileExtension}`);
            await uploadBytes(newPfpRef, file);
    
            // Step 3: Get the download URL of the new profile picture
            const newPfpUrl = await getDownloadURL(newPfpRef);
    
            // Step 4: Update user's document with the new profile picture link
            const userDocRef = doc(db, "users", uid);
            await updateDoc(userDocRef, {
                customPFP: newPfpUrl,
            });
    
            // Step 5: Toast and return success
            toast({
                title: "Profile Picture Updated",
                description: "Your profile picture has been updated successfully.",
                variant: "success",
                duration: 4000,
            });
    
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                    duration: 5000,
                });
            } else {
                console.error("Unexpected error:", error);
            }
            return false;
        }
    };


    const deleteUserFootprint = async () => {
        try {
            const uid = auth.currentUser?.uid || localStorage.getItem("uid");
            if (!uid) {
                throw new Error("User not found");
            }

            // STEP 1: Delete all certificates associated with the user
            const userCertificatesQuery = query(certificatesRef, where("ownerUid", "==", uid));
            const certificatesSnapshot = await getDocs(userCertificatesQuery);

            for (const certificateDoc of certificatesSnapshot.docs) {
                const certificateId = certificateDoc.id;
                await deleteCertificate(certificateId);
            }

            // STEP 2: Delete the user's profile picture
            const pfpStorageRefJPG = ref(storage, `${pfpStorageRef}/${uid}.jpg`);
            const pfpStorageRefPNG = ref(storage, `${pfpStorageRef}/${uid}.png`);
            const pfpStorageRefJPEG = ref(storage, `${pfpStorageRef}/${uid}.jpeg`);

            // Delete based on file existence
            try {
                await deleteObject(pfpStorageRefJPG);
            } catch (error) { /* Ignore errors */ }
            try {
                await deleteObject(pfpStorageRefPNG);
            } catch (error) { /* Ignore errors */ }
            try {
                await deleteObject(pfpStorageRefJPEG);
            } catch (error) { /* Ignore errors */ }

            // STEP 3: Delete the user's document from the users collection
            await deleteDoc(doc(usersRef, uid));

            // STEP 4: Reauthenticate and delete the user's account
            const user = auth.currentUser;
            if (user) {
                try {
                    const provider = new GoogleAuthProvider(); 
                    await reauthenticateWithPopup(user, provider);

                    // After successful reauthentication
                    await deleteUser(user);
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        throw new Error("Reauthentication failed: " + error.message);
                    }
                }
            };

            // STEP 5: Sign out the user
            await signOut(auth);

            // STEP 6: Toast and return success
            toast({
                title: "Success",
                description: "Account deleted successfully",
                variant: "success",
                duration: 3000,
            });
            localStorage.removeItem("uid");
            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: "Error",
                    description: error.message,
                    variant: "destructive",
                    duration: 5000,
                });
            } else {
                console.error(error);
            }
        }
    };
    
    return { updateEmail, updatePassword, updateProfilePicture, deleteUserFootprint };
};