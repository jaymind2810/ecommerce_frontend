import { axiosGet, axiosPost, axiosPatch, axiosDelete, axiosPut } from "../../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";


export const getAllProducts = async () => {
  return await axiosGet("/products/");
};

// export const getCoords = async () => {
//   return await axiosGet("/box/getCoords/");
// };

// export const getCartCoords = async () => {
//   return await axiosGet("/box/cart/");
// };

// export const sendInquiry = async (data: FormValues) => {
//   return await axiosPost("/auth/inquiry-email/", data);
// };

// export const sendSuscriptionRequest = async (data: {
//   user_name: string;
//   user_email: string;
// }) => {
//   return await axiosPost("/connection/subscriptionReq/", data);
// };

// export const getUserStatistics = async (id: number) => {
//   return await axiosGet(`/box/getUserStatistics/${id}`);
// };

// export const sendSupportReq = async (data: FormValues) => {
//   return await axiosPost('/auth/support-email/', data)
// }
