'use client';
import styles from "../buttons/ButtonAddAddress.module.css";
import { useRouter } from 'next/navigation';


export default function ButtonAddAdress() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/edit/new');
    };

    return (
        <button className={styles.buttonAddAdress} onClick={handleClick}>
            Adicionar endereço
        </button>
    );
};