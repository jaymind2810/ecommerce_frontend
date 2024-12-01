import React, { useEffect, useState } from "react";
import CheckoutProgressBar from "../components/CheckoutProgressBar/CheckoutProgressBar";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./PaymentOptions/Stripe/Stripe";
import { Elements } from "@stripe/react-stripe-js";


const Payment = () => {

    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [stripePromise, setStripePromise] = useState<any>("");

    const getStripe = () => {
        const publishable_key: any = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
        setStripePromise(loadStripe(publishable_key))
    };

    useEffect(() => {
        if (selectedPaymentOption === 'stripe') {
            getStripe()
        }
    }, [selectedPaymentOption])



    return (
        <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

                <CheckoutProgressBar />

                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white mt-6 sm:mt-8 mb-4">PAYMENT METHODS</h2>
                    <div className="mx-auto lg:flex lg:items-start md:gap-6 mt-6 sm:mt-8 xl:gap-8">
                        <div className="w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-8">
                            <div className="space-y-4 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">PAYMENT</h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>

                                            <div
                                                className="ms-4 text-sm"
                                                onClick={() => {
                                                    selectedPaymentOption && selectedPaymentOption === 'stripe'
                                                        ? setSelectedPaymentOption('')
                                                        : setSelectedPaymentOption('stripe')
                                                }}
                                            >
                                                <label className="font-medium leading-none text-gray-700 dark:text-white"> Stripe </label>
                                                <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your cards</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>

                                            <div
                                                className="ms-4 text-sm"
                                                onClick={() => {
                                                    selectedPaymentOption && selectedPaymentOption === 'paypal'
                                                        ? setSelectedPaymentOption('')
                                                        : setSelectedPaymentOption('paypal')
                                                }}
                                            >
                                                <label className="font-medium leading-none text-gray-700 dark:text-white"> Paypal account </label>
                                                <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Connect to your account</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label className="font-medium leading-none text-gray-700 dark:text-white"> Payment on delivery </label>
                                                <p id="pay-on-delivery-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">+$15 payment processing fee</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div>
                                    {/* <button 
                                className="bg-gray-800 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700"
                                onClick={() => navigate('/payment') }
                            >
                                Pay
                            </button> */}
                                </div>
                                <div>
                                    {selectedPaymentOption &&
                                        <div className=" p-6 w-2/3 bg-white">
                                            {selectedPaymentOption === 'stripe'
                                                ? (
                                                    <>
                                                        <div className="p-4 w-full text-black bg-white mb-2 h-80 rounded-lg">
                                                            Stripe Payment
                                                            {stripePromise &&
                                                                <Elements stripe={stripePromise}>
                                                                    <StripeForm />
                                                                </Elements>
                                                            }
                                                        </div>
                                                    </>
                                                ) : selectedPaymentOption === 'paypal'
                                                    ? (
                                                        <>
                                                            <div className="p-4 w-full text-black bg-white mb-2 rounded-lg h-80 overflow-y-auto">
                                                                <p>PayPal Payment</p>

                                                                {/* <PayPalCheckOut
                                                                amountToPay={amountToPay}
                                                                cartData={cartData}
                                                                user={user}
                                                                setAmountToPay={setAmountToPay}
                                                                setAddBox={setAddBox}
                                                                setNewFullScreen={setNewFullScreen}
                                                                setBoxMarker={setBoxMarker}
                                                                setIsSmallBoxOverlap={setIsSmallBoxOverlap}
                                                                setOverlappedSmallBox={setOverlappedSmallBox}
                                                                setAddABoxFunction={setAddABoxFunction}
                                                                setPaymentId={setPaymentId}
                                                            /> */}
                                                            </div>
                                                        </>
                                                    ) : ''

                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full border border-gray-200 p-6 rounded-lg ">
                            <p className="text-xl font-semibold text-gray-700  dark:text-white">ORDER SUMMARY</p>
                            <div className="space-y-4">
                                <div className=" space-y-2">
                                    <dl className="flex items-center justify-between gap-4 ">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                        <dd className="text-base font-medium text-gray-700 dark:text-white">$8,094.00</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 ">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                        <dd className="text-base font-medium text-green-500">0</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 ">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                        <dd className="text-base font-medium text-gray-700 dark:text-white">$99</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 ">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                        <dd className="text-base font-medium text-gray-700 dark:text-white">$199</dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-700  dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-indigo-600 dark:text-white">$8,191.00</dd>
                                </dl>
                            </div>

                            <div className="space-y-3">
                                <button
                                    className="bg-gray-800 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700"
                                // onClick={() => navigate('/payment') }
                                >Pay </button>

                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                            </div>
                        </div>
                    </div>



                </div>
            </section>
        </>
    )
}

export default Payment