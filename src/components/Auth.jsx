import React, { createContext, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext({
    user: null, 
    login: () => {},
    logout: () => {},
});

function AuthProvider({ children }) {
    const [storedUser, setStoredUser] = useLocalStorage('user', null);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        setStoredUser(userData);
    };

    const logout = () => {
        setUser(null);
        setStoredUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };