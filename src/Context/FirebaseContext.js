import { createContext, useState } from "react";
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
    const [items, setItems] = useState([]);

    const db = getFirestore();

    const getCollDb = (num) => {
        const colRef = collection(db, `level${num}`);
        return colRef;
    };

    const incQuantity = (index) => {
        const newArr = items.map((obj) => {
            if(index === obj.id){
                return{...obj, quantity: obj.quantity + 1}           
            } else {
                return obj;
            };
        });
        setItems(newArr);
    };

    const getTotal = () => {
        let totalAmount = 0;
        for(const cart in items){
            totalAmount += items[cart].price * items[cart].quantity;
        }

        return totalAmount.toFixed(2);
    };

    const decQuantity = (index) => {
        const newArr = items.map((obj) => {
            if(index === obj.id){
                return{...obj, quantity: obj.quantity - 1}
            } else {
                return obj;
            };
            
        });
        setItems(newArr);
    };

    return(
        <FirebaseContext.Provider value = {{items, getCollDb, incQuantity, decQuantity, getTotal, db}}>
            {children}
        </FirebaseContext.Provider>
    )
};

export default FirebaseContext;