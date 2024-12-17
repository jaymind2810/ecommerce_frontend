import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";


export const getAllHomePageData = async () => {
    return await axiosGet("/homePage/allData/");
};