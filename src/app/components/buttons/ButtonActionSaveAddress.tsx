import styles from "../buttons/ButtonActionSaveAddress.module.css";

type ButtonSaveAddressProps = {
    onClick?: () => void;
};

export default function ButtonSaveAddress({ onClick }: ButtonSaveAddressProps) {

    return (
        <button className={styles.buttonSaveAddress} onClick={onClick}>
            Salvar endereço
        </button>
    );
};