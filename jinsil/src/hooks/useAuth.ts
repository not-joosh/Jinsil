import { RegisterFormData } from "@/components/register-form";
import { useToast } from "@/components/ui/use-toast";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db, defaultProfilePicture, pfpStorageRef, storage } from "@/config/firebase";
import { LoginFormData } from "@/components/login-form";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LANDINGPAGE, HOME } from "@/lib/routes";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useAuth = () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const clientSignOut = async () => {
        try {
            // Sign out the user
            await signOut(auth);
            localStorage.removeItem("uid");
            toast({
                title: "Success",
                description: "Successfully signed out.",
                variant: "success",
                duration: 3000
            });
            navigate(LANDINGPAGE);
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

    const clientRegister = async (data: RegisterFormData) => {
        try {
            const firstName = data.firstName.trim();
            const lastName = data.lastName.trim();
            const email = data.email.trim();
            const password = data.password.trim();
        
            // Check if email already exists
            const userQuery = await fetchSignInMethodsForEmail(auth, email);
            if (userQuery.length > 0) {
                throw new Error('Email is already in use.');
            }
        
            // Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { uid } = userCredential.user;
        
            // Create user document in Firestore with default PFP
            const userDocRef = doc(db, 'users', uid);
            await setDoc(userDocRef, {
                uid,
                firstName,
                lastName,
                email,
                certificates: [],
                needsValidation: false,
                defaultPFP: defaultProfilePicture,
                customPFP: ""
            });
        
            // Sign in the user
            await signInWithEmailAndPassword(auth, email, password);
        
            toast({
                title: "Success",
                description: "Successfully Registered.",
                variant: "success",
                duration: 3000
            });
    
            if(auth.currentUser?.uid) {
                localStorage.setItem("uid", auth.currentUser.uid);
            } else {
                throw new Error("User not found");
            }
            navigate(HOME);
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

    const clientSignInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
        
            const user = result.user;
            const { uid, displayName, email, photoURL } = user;
    
            // Check if user already exists in Firestore
            const userDocRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userDocRef);
        
            if (!userDoc.exists()) {
                // Create user document if it doesn't exist
                const [firstName, lastName] = (displayName || '').split(' ');
                let customPFP = "";
    
                if (photoURL) {
                    // If the user has a profile picture from Google, upload it to Firebase Storage
                    const pfpRef = ref(storage, `${pfpStorageRef}/${uid}.jpg`);
                    const response = await fetch(photoURL);
                    const blob = await response.blob();
                    await uploadBytes(pfpRef, blob);
                    customPFP = await getDownloadURL(pfpRef);
                }
    
                await setDoc(userDocRef, {
                    uid,
                    firstName: firstName || '',
                    lastName: lastName || '',
                    email,
                    certificates: [],
                    needsValidation: true,
                    defaultPFP: defaultProfilePicture,
                    customPFP: customPFP || ""
                });
            } else {
                // User document exists, check if customPFP is empty
                const existingUserData = userDoc.data();
                const existingCustomPFP = existingUserData?.customPFP || "";
    
                if (photoURL && !existingCustomPFP) {
                    // If the user has a profile picture from Google and no customPFP, upload it to Firebase Storage
                    const pfpRef = ref(storage, `${pfpStorageRef}/${uid}.jpg`);
                    const response = await fetch(photoURL);
                    const blob = await response.blob();
                    await uploadBytes(pfpRef, blob);
                    const newCustomPFP = await getDownloadURL(pfpRef);
    
                    // Update existing user with custom PFP if it doesn't have one
                    await setDoc(userDocRef, {
                        customPFP: newCustomPFP,
                    }, { merge: true });
                }
            }
    
            toast({
                title: "Success",
                description: "Successfully signed in with Google.",
                variant: "success",
                duration: 3000
            });
    
            localStorage.setItem("uid", auth.currentUser?.uid || "");
            navigate(HOME);
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

    const clientSignIn = async (data: LoginFormData) => {
        try {
            // First we need to make sure there are no spaces in all the fields
            const email = data.email.trim();
            const password = data.password.trim();

            // Sign in the user
            await signInWithEmailAndPassword(auth, email, password);
            
            toast({
                title: "Success",
                description: "Successfully signed in.",
                variant: "success",
                duration: 3000
            });
            localStorage.setItem("uid", auth.currentUser?.uid || "");
            navigate(HOME);
        } catch(error: unknown) {
            if(error instanceof Error) {
                toast({
                    title: "An Error Occurred",
                    description: `${error.message}`,
                    variant: "destructive",
                    duration: 4000
                });
            }
        }
    };

    return { clientRegister, clientSignIn, clientSignOut, clientSignInWithGoogle };
};