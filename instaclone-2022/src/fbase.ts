import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain:process.env.REACT_APP_authDomain,
  projectId:process.env.REACT_APP_projectId,
  storageBucket:process.env.REACT_APP_storageBucket ,
  messagingSenderId:process.env.REACT_APP_messagingSenderId ,
  appId:process.env.REACT_APP_appId,
  measurementId:process.env.REACT_APP_measurementId 
};

firebase.initializeApp(firebaseConfig);
export const dbService=firebase.firestore();
export const authService=firebase.auth();
export const faceBookLogin=async()=>{
  const provider = new FacebookAuthProvider();
  const auth = getAuth();
  try{ 
    const result=await signInWithPopup(auth, provider);
    const {user}=result;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
  }catch(error){
    console.log(error);
  }
 

}