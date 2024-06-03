'use client';
import BoxTypeAddress from "@/app/components/boxTypeAddress/BoxTypeAddress";
import Navbar from "@/app/components/navbar/Navbar";
import BoxSearchAddress from "./components/search/BoxSearchAddress";
import styles from "@/app/page.module.css";
import BoxAddress from "./components/boxAddressList/BoxAddress";
import { Address } from "./types/AdressType";
import useLocalStorage from "./hooks/useLocalStorage";
import useListAddress from "./hooks/useListAddress";
import { useEffect } from "react";
import useModal from "./hooks/useModal";
import { MessagesEnum } from "./enums/MessagesEnum";

export default function Home() {
  const { getDataStorage } = useLocalStorage();
  const { listData } = useListAddress();
  const { handleClickOpenModal, ModalComponent } = useModal(MessagesEnum.MESSAGE_NOT_DATA);

  useEffect(() => {
    getDataStorage();
  }, []);

  const handleClick = () => {
    const data = getDataStorage();

    if (data.length == 0) {
      handleClickOpenModal();
    }
  };

  return (
    < >
      <Navbar text="Adicionar endereço para Marte" />
      <div className={styles.divisor}></div>
      <BoxTypeAddress />
      <BoxSearchAddress />
      <div className={styles.containerCleanFilter}>
        <h4 className={styles.subtitlePageHome}>Lista de endereços</h4>
        <button onClick={handleClick}>Limpar filtros</button>
      </div>
      {listData.map((item: Address) => (
        <BoxAddress
          key={item.id}
          id={item.id}
          tag={item.tag}
          fullName={item.fullName}
          phone={item.phone}
          address={item.address}
          createdAt={item.createdAt}
        />
      ))}
      {ModalComponent}
    </>
  );
}
