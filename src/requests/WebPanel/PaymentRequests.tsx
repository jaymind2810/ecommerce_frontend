import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";


export const createPaymentIntent = async () => {
  return await axiosPost("/api/create-payment-intent/");
};

interface CreateStripeCustomerType {
  user_id: any,
}

export const createCardToken = async (data:CreateStripeCustomerType) => {
  return await axiosPost("api/create-stripe-customer/", data);
};


