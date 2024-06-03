'use client';
import { Address } from "@/app/types/AdressType";
import FormAddress from "../../components/form/FormAddress";
import Navbar from "../../components/navbar/Navbar";
import styles from "../[id]/page.module.css";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export default function PageEditAddress({ params }: { params: { id: string; }; }) {
    const [isEdit, setIsEdit] = useState(false);
    const [address, setAddress] = useState<Address | null>(null);
    const { getDataByIdStorage } = useLocalStorage();

    useEffect(() => {
        if (params.id !== "new") {
            setAddress(getDataByIdStorage(params.id));
            setIsEdit(true);
        }
    }, [params.id]);

    return (
        <main>
            <Navbar text="Editar endereço para Marte" pathUrl="edit" />
            <div className={styles.divisor}></div>
            <FormAddress isEdit={isEdit} addressSelected={address} />
        </main>
    );
};