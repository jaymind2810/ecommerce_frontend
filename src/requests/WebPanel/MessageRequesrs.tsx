import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
import { AddressFormType } from "../../store/address/reducer/reducer";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";

// interface OrdersData {
//     user?: any
//     order_items : any;
//     amount : number;
//     address: AddressFormType;
//     payment_method: String;
// }

// export const createOrder = async (data: OrdersData) => {
//   return await axiosPost("/orders/", data);
// };


interface getAllMessagesData {
  sender? : number | any;
  receiver? : number | any;
  page?: number;
  page_size?: number;
}

export const getAllMessagesData = async (data: getAllMessagesData) => {
  return await axiosGet(`/user/messages/`, data);
};