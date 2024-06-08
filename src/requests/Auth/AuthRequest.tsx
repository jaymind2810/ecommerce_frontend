import { axiosPost, axiosGet } from "../../axios/axios-config";
import { SignupFormValues, SignInFormValues } from "./AuthType";

// ========== Register ==================
export const signupRequest = async (user: SignupFormValues) => {
    return await axiosPost("/auth/register/", user);
};


// ========== Login ==================
export const signInRequest = async (user: SignInFormValues) => {
    console.log(user, "--------user---_Login--------")
    return await axiosPost("/auth/login/", user);
};