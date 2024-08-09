// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA68UyhWw5fHPu6wg3qS05v5e92tZQkFA0",
  authDomain: "jinsil-15c6c.firebaseapp.com",
  projectId: "jinsil-15c6c",
  storageBucket: "jinsil-15c6c.appspot.com",
  messagingSenderId: "900890201093",
  appId: "1:900890201093:web:632123df352da43944606c"
};


// Applications
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


// Storage
export const defaultProfilePicture = "https://firebasestorage.googleapis.com/v0/b/jinsil-15c6c.appspot.com/o/pfps%2Fdefault_icon.png?alt=media&token=0e62a3e6-a5d0-4f80-855b-ce1e3dfde1fd";
export const pfpStorageRef = "pfps";
export const certificateStorageRef = "certificates";


// Collections
export const usersRef = collection(db, "users");
export const certificatesRef = collection(db, "certificates");

