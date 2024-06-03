import { useState } from "react";
import Modal from "../components/modal/Modal";

const useModal = (message: string) => {
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const ModalComponent = (
        <Modal isOpen={openModal} setModalOpen={handleCloseModal}>
            {message}
        </Modal>
    );

    return { handleClickOpenModal, ModalComponent };
};

export default useModal;