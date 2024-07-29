import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const api = axios.create({
        baseURL: 'http://localhost:8880',
        withCredentials: true,
      });

    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res =  await api.post("/auth/login", inputs);
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        const res =  await api.post("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}