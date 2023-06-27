import Cookies from 'js-cookie';
import React, {useState, createContext} from 'react'

export const UserContext = createContext();function AuthContext({children}) {
const str = JSON.parse(Cookies.get("token") || "{}");
const [auth, setAuth] = useState({
    id: str.id || "",
    username: str.username || "",
    email: str.email || "",
    token: str.token || ""
})
return (<UserContext.Provider value={
    {auth, setAuth}
}> {children} </UserContext.Provider>)}export default AuthContext
