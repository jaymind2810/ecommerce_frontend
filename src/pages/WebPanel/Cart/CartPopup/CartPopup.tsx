import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { getCartItemsDetails } from "../../../../requests/WebPanel/CartRequests";
import { useSelector, useDispatch } from "react-redux";
import { State } from "./../../../../store"
import CartPopupItem from "./CartPopupItem";
import { ActionType } from "../../../../store/cart/action-Types";
import Loader from "../../../../components/Loader";
import { loaderActionStart, loaderActionEnd } from "../../../../store/loader/actions-creations";

interface CartPopupProps {
    setIsCartPopupOpen: any
}

const CartPopup: React.FC<CartPopupProps> = ({
    setIsCartPopupOpen
}) => {
    const navigate = useNavigate()
    const user = useSelector((state: State) => state.user)
    const cart = useSelector((state: State) => state.cart)
    const [subTotal, setSubTotal] = useState<any>()

    const dispatch = useDispatch()

    console.log(cart, "-----Cart-------")

    useEffect(() => {
        try {
            dispatch(loaderActionStart())
            user &&
                getCartItemsDetails({
                    user_id: user.id
                }).then((res) => {
                    if (res.data.status === 200) {
                        dispatch({ type: ActionType.SET_CART, payload: res.data.data })
                        dispatch(loaderActionEnd())
                    }
                    dispatch(loaderActionEnd())
                })
        } catch(error) {
            console.error(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
    }, []);

    const calculateSubtotal = (items:any) => {
        return items.reduce((total:any, item:any) => total + item?.product?.unit_price * item?.quantity, 0);
    };
    
    

    useEffect(() => {
        if (cart?.cart && cart?.cart?.length > 0) {
            setSubTotal(calculateSubtotal(cart.cart))
        }
    }, [cart])

    return (
        <>
            {/* <div className="w-[600px] px-4 md:px-5 lg-6 mx-auto bg-white p-6 rounded border border-gray-200 shadow-lg z-20"> */}
            <div className="w-[520px] px-4 md:px-5 lg-6 mx-auto bg-white p-6 rounded-lg border-gray-200 shadow-lg z-20">
                <h2 className="title p-1 rounded-lg font-manrope font-bold text-xl leading-10 text-center text-gray-700 bg-gray-300">SHOPPING CART
                </h2>
                {cart?.cart && cart?.cart?.length === 0 ? (
                    <>
                        <p className="font-medium leading-8 text-gray-600 text-lg p-4 flex items-center justify-center">
                            Your Cart is Empty..!!
                        </p>
                        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-4">
                            <button
                                className="rounded-md w-full max-w-full  flex items-center bg-gray-300 justify-center transition-all duration-500 hover:bg-indigo-100"
                                onClick={
                                    () => {
                                        navigate('/products/')
                                        setIsCartPopupOpen(false)
                                    }
                                }>
                                <span className="px-2 font-semibold py-1 leading-8 text-gray-700 text-sm">Buy Products</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#374151" strokeWidth="1.6"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="hidden lg:grid grid-cols-2 py-2">
                            <div className="font-medium pl-4 leading-8 text-gray-600 text-md">Product</div>
                            <p className="font-medium leading-8 text-gray-600 text-md flex items-center justify-between">
                                <span className="w-full max-w-[300px] text-center ml-4">Quantity</span>
                                <span className="w-full max-w-[200px] text-center ml-4">Total</span>
                                <span className="w-full max-w-[100px] text-center"></span>
                            </p>
                        </div>
                        {cart?.cart && cart?.cart?.map((item) => (
                            <CartPopupItem key={item.id} item={item} />
                        ))}
                        {cart?.cart && cart?.cart?.length != 0 &&
                            <div className="bg-gray-50 rounded-xl p-4 w-full mb-4 max-lg:max-w-xl max-lg:mx-auto">
                                <div className="flex items-center justify-between w-full mb-4">
                                    <p className="font-normal text-md leading-8 text-gray-500">Sub Total</p>
                                    <h6 className="font-semibold text-md leading-8 text-gray-700">$ {subTotal?.toFixed(2)}</h6>
                                </div>
                                <div className="flex items-center justify-between w-full pb-4 border-b border-gray-200">
                                    <p className="font-normal text-md leading-8 text-gray-500">Delivery Charge</p>
                                    <h6 className="font-semibold text-md leading-8 text-gray-700">$45.00</h6>
                                </div>
                                <div className="flex items-center justify-between w-full py-4">
                                    <p className="font-manrope font-semibold text-md leading-9 text-gray-700">Total</p>
                                    <h6 className="font-manrope font-medium text-md leading-9 text-indigo-500">$ {(subTotal + 45).toFixed(2)}</h6>
                                </div>
                            </div>
                        }
                        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-4">
                            <button
                                className="rounded-md w-full max-w-[280px]  flex items-center bg-gray-300 justify-center transition-all duration-500 hover:bg-indigo-100"
                                onClick={
                                    () => {
                                        navigate('/product/cart')
                                        setIsCartPopupOpen(false)
                                    }
                                }>
                                <span className="px-2 font-semibold py-1 leading-8 text-gray-700 text-sm">Add Coupon Code</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#374151" strokeWidth="1.6"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                className="rounded-md w-full max-w-[280px] py-2 text-sm text-center justify-center items-center bg-gray-800 font-semibold text-white flex transition-all duration-500 hover:bg-indigo-700"
                                onClick={
                                    () => {
                                        navigate('/product/checkout')
                                        setIsCartPopupOpen(false)
                                    }
                                }>
                                Checkout
                                <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                                    fill="none">
                                    <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default CartPopup