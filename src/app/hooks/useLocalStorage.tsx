import { dataBase } from "../db/dataInitial";
import { Address } from "../types/AdressType";
import useListAddress from "./useListAddress";

const key = "address";

const useLocalStorage = () => {
    const { setListData } = useListAddress();

    const keyExists = (key: string) => {
        const item = localStorage.getItem(key);
        return item !== null;
    };

    const getDataStorage = () => {
        if (!keyExists(key)) {
            const dataInitial: Address[] = dataBase;
            localStorage.setItem(key, JSON.stringify(dataInitial));
            setListData(dataInitial);
        }
        const data: Address[] = JSON.parse(localStorage.getItem(key) || '[]');
        setListData(data);
        return data;
    };

    const getDataByIdStorage = (id: string) => {
        const listStorage: Address[] = getDataStorage();
        const address = listStorage.find(item => item.id == id);

        if (!address) {
            return null;
        }

        return address;
    };

    const updateDataStorage = (data: Address) => {
        const listStorage: Address[] = getDataStorage();

        if (listStorage.length > 0) {
            listStorage.map(item => {
                if (item.id === data.id) {
                    item.tag = data.tag;
                    item.codeAddress = data.codeAddress;
                    item.fullName = data.fullName;
                    item.phone = data.phone;
                    item.address = data.address;
                    item.typeAddress = data.typeAddress;
                    item.createdAt = data.createdAt;
                }
            });

            localStorage.setItem(key, JSON.stringify(listStorage));
            setListData(listStorage);
        }
    };

    const deleteDataStorage = (id: string) => {
        const listStorage: Address[] = getDataStorage();

        if (listStorage.length > 0) {
            listStorage.map((item, index) => {
                if (item.id === id) {
                    listStorage.splice(index, 1);
                }
            });

            localStorage.setItem(key, JSON.stringify(listStorage));
            setListData(listStorage);
        }
    };

    const setDataStorage = (data: Address) => {
        const listStorage: Address[] = getDataStorage();

        if (listStorage.length > 0) {
            listStorage.push(data);
            localStorage.setItem(key, JSON.stringify(listStorage));
            setListData(listStorage);
        } else {
            localStorage.setItem(key, JSON.stringify([data]));
            setListData(listStorage);
        }
    };

    const filterDataStorage = (filter: string) => {
        const listStorage: Address[] = getDataStorage();
        if (filter === "") {
            setListData(listStorage);
            return listStorage;
        }

        const dataFiltered = listStorage.filter((item: Address) => {
            return (item.fullName && item.fullName.toLowerCase().includes(filter.toLowerCase())) ||
                (item.phone && item.phone.toLowerCase().includes(filter.toLowerCase())) ||
                (item.address && item.address.toLowerCase().includes(filter.toLowerCase())) ||
                (item.tag && item.tag.toLowerCase().includes(filter.toLowerCase())) ||
                (item.codeAddress && item.codeAddress.toString().toLowerCase().includes(filter.toLowerCase())) ||
                (item.createdAt && item.createdAt.toLowerCase().includes(filter.toLowerCase())) ||
                (item.typeAddress && item.typeAddress.toLowerCase().includes(filter.toLowerCase()));
        });

        setListData(dataFiltered);
        return dataFiltered;
    };

    return {
        getDataStorage,
        setDataStorage,
        updateDataStorage,
        deleteDataStorage,
        filterDataStorage,
        getDataByIdStorage
    };

};

export default useLocalStorage;