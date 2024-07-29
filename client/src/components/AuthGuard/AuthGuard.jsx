import React, {useContext, useEffect} from 'react';
import AuthContext from "../../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";
import axios from "axios";

const AuthGuard = (props) => {
    const { user,setUser } = useContext(AuthContext);
    const { children } = props;

    if (!user) return <Navigate to="/login" />;
    return <div>{ children }</div>
};

export default AuthGuard;