'use client';

import styles from "../search/InputSearch.module.css";
import { SearchAddressIcon } from "../icons/SearchAddressIcon";
import { useState } from "react";
import useLocalStorage from "@/app/hooks/useLocalStorage";

export const InputSearch = () => {
    const [value, setValue] = useState<string>("");
    const { filterDataStorage } = useLocalStorage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        filterDataStorage(e.target.value);
    };

    return (
        <div className={styles.containerSearch}>
            <button className={styles.search_inputButton}>
                <SearchAddressIcon />
            </button>
            <input
                onChange={handleChange}
                value={value}
                className={styles.search_input}
                placeholder="Pesquisar por endereço"
                type="search"
                name="searchaddress"
                id="searchaddress" />
        </div>
    );
};