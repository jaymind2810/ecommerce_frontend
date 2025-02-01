import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";


export const getAllProducts = async (data:any) => {
  return await axiosGet("/products/", data);
};

export const getAllTrendingProducts = async () => {
    return await axiosGet("/products/trending/");
};

interface ProductData {
    product_id : string | undefined
}


export const getProductDetail = async (data: ProductData) => {
    return await axiosGet(`/products/${data['product_id']}/`);
};


export const getRelatedProducts = async () => {
    return await axiosGet("/products/related/");
};

export const getAllCategoriesData = async () => {
  return await axiosGet("/categories/");
};
