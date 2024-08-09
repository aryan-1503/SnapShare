import React, {createContext} from 'react';

const AuthContext = createContext({
    user: null,
    setUser: () => {},
    tempUser: null,
    setTempUser: () => {},
});

export default AuthContext;
