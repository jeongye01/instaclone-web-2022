import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import dotenv from 'dotenv'
dotenv.config();

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

export const apiKey=firebaseConfig.apiKey;
export const auth=firebase.auth();
export const firestore=firebase.firestore();
export const storage=firebase.storage();