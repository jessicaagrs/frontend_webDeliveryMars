'use client';
import { useRouter } from "next/navigation";
import ButtonSaveAddress from "../buttons/ButtonActionSaveAddress";
import { ButtonCancel } from "../buttons/ButtonCancel";
import styles from "../form/FormAddress.module.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Address } from "@/app/types/AdressType";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { TypeAddress } from "@/app/enums/TypeAddressEnum";
import { setDateNow, setFormatTelephone } from "@/app/utils/formatter";
import { v4 as uuid } from "uuid";
import useModal from "@/app/hooks/useModal";
import { MessagesEnum } from "@/app/enums/MessagesEnum";

type FormData = {
    tag: string;
    fullName: string;
    phone: string;
    address: string;
    codeAddress: string;
    typeAddressFactory: boolean;
    typeAddressLocal: boolean;

};

type FormAddressProps = {
    isEdit: boolean;
    addressSelected?: Address | null;
};

export default function FormAddress({ isEdit, addressSelected }: FormAddressProps) {
    const router = useRouter();
    const { updateDataStorage, setDataStorage } = useLocalStorage();
    const { handleClickOpenModal, ModalComponent } = useModal(MessagesEnum.MESSAGE_FUNCTIONALITY_NOT_EXIST);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm<FormData>();

    const watchTypeAddressFactory = watch("typeAddressFactory");
    const watchTypeAddressLocal = watch("typeAddressLocal");

    const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push("/");
    };

    const handleClickViewMap = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleClickOpenModal();
    };

    const validateCheckboxGroup = () => {
        return watchTypeAddressFactory || watchTypeAddressLocal || "Pelo menos um tipo de endereço deve ser selecionado.";
    };

    const onSubmit = (data: FormData) => {
        const dataForm: Address = {
            id: isEdit && addressSelected ? addressSelected?.id : uuid(),
            tag: data.tag,
            fullName: data.fullName,
            phone: setFormatTelephone(data.phone),
            address: data.address,
            codeAddress: Number(data.codeAddress),
            typeAddress: data.typeAddressLocal ? TypeAddress.LOCAL_STORAGE : TypeAddress.FACTORY,
            createdAt: setDateNow()
        };

        if (isEdit) {
            updateDataStorage(dataForm);
            router.push("/");
            return;
        }

        setDataStorage(dataForm);
        router.push("/");
    };

    useEffect(() => {
        if (addressSelected && isEdit) {
            setValue("tag", addressSelected.tag || "0");
            setValue("fullName", addressSelected.fullName || "");
            setValue("phone", setFormatTelephone(addressSelected.phone) || "");
            setValue("address", addressSelected.address || "");
            setValue("codeAddress", addressSelected.codeAddress?.toString() || "");
            setValue("typeAddressFactory", addressSelected.typeAddress === TypeAddress.FACTORY);
            setValue("typeAddressLocal", addressSelected.typeAddress === TypeAddress.LOCAL_STORAGE);
        }
    }, [addressSelected, isEdit, setValue]);

    useEffect(() => {
        if (watchTypeAddressFactory) {
            setValue("typeAddressLocal", false);
        }
    }, [watchTypeAddressFactory, setValue]);

    useEffect(() => {
        if (watchTypeAddressLocal) {
            setValue("typeAddressFactory", false);
        }
    }, [watchTypeAddressLocal, setValue]);

    return (
        <form className={styles.form}>
            <div className={styles.form_groupSelect}>
                <label htmlFor="selecttag">Etiqueta endereço</label>
                <select
                    {...register("tag", {
                        validate: (value) => value !== "0" || "Por favor, selecione uma etiqueta válida."
                    })}
                >
                    <option value="0">Selecione uma etiqueta</option>
                    <option value="Casa">Casa</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Terceiros">Terceiros</option>
                </select>
                {errors.tag && (
                    <p className={styles.form_errorMessage}>{errors.tag.message}</p>
                )}
            </div>

            <div className={styles.form_groupDelivery}>
                <div className={styles.form_groupDeliveryArea}>
                    <span>Área de entrega</span>
                    <button onClick={handleClickViewMap}>Selecione a área para entrega</button>
                </div>
                <img src="/map.jpg" alt="Map of mars" />
            </div>

            <div className={styles.form_groupPersonalData}>
                <div className={styles.form_groupPersonalData_inputs}>
                    <label htmlFor="fullname">Nome completo</label>
                    <input
                        type="text"
                        {...register("fullName", { required: true, minLength: 10 })}
                    />
                    {errors.fullName && (
                        <p className={styles.form_errorMessage}>Informe seu nome completo.</p>
                    )}
                    {errors?.fullName?.type === "minLength" && (
                        <p className={styles.form_errorMessage}>Mínimo de 10 caracteres para nome completo.</p>
                    )}
                </div>
                <div className={styles.form_groupPersonalData_inputs}>
                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="text"
                        {...register("phone", { required: true, minLength: 11 })}
                    />
                    {errors.phone && (
                        <p className={styles.form_errorMessage}>Informe seu telefone.</p>
                    )}
                    {errors?.phone?.type === "minLength" && (
                        <p className={styles.form_errorMessage}>Mínimo de 11 caracteres para o telefone.</p>
                    )}
                </div>
            </div>

            <div className={styles.form_groupPersonalData_inputs_address}>
                <label htmlFor="address">Endereço</label>
                <input
                    type="text"
                    {...register("address", { required: true })}
                />
                {errors.address && (
                    <p className={styles.form_errorMessage}>Informe o endereço do local de entrega.</p>
                )}
            </div>

            <div className={styles.form_groupPersonalData_inputs}>
                <label htmlFor="codeaddress">Lote</label>
                <input
                    type="text"
                    {...register("codeAddress", {
                        required: "Informe o código de localização do endereço.",
                        validate: value => value.length === 4 || "As localizações em Marte possuem 4 dígitos."
                    })}
                />
                {errors.codeAddress && (
                    <p className={styles.form_errorMessage}>{errors.codeAddress.message}</p>
                )}
            </div>

            <div className={styles.form_groupCheckbox}>
                <div className={styles.form_groupCheckbox_item}>
                    <label htmlFor="typeaddressfactory">Fábrica</label>
                    <input
                        type="checkbox"
                        {...register("typeAddressFactory", { validate: validateCheckboxGroup })}
                        onChange={() => {
                            setValue("typeAddressFactory", !watchTypeAddressFactory);
                            trigger("typeAddressFactory");
                        }}
                    />
                </div>
                <div className={styles.form_groupCheckbox_item}>
                    <label htmlFor="typeaddressstorage">Local Armazenamento</label>
                    <input
                        type="checkbox"
                        {...register("typeAddressLocal", { validate: validateCheckboxGroup })}
                        onChange={() => {
                            setValue("typeAddressLocal", !watchTypeAddressLocal);
                            trigger("typeAddressLocal");
                        }}
                    />
                </div>
            </div>
            {(errors.typeAddressLocal || errors.typeAddressFactory) && (
                <p className={styles.form_errorMessage}>Selecione um tipo de endereço</p>
            )}
            <div className={styles.form_groupButtonsActions}>
                <ButtonCancel onClick={handleClickCancel} />
                <ButtonSaveAddress onClick={handleSubmit(onSubmit)} />
            </div>
            {ModalComponent}
        </form>
    );
};