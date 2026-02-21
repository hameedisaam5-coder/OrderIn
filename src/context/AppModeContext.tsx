import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppModeContextType {
    isSellerMode: boolean;
    setIsSellerMode: (isSeller: boolean) => void;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider = ({ children }: { children: ReactNode }) => {
    const [isSellerMode, setIsSellerMode] = useState(false);

    return (
        <AppModeContext.Provider value={{ isSellerMode, setIsSellerMode }}>
            {children}
        </AppModeContext.Provider>
    );
};

export const useAppMode = () => {
    const context = useContext(AppModeContext);
    if (context === undefined) {
        throw new Error('useAppMode must be used within an AppModeProvider');
    }
    return context;
};
