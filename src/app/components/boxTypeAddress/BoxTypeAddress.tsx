'use client';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import styles from '../boxTypeAddress/BoxtypeAddress.module.css';
import { useState } from 'react';
export default function BoxTypeAddress() {
    const [typeAddressFactory, setTypeAddressFactory] = useState(false);
    const [typeAddressStorageLocation, setTypeAddressStorageLocation] = useState(true);
    const { filterDataStorage } = useLocalStorage();

    const handleClickTypeAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTypeAddressFactory(!typeAddressFactory);
        setTypeAddressStorageLocation(!typeAddressStorageLocation);
        filterDataStorage(e.currentTarget.textContent ?? "");
    };

    return (
        <section className={styles.containerTypeAddress}>
            <button
                className={typeAddressFactory ? `${styles.containerTypeAddress_buttons} ${styles.containerTypeAddress_buttons_active}` : styles.containerTypeAddress_buttons}
                onClick={handleClickTypeAddress}>
                Fábrica
            </button>
            <button
                className={typeAddressStorageLocation ? `${styles.containerTypeAddress_buttons} ${styles.containerTypeAddress_buttons_active}` : styles.containerTypeAddress_buttons}
                onClick={handleClickTypeAddress}>
                Local Armazenamento
            </button>
        </section>
    );
};