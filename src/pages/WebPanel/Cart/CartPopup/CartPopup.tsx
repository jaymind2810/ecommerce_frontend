import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCartItemsDetails } from "../../../../requests/WebPanel/CartRequests";
import { useSelector } from "react-redux";
import { State } from "./../../../../store"
import { CartItemDataType, ProductCartDataType } from "../../Type/CartTypes";

interface CartPopupProps {
    setIsCartPopupOpen: any
}

const CartPopup: React.FC<CartPopupProps> = ({
    setIsCartPopupOpen
}) => {
    const navigate = useNavigate()
    const user = useSelector((state: State) => state.user)

    const [productQuantity, setProductQuantity] = useState(1);
    const [currentCartData, setCurrentCartData] = useState<CartItemDataType[]>([]);

    useEffect(() => {
        getCartItemsDetails({
            user_id : user.id
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data.data, "=======res.data========")
                setCurrentCartData(res.data.data)
            }
        })
    }, [user.id])

    const incrementProductQuantity = (item: CartItemDataType) => {
        console.log(item, "Item=")
        item?.quantity + 1
        
    }

    const decrementProductQuantity = (item: CartItemDataType) => {
        item?.quantity >= 2 ? item?.quantity - 1 : 1
    }

    return (
        <>
        {/* <div className="w-[600px] px-4 md:px-5 lg-6 mx-auto bg-white p-6 rounded border border-gray-200 shadow-lg z-20"> */}
        <div className="w-[600px] px-4 md:px-5 lg-6 mx-auto bg-white p-6 rounded-lg border-gray-200 shadow-lg z-20">
            <h2 className="title p-2 font-manrope font-bold text-2xl leading-10 text-center text-gray-700 bg-gray-300">Shopping Cart
            </h2>
            <div className="hidden lg:grid grid-cols-2 py-2">
                <div className="font-medium justify-between leading-8 text-gray-600 text-lg">Product</div>
                <p className="font-medium leading-8 text-gray-600 text-lg flex items-center justify-between">
                    <span className="w-full max-w-[260px] text-center">Quantity</span>
                    <span className="w-full max-w-[200px] text-center">Total</span>
                </p>
            </div>
            { currentCartData?.map((item: CartItemDataType) => (
            <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-4">
                <div
                    className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div className="img-box"><img src={process.env.REACT_APP_API_URL + item?.product?.product_photo} alt="perfume bottle image" className="xl:w-[140px]"/></div>
                    <div className="pro-data w-full max-w-sm ">
                        <h5 className="font-semibold text-md leading-8 text-gray-700  max-[550px]:text-center">
                            {item?.product?.name}
                        </h5>
                        <p
                            className="font-normal text-gray-500 max-[550px]:text-center">
                            {item?.product?.category}</p>
                        <h6 className="font-medium leading-8 text-indigo-600  max-[550px]:text-center">$ {item?.product?.unit_price}</h6>
                    </div>
                </div>
                <div
                    className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <div className="flex items-center w-full mx-auto justify-center">
                        <button
                            className="group rounded-md border border-gray-200 flex bg-gray-100 hover:bg-gray-200 items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            onClick={() => decrementProductQuantity(item)}>
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                fill="none">
                                <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                            </svg>
                        </button>
                        <p className="px-2 w-10 font-semibold text-gray-700  text-lg lg:max-w-[50px] border-gray-400 bg-transparent placeholder:text-gray-700  text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0">
                            {item?.quantity}
                        </p>
                        <button
                            className="group rounded-md border border-gray-200 flex bg-gray-100 hover:bg-gray-200 items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            onClick={() => incrementProductQuantity(item)}>
                            <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                fill="none">
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>
                    <h6
                        className="text-indigo-600 font-manrope font-bold text-lg leading-9 w-full max-w-[176px] text-center">
                        $120.00</h6>
                </div>
            </div>
            ))}
            <div className="bg-gray-50 rounded-xl p-4 w-full mb-4 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-4">
                    <p className="font-normal text-md leading-8 text-gray-500">Sub Total</p>
                    <h6 className="font-semibold text-md leading-8 text-gray-700">$360.00</h6>
                </div>
                <div className="flex items-center justify-between w-full pb-4 border-b border-gray-200">
                    <p className="font-normal text-md leading-8 text-gray-500">Delivery Charge</p>
                    <h6 className="font-semibold text-md leading-8 text-gray-700">$45.00</h6>
                </div>
                <div className="flex items-center justify-between w-full py-4">
                    <p className="font-manrope font-medium text-lg leading-9 text-gray-700">Total</p>
                    <h6 className="font-manrope font-medium text-lg leading-9 text-indigo-500">$405.00</h6>
                </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-4">
                <button
                    className="rounded-md w-full max-w-[280px]  flex items-center bg-gray-300 justify-center transition-all duration-500 hover:bg-indigo-100"
                    onClick={
                        () => { 
                            navigate('/product/cart') 
                            setIsCartPopupOpen(false)
                        }
                    }>
                    <span className="px-2 font-semibold py-1 leading-8 text-gray-700">Add Coupon Code</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#374151" stroke-width="1.6"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button
                    className="rounded-md w-full max-w-[280px] py-2 text-center justify-center items-center bg-gray-800 font-semibold text-white flex transition-all duration-500 hover:bg-indigo-700"
                    onClick={
                        () => { 
                            navigate('/product/checkout') 
                            setIsCartPopupOpen(false)
                        }
                    }>
                    Checkout
                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                        fill="none">
                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </>
    )
}

export default CartPopup