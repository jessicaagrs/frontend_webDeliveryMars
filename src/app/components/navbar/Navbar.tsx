'use client';
import styles from "../navbar/Navbar.module.css";
import { ButtonPreviewPage } from "../buttons/ButtonPreviewPage";
import useModal from "@/app/hooks/useModal";
import { MessagesEnum } from "@/app/enums/MessagesEnum";
import { useRouter } from "next/navigation";

type NavbarProps = {
    text: string;
    pathUrl?: string;
};

export default function Navbar({ text, pathUrl }: NavbarProps) {
    const { handleClickOpenModal, ModalComponent } = useModal(MessagesEnum.MESSAGE_FUNCTIONALITY_NOT_EXIST);
    const router = useRouter();

    const handleClickPreview = () => {
        router.push('/');
    };

    return (
        <nav className={styles.navbar_container}>
            <div className={styles.navbar_items}>
                {pathUrl && pathUrl.length > 0 ?
                    (<ButtonPreviewPage onClick={handleClickPreview} />) :
                    (<ButtonPreviewPage onClick={handleClickOpenModal} />)}
                <h1>{text}</h1>
            </div>
            {ModalComponent}
        </nav>
    );
};