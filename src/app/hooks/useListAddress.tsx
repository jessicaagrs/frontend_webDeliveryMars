import { useContext } from "react";
import { AddressContext } from "../contexts/addressContext";

export default function useListAddress() {
    return useContext(AddressContext);
};
