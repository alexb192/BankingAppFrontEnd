import React, { useContext, useState } from 'react';

const StoreContext = React.createContext();
const StoreUpdateContext = React.createContext();

export const useStore = () => {
    return useContext(StoreContext);
}

export const useStoreUpdate = () => {
    return useContext(StoreUpdateContext);
}

export const StoreProvider = ({children}) => {
    const [store, setStore] = useState();

    // we expect {username & isLoggedIn}
    const storeLogInInformation = (username) => {
        setStore({username: username, isLoggedIn: true});
    }

    return (
        <StoreContext.Provider value={store}>
            <StoreUpdateContext.Provider value={storeLogInInformation}>
                {children}
            </StoreUpdateContext.Provider>
        </StoreContext.Provider>
    )
}