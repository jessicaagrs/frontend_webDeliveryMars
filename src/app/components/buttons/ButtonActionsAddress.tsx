import styles from "../buttons/ButtonActionsAddress.module.css";
type ButtonActionAddressProps = {
    text: string;
    onClick: () => void;
};

export const ButtonActionAddress = ({ text, onClick }: ButtonActionAddressProps) => {

    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
};