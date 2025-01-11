import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { State } from "../../../../store";


interface OrderSummarySideBarProps {
    currentSelectedAdd?: number | any;
  }

const OrderSummarySideBar: React.FC<OrderSummarySideBarProps> = ({
    currentSelectedAdd
}) => {
    
    const cart = useSelector((state: State) => state.cart)

    const [currentActive, setCurrentActive] = useState<any>('')
    const [productTotal, setProductTotal] = useState<any>()
    const [totalAmount, setTotalAmount] = useState<any>()
    
    const navigate = useNavigate()

    useEffect(() => {
        const path = window.location.pathname.split('/')
        if (path.includes('cart')) {
            setCurrentActive('cart')
        } else if (path.includes('checkout')) {
            setCurrentActive('checkout')
        } else if (path.includes('payment')) {
            setCurrentActive('payment')
        }
    }, [])

    const calculateProductTotal = (items: any) => {
        return items.reduce((total: any, item: any) => total + item?.product?.unit_price * item?.quantity, 0);
    };

    useEffect(() => {
        setProductTotal(calculateProductTotal(cart.cart))
    }, [cart])

    const calculateTotalAmount = () => {
        setTotalAmount(productTotal + 45 + 199 - 0)
    };

    useEffect(() => {
        calculateTotalAmount()
    }, [productTotal])

    
    

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="mx-auto my-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full border border-gray-200 p-6 rounded-lg ">
                    {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 border border-gray-200 p-6 rounded-lg "> */}
                    <p className="text-xl font-semibold text-gray-700  dark:text-white">ORDER SUMMARY</p>
                    <div className="space-y-4">
                        <div className=" space-y-2">
                            <dl className="flex items-center justify-between gap-4 ">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Products total</dt>
                            <dd className="text-base font-medium text-gray-700 dark:text-white">$ {productTotal}</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4 ">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                            <dd className="text-base font-medium text-green-500">0</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4 ">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                            <dd className="text-base font-medium text-gray-700 dark:text-white">$45</dd>
                            </dl>

                            <dl className="flex items-center justify-between gap-4 ">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd className="text-base font-medium text-gray-700 dark:text-white">$199</dd>
                            </dl>
                        </div>
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-700  dark:text-white">Total</dt>
                            <dd className="text-base font-bold text-indigo-600 dark:text-white">${totalAmount}</dd>
                        </dl>
                    </div>

                    {currentActive && currentActive === 'cart' ? (
                        <>
                            <div className="space-y-3">
                                <button
                                    className="bg-gray-800 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700"
                                    onClick={() => navigate('/product/checkout')}
                                >Proceed to Checkout</button>

                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                <button title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                Continue Shopping
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                </svg>
                                </button>
                            </div>
                        </>
                    ) : currentActive === 'checkout' ? (
                        <>
                            <div className="space-y-3">
                                <button
                                    // className="bg-gray-800 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700"
                                    className={`bg-gray-800 flex w-full items-center justify-center ${currentSelectedAdd ? 'bg-primary-700' : 'bg-primary-700'} rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700`}
                                    onClick={() => navigate('/payment')}
                                    disabled={!currentSelectedAdd}
                                >Proceed to Payment</button>

                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                            </div>
                        </>
                    ) : currentActive === 'payment' ? (
                        <>
                            {/* <div className="w-full flex space-y-3">
                                <button
                                    className="bg-gray-800 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700"
                                // onClick={() => navigate('/payment') }
                                >Pay </button>

                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                            </div> */}
                        </>
                    ) : (
                        <></>
                    ) }

                </div>
                {currentActive && currentActive === 'cart' && (
                    <>
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full border border-gray-200 p-6 rounded-lg ">
                    {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"> */}
                        <form className="space-y-4">
                            <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700  dark:text-white"> Do you have a voucher or gift card? </label>
                            <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700  focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                            </div>
                            <button type="submit" className="rounded-lg w-full py-2 text-sm text-center justify-center items-center bg-gray-800 font-semibold text-white flex transition-all duration-500 hover:bg-indigo-700">Apply Code</button>
                        </form>
                    </div>  
                    </>
                )}
          </div>
        </>
    )
}

export default OrderSummarySideBar