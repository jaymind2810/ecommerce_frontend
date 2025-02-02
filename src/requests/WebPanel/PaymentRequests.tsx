import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
import { AddressFormType } from "../../store/address/reducer/reducer";


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

export const createPaymentIntent = async (data: {
  amount: any;
  order_items?: any;
  user_id: number | undefined;
  customer_id: any;
  payment_method_id: any;
  address?: AddressFormType;
}) => {
  return await axiosPost("/api/create-payment-intent/", data);
};

export const createStripePaymentRecord = async (data: {
  amount: any;
  user_id: any;
  order?: any;
  payment_refrence_id: any;
  customer_id: any;
  payment_method_id: any;
  status: any;
  cart_items?: any;
}) => {
  return await axiosPost("/api/create-stripe-payment-record/", data);
};