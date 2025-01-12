import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from "./../../images/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { signInRequest } from "../../requests/Auth/AuthRequest";
import { useDispatch } from "react-redux";
import { loaderActionStart, loaderActionEnd } from "../../store/loader/actions-creations";
import { successToast, errorToast } from "../../store/toast/actions-creation";
import { loginSuccess } from "../../store/user/action-Creation";


export default function SignIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
          username: '',
          password: ''
        },
        validationSchema: Yup.object({
          username: Yup.string().required('** Required **'),
          password: Yup.string()
            .max(20, '** Must be 6 characters or more. **')
            .required('** Required **')
        }),
        onSubmit: (values) => {
          dispatch(loaderActionStart())
          signInRequest(values).then((res) => {
            if (res.data.success) {
                localStorage.setItem("token", res.data.data.access)
                localStorage.setItem("userId", res.data.data.userId)
                localStorage.setItem("user", res.data.data.user)
                dispatch(loginSuccess(true))
                dispatch(loaderActionEnd())
                dispatch(
                    successToast({
                    toast: true,
                    message: "Login Successfully !!",
                    })
                );
                navigate("/");
            } else {
                dispatch(
                    errorToast({
                    toast: true,
                    message: res.data.message,
                    })
                );
            }
          }).catch((error) => {
            dispatch(errorToast({
                toast: true,
                message: "Something went wrong",
            }))
          }).finally(() => {
            dispatch(loaderActionEnd())
          })
        },
    });


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        {/* <img className="w-8 h-8 mr-2" src={Logo} alt="logo"/> */}
                        {/* <img className="w-8 h-8 mr-2" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="logo"/> */}
                        <svg className="mx-1 w-7 h-7" stroke="currentColor" fill="#4f46e5" strokeWidth="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" font-size="24" height="1em" width="1em"><g fill="#4f46e5"><rect x="40" y="21" width="4" height="23"></rect><rect x="34" y="28" width="4" height="16"></rect><rect x="28" y="23" width="4" height="21"></rect><rect x="22" y="29" width="4" height="15"></rect><rect x="16" y="32" width="4" height="12"></rect><rect x="10" y="30" width="4" height="14"></rect><rect x="4" y="34" width="4" height="10"></rect></g><g fill="#4f46e5"><polygon points="40.1,9.1 34,15.2 30,11.2 20,21.2 15,16.2 4.6,26.6 7.4,29.4 15,21.8 20,26.8 30,16.8 34,20.8 42.9,11.9"></polygon><polygon points="44,8 35,8 44,17"></polygon></g></svg>
                            E-commerce
                    </a>
                    <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign In
                            </h1>
                    {/* <form className="space-y-6" action="#" method="POST"> */}
                    <form 
                        onSubmit={formik.handleSubmit}
                        className="space-y-4 md:space-y-6"
                    >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input 
                                type="char" 
                                name="username" 
                                id="username" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="name@company.com" 
                                required/>
                            {formik.touched.username && formik.errors.username ? (
                                <div className='text-red-500'>{formik.errors.username}</div>
                            ) : null}
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-gray-700 hover:text-indigo-700">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="••••••••" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                required/>
                            {formik.touched.password && formik.errors.password ? (
                                <div className='text-red-500'>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-gray-700 hover:text-indigo-700">
                            <Link to={"/register"}>Sign up</Link>
                        </a>
                    </p>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}
