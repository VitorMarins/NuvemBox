import React, { createContext, useState } from "react";

const API_URL = "http://localhost:3000/api/auth";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            setIsAuthenticated(true);
            setToken(response.token);
        } catch (error) {
            setIsAuthenticated(false);
            setToken(null);
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        try {
            setIsAuthenticated(false);
            setToken(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}