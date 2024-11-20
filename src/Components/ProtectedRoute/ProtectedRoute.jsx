import React from 'react'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {
    
    if (localStorage.getItem('apiToken') !== null) {
        //navigate to sepecific page
        return props.children

    }else{
        //navigate to login page
       return <Navigate to={'/login'}/>
    }
 
}
