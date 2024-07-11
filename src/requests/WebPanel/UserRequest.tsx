import { axiosGet, axiosPost, axiosPut, axiosPatch, axiosDelete } from "../../axios/axios-config";
// import { axiosGet, axiosPost } from "../../../axios/axios-config";
import { GetUserData } from './UserRequestType'


export const userProfileData = async (data: GetUserData) => {
    return await axiosGet("/auth/user/", data);
};