import React, {useContext} from 'react';
import AuthContext from "../../context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

const AuthGuard = (props) => {
    const { user } = useContext(AuthContext);
    const { children } = props;
    if (!user) return <Navigate to="/login" />;
    return <div>{ children }</div>
};

export default AuthGuard;