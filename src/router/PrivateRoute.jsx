import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const PrivateRoute = ({ children }) => {

    const { logged } = useContext( AuthContext );
    const { pathname, search } = useLocation();

    //Aca podriamos usar un useMemo para evitar que se ejecute en cada renderizado
    // const lastPath = `${pathname}${search}`;
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    return (logged) 
        ? children 
        : <Navigate to="/login" />;
    
};


