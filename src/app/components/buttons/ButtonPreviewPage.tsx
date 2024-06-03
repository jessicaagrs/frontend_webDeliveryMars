'use client';
import { PreviewPageIcon } from "../icons/PreviewPageIcon";
import styles from '../buttons/ButtonPreviewPage.module.css';

type ButtonPreviewPageProps = {
    onClick: () => void;
};

export const ButtonPreviewPage = ({ onClick }: ButtonPreviewPageProps) => {

    return (
        <button className={styles.previewPage_button} onClick={onClick}>
            <PreviewPageIcon />
        </button>
    );
};