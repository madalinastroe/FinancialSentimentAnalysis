import { createContext, useState } from 'react';

interface UserContextModel {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    id: string | null;
    setId: (value: string) => void;
    accessToken: string | null;
    setAccessToken: (value: string) => void;
}

export const UserContext = createContext<UserContextModel>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    id: '',
    setId: () => { },
    accessToken: null,
    setAccessToken: () => { }
});


export const UserContextProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessToken") ? true : false);
    const [id, setId] = useState(localStorage.getItem("id"));
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

    const data = {
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        id: id,
        setId: setId,
        accessToken: accessToken,
        setAccessToken: setAccessToken
    };

    return <UserContext.Provider value={data}>
        {children}
    </UserContext.Provider>;
};
