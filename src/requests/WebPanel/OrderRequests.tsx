import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
import { AddressFormType } from "../../store/address/reducer/reducer";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";

interface OrdersData {
    user?: any
    order_items : any;
    amount : number;
    address: AddressFormType;
    payment_method: String;
}

export const createOrder = async (data: OrdersData) => {
  return await axiosPost("/orders/", data);
};


interface getOrderData {
  user_id? : number | any;
  order_id? : number | any;
}

export const getOrderData = async (data: getOrderData) => {
  return await axiosGet(`/orders/${parseInt(data['order_id'])}/`, data);
};