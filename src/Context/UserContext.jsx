import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);


export default function UserContextProvider(props) {
    const [userLogin , setUserLogin]=useState(null)
    useEffect(()=>{
        if (localStorage.getItem('apiToken') !== null) {
            setUserLogin(localStorage.getItem('apiToken'))
        }
    },[])
    return <UserContext.Provider value={ {userLogin, setUserLogin} }>
        {props.children}
    </UserContext.Provider>
    
}