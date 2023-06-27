import React, {useState, createContext} from 'react'

export const UserContext = createContext();function AuthContext({children}) {
const [auth, setAuth] = useState({id: "", username: "", email: "", token: ""})


return (<UserContext.Provider value={
    {auth, setAuth}
}> {children} </UserContext.Provider>)}export default AuthContext
