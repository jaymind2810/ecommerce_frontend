import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from "./../../images/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { signInRequest } from "../../requests/Auth/AuthRequest";
import { useDispatch } from "react-redux";
import { actionStart, actionEnd } from "../../store/loader/actions-creations";
import { successToast, errorToast } from "../../store/toast/actions-creation";


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
          dispatch(actionStart());
          signInRequest(values).then((res) => {
            console.log(res, "-----------ssssdsd")
            if (res.status === 200) {
                localStorage.setItem("token", res.data.access)
                localStorage.setItem("userId", res.data.userId)
                localStorage.setItem("user", res.data.user)
                dispatch(actionEnd());
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
                    message: res.data.detail,
                    })
                );
            }
          }).catch((error) => {
            dispatch(errorToast({
                toast: true,
                message: "Something went wrong",
            }))
          })
        },
    });


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        {/* <img className="w-8 h-8 mr-2" src={Logo} alt="logo"/> */}
                        <img className="w-8 h-8 mr-2" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="logo"/>
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
