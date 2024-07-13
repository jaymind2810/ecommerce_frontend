import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";

interface GetCartData {
    user_id : any
}

export const getCartItemsDetails = async (data: GetCartData) => {
  return await axiosGet(`/cart-items/${data['user_id']}/`);
};
