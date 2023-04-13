import { createContext, useState } from 'react'

export const GlobalContext = createContext()

export default function InfoProvider( {children} ) {
    const [userCredentials, setUserCredentials] = useState({})

    return(
        <GlobalContext.Provider value={{ userCredentials, setUserCredentials }}>
            {children}
        </GlobalContext.Provider>
    )
}