import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";


export const createPaymentIntent = async () => {
  return await axiosPost("/api/create-payment-intent/");
};


