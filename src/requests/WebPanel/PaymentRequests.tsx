import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";


export const createPaymentIntent = async () => {
  return await axiosPost("/api/create-payment-intent/");
};

// interface CreateStripeCustomerType {
//   user_id: any,
// }

// export const createCardToken = async (data:CreateStripeCustomerType) => {
//   return await axiosPost("api/create-stripe-customer/", data);
// };

// --------- Stripe ------------------

export const createStripeCustomer = async (data: {
  user_id: number | undefined;
  paymentMethod?: any;
}) => {
  return await axiosPost("/api/create-stripe-customer/", data);
};

export interface CustomerPaymentMethodsApiResponse {
  object?: string;
  data: any;
  has_more: boolean;
  url: string;
}

export const retriveCustomerPaymentMethods = async (data: {
  user_stripe_id: any;
}) => {
  return await axiosPost("/api/retrive-customer-paymentmethod/", data);
};

export const deleteCustomerPaymentMethod = async (data: {
  user_stripe_id: any;
  card?: any;
}) => {
  return await axiosDelete("/api/delete-customer-paymentmethod/", data);
};