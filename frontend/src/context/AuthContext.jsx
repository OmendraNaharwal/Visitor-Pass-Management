// auth context

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    // load saved user
    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

    }, []);

    // login
    const login = (userData, jwtToken) => {

        setUser(userData);

        setToken(jwtToken);

        localStorage.setItem("user", JSON.stringify(userData));

        localStorage.setItem("token", jwtToken);

    };

    // logout
    const logout = () => {

        setUser(null);

        setToken("");

        localStorage.removeItem("user");

        localStorage.removeItem("token");

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}