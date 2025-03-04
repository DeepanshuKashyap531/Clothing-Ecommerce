import {useState} from 'react';
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
    } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'
const SignInForm = () =>{

    const defaultFields = {
        email : '',
        password : ''
    }

    const [formFields,setFormFields] = useState(defaultFields);

    const {email,password} = formFields

    console.log(formFields)

    const resetFormField = () =>{
        setFormFields(defaultFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response =await signInAuthUserWithEmailAndPassword(email,password)
            console.log(response)
            resetFormField();

        }
        catch(error){
            if(error.code === "auth/invalid-credential" || error.code === "auth/wrong-password"){
                alert("You Entered The Wrong Password")
            }
            console.log("error occured" , error)
        }
    }

    const handlechange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value});
    }


    return (
        <div className='sign-up-container'>
            <h2>Already Have an Account</h2>
            <span>Sign in with your Email and Password</span>
            <form onSubmit = {handleSubmit} action="">
                <FormInput label = "Email" type="email" required onChange={handlechange} name="email"value={email} />
                <FormInput label = "Password" type="password" required onChange={handlechange} name="password" value={password}/>
                <div className="buttons-container">
                <Button type ="submit">Sign In</Button>
                <Button type= "button" buttonType= "google"onClick ={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
};

export default SignInForm;