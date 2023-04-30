import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UpdateProfile from "./UpdateProfile";

export default function PrivateRoute() {
    const { currentUser } = useAuth();

    return currentUser ? <UpdateProfile /> : <Navigate to='/signin' />
}