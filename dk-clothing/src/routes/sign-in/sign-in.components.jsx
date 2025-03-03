import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    auth
  } from '../../utils/firebase/firebase.utils';
  import SignUpForm from '../../Component/sign-up-form/sign-up-form.componnet';

  const SignIn = () => {
    // useEffect(() => {
    //     const fetchRedirectUser = async () => {
    //       try {
    //         const response = await getRedirectResult(auth); // Wait for redirect result
    //         if (!response || !response.user) {
    //           console.log("No redirect user found.");
    //           return;
    //         }
    
    //         console.log("Redirect User:", response.user);
    //         await createUserDocumentFromAuth(response.user); // Store user in Firestore
    //       } catch (error) {
    //         console.error("Error handling redirect result:", error);
    //       }
    //     };
    
    //     fetchRedirectUser(); // Call the async function inside useEffect
    //   }, []); // Runs only when component mounts

    // const handleGitHubSignIn = async () => {
    //     try {
    //       const result = await signInWithGitHub();
    //       console.log("User:", result.user);
    //     } catch (error) {
    //       console.error("Error signing in with GitHub:", error);
    //     }
    //   };
    
      
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };
  
    return (
      <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        {/* <button onClick={handleGitHubSignIn}>
            Sign in with Github </button> */}
        <SignUpForm />
      </div>
    );
  };
  
  export default SignIn;