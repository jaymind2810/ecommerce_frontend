import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
import { AddressFormValueType } from "../../pages/WebPanel/Type/CheckoutType";



interface GetUserAllAddressData {
    user_id: any
}


export const getUserAllAddress = async (data: GetUserAllAddressData) => {
    return await axiosGet("/address/");
};

export const addUserAddress = async (data: AddressFormValueType) => {
    return await axiosPost("/address/", data);
};

export const deleteUserAddress = async (address_id: number) => {
    return await axiosDelete(`/address/${address_id}/`);
};