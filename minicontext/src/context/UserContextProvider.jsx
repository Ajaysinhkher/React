import React from 'react';
import UserContext from './UserContext';
import { useState } from 'react';  


const UserContextProvider = ({children})=>{
    const [user, setUser] = useState(null) 

    return (
        // the UserContext.provide ris setting the actual data inside thee UsrContext container and teh data values are passed as shown below 
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider> 
    )
}

export default UserContextProvider;