import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../auth";


export const PublicRoute = ({ children }) => {

    const { logged } = useContext( AuthContext );

    return (logged) 
        ? <Navigate to="/" />
        : children;
};
