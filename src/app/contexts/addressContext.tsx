'use client';
import { createContext, useState } from "react";
import { Address } from "../types/AdressType";

export const AddressContext = createContext({
    listData: [] as Address[],
    setListData: (value: Address[]) => { },
});

interface ProviderProps {
    children: React.ReactNode;
}

export function AddressProvider({ children }: ProviderProps) {
    const [listData, setListData] = useState<Address[]>([]);

    return (
        <AddressContext.Provider
            value={{
                listData,
                setListData,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
}