import { initializeApp } from 'firebase/app';
import { getAuth,
         signInWithRedirect ,
         signInWithPopup,
         GoogleAuthProvider} from 'firebase/auth' // for creatting google popup buton 

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore' // for firebase database

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWXNbry-Rj05jDaCI9KgqbHAMmaYPxwJI",
    authDomain: "clothing-db-17a66.firebaseapp.com",
    projectId: "clothing-db-17a66",
    storageBucket: "clothing-db-17a66.firebasestorage.app",
    messagingSenderId: "793075269383",
    appId: "1:793075269383:web:ed728e5e21a2b557f38fa2"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const provider = new GoogleAuthProvider();
  
  
  provider.setCustomParameters({
    prompt:"select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db ,'users',userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    // console.log(userSnapshot)
    // console.log(userSnapshot.exists()); // exists method is used to check if the given data present in the database


    if(!userSnapshot.exists()){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt
        })
      }catch(error){
        console.log('errior creatinf g the user',error.message)
      }
    }

    return userDocRef;
    // if yser data does't exists
    //create / set the diocument with the data from useraUTH In ,my collection

    // if user data exists

    
    //return userDocRefrence
    } 