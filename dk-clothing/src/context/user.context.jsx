import { createContext , useState , useEffect} from "react";
import { onAuthChangedListner ,createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";
// as the actual value u want to excess
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) =>{
    const [currentUser , setCurrentUser] = useState(null)
    const value = {currentUser,setCurrentUser}

    useEffect(() => {
       const unsubscribe =  onAuthChangedListner((user) =>{
        if(user){
           createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
       })

       return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}