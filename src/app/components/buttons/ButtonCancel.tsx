import styles from "../buttons/ButtonCancel.module.css";

type ButtonCancelProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonCancel = ({ onClick }: ButtonCancelProps) => {

    return (
        <button className={styles.buttonCancel} onClick={onClick}>
            Cancelar
        </button>
    );
};