import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore";

const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyCDNEgzLbdcQQwoSfVoVfFVzs_Lf52v92g",
  authDomain: "wheres-waldo-fe9a3.firebaseapp.com",
  projectId: "wheres-waldo-fe9a3",
  storageBucket: "wheres-waldo-fe9a3.appspot.com",
  messagingSenderId: "569454129401",
  appId: "1:569454129401:web:35414fdf25f40297d1b228"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function FirebaseProvider({children}){

    const db = getFirestore();

    const getCollDb = (num) => {
        const colRef = collection(db, `level${num}`);
        return colRef;
    };

    return(
        <FirebaseContext.Provider value = {{getCollDb, db}}>
            {children}
        </FirebaseContext.Provider>
    )
};

export default FirebaseContext;