import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";

interface GetCartData {
    user_id : any
}

interface GetCartItemData {
  user_id: any
  id : any;
  quantity : any;
}

export const getCartItemsDetails = async (data: GetCartData) => {
  return await axiosGet(`/cart-items/${data['user_id']}/`);
};

export const updateCartItemsDetails = async (data: GetCartItemData) => {
  return await axiosPut(`/cart-items/${data['user_id']}/`, data);
};

export const removeItemsFromCart = async (data: GetCartItemData) => {
  return await axiosDelete(`/cart-items/${data['user_id']}/`, data);
};
