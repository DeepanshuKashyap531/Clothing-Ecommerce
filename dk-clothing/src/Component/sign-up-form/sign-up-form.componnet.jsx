import {useEffect, useState} from 'react';
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component'
const SignUpForm = () =>{

    const defaultFields = {
        displayName: '',
        email : '',
        password : '',
        confirmPassword: ''
    }

    const [formFields,setFormFields] = useState(defaultFields);
    const {displayName ,email,password,confirmPassword} = formFields;

    console.log(formFields)

    const resetFormField = () =>{
        setFormFields(defaultFields)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password do not match")
            return ;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, {displayName})
            resetFormField();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user email is in already is use')
            }
            console.log("error occured" , error)
        }
    }

    const handlechange = (event) => {
        const {name,value} = event.target;

        setFormFields({...formFields,[name]:value});
    }
    return (
        <div>
            <h1>Sign up with your Email and Password</h1>
            <form onSubmit = {handleSubmit} action="">
                <FormInput label = "Display Name" type="text" required onChange={handlechange} name="displayName" value={displayName}/>

                <FormInput label = "Email" type="email" required onChange={handlechange} name="email"value={email} />

                <FormInput label = "Password" type="password" required onChange={handlechange} name="password" value={password}/>

                <FormInput label = "Confirm Password" type="password" required onChange={handlechange} name="confirmPassword" value={confirmPassword}/>

                <button type ="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignUpForm;