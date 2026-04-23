import UserContext from "./context/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const {logged} = useContext(UserContext);

    if (!logged) {
        return <Navigate to='/login' />
    }
    return children;
}