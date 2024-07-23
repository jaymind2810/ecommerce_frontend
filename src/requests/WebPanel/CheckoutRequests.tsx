import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";



interface GetUserAllAddressData {
    user_id: any
}

interface GetCartData {
    user_id : any
}

export const getUserAllAddress = async (data: GetUserAllAddressData) => {
    return await axiosGet("/address/");
  };