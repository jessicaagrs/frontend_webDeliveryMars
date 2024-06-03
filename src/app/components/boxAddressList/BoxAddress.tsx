'use client';

import { useRouter } from "next/navigation";
import { ButtonActionAddress } from "../buttons/ButtonActionsAddress";
import styles from "../boxAddressList/BoxAddress.module.css";
import { Address } from "../../types/AdressType";
import Image from "next/image";
import { setRandomNumber } from "../../utils/formatter";
import useLocalStorage from "@/app/hooks/useLocalStorage";

type BoxAddressDetailsProps = Omit<Address, "codeAddress" | "typeAddress">;

export default function BoxAddress({ id, tag, fullName, phone, address, createdAt }: BoxAddressDetailsProps) {
    const router = useRouter();
    const { deleteDataStorage } = useLocalStorage();

    const handleClickEditAddress = () => {
        router.push(`/edit/${id}`);
    };

    const handleClickDeleteAddress = () => {
        deleteDataStorage(id);
    };

    return (
        <div className={styles.containerAdress}>
            <div className={styles.containerAdress_items}>
                <div className={styles.containerDetailsAddress}>
                    <Image src={`/mars${setRandomNumber()}.jpg`} alt="Box Address Details" width={100} height={110} className={styles.containerDetailsAddress_image} />
                    <div className={styles.containerDetailsAddress_items}>
                        <h5 className={styles.containerDetailsAddress_title}>{tag}</h5>
                        <span>{fullName}</span>
                        <span>{phone}</span>
                        <p>{address}</p>
                    </div>
                </div>
                <div className={styles.containerDetailsAddress_date}>
                    {createdAt}
                </div>
            </div>
            <div className={styles.containerAdress_items_buttonsActions}>
                <ButtonActionAddress text="Editar endereço" onClick={handleClickEditAddress} />
                <ButtonActionAddress text="Remover endereço" onClick={handleClickDeleteAddress} />
            </div>
        </div>
    );
};