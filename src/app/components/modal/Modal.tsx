import { ButtonCancel } from "../buttons/ButtonCancel";
import styles from "../modal/Modal.module.css";

type ModalProps = {
    isOpen: boolean;
    setModalOpen: () => void;
    children: React.ReactNode;
};

export default function Modal({ isOpen, setModalOpen, children }: ModalProps) {
    if (isOpen) {
        return (
            <div className={styles.modalBackground}>
                <div className={styles.modalStyle}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalContentMessage}>
                            <p>Atenção</p>
                            {children}
                        </div>
                        <div className={styles.modalCloseButton}>
                            <ButtonCancel onClick={setModalOpen} />
                        </div>
                    </div>
                </div>
            </div>
        );

    };

    return null;
}