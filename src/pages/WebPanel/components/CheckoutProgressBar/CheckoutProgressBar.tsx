import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface CheckoutProgressBarProps {

}


const CheckoutProgressBar: React.FC<CheckoutProgressBarProps> = ({

}) => {
    const [currentActive, setCurrentActive] = useState<any>('')

    const navigate = useNavigate()

    useEffect(() => {
        const path = window.location.pathname.split('/')
        if (path.includes('cart')) {
            setCurrentActive('cart')
        } else if (path.includes('checkout')) {
            setCurrentActive('checkout')
        } else if (path.includes('payment')) {
            setCurrentActive('payment')
        } else if (path.includes('order')) {
            setCurrentActive('order')
        }
    }, [])

    return (
        <>
            {currentActive &&
                <div className="flex justify-center">
                    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li className={`after:border-1 flex ${(currentActive === 'cart') ? 'text-[#3fb45f]' : ''
                            } items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}>
                            <span 
                                className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden cursor-pointer"
                                onClick={() => navigate('/product/cart')}
                            >
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Cart
                            </span>
                        </li>

                        <li className={`after:border-1 flex ${(currentActive === 'checkout') ? 'text-[#3fb45f]' : ''
                            } items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full`}>
                            <span 
                                className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden cursor-pointer"
                                onClick={() => navigate('/product/checkout')}
                            >
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Checkout
                            </span>
                        </li>

                        <li className={`after:border-1 flex ${(currentActive === 'payment') ? 'text-[#3fb45f]' : ''
                            } items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full`}>
                            <span 
                                className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden"
                                // onClick={() => navigate('/payment')}
                            >
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Payment
                            </span>
                        </li>

                        {/* <li className="flex shrink-0 items-center"> */}
                        <li className={`flex shrink-0 ${(currentActive === 'order') ? 'text-[#3fb45f]' : ''} items-center`}>
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Order summary
                        </li>
                    </ol>
                </div>
            }
        </>
    )
}

export default CheckoutProgressBar