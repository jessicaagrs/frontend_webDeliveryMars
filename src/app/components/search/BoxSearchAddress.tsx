import ButtonAddAdress from "../buttons/ButtonAddAddress";
import { InputSearch } from "./InputSearch";
import styles from "../search/BoxSearchAddress.module.css"

export default function BoxSearchAddress() {
    return (
        <section className={styles.container_search}>
            <InputSearch />
            <ButtonAddAdress />
        </section>
    );
};