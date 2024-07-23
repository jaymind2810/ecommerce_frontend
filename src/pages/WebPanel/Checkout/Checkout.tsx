
import { successToast, errorToast } from "../../../store/toast/actions-creation";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../../requests/WebPanel/PaymentRequests";
import CheckoutProgressBar from "../components/CheckoutProgressBar/CheckoutProgressBar";
import AddressForm from "./DeliveryDetails/AddressForm/AddressForm";
import DeliveryDetails from "./DeliveryDetails/DeliveryDetails";
import axios from "axios";
import SelectField from "../components/FormComponents/SelectField";
import InputField from "../components/FormComponents/InputField";

// import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// const stripePromise = loadStripe("pk_test_51POKT1P2KIYLyQddR05bnqupTv8qwyFRH8T36VSCBhoarWNOwxVwH1OePtNfK2yLNeSshtRF1TmC9YFjUmoCDwWg00biGjjnBL");

export default function Checkout() {


  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

      <CheckoutProgressBar/>

      <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0"> 
      
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mt-6 sm:mt-8 mb-4">CHECKOUT</h2>
        <div className="lg:flex lg:items-start md:gap-6 mt-6 sm:mt-8 xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-8">
            <DeliveryDetails/>
            {/* <AddressForm /> */}

            <div className="space-y-4 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white">PAYMENT</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                    </div>

                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-700 dark:text-white"> Credit Card </label>
                      <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Delete</button>

                    <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                    <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Edit</button>
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

                  <div className="mt-4 flex items-center gap-2">
                    <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Delete</button>

                    <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                    <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Edit</button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                    </div>

                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-700 dark:text-white"> Paypal account </label>
                      <p id="paypal-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Connect to your account</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Delete</button>

                    <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700"></div>

                    <button type="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white">DELIVERY METHODS</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                    </div>

                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-700 dark:text-white"> $15 - DHL Fast Delivery </label>
                      <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Tommorow</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                    </div>

                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-700 dark:text-white"> Free Delivery - FedEx </label>
                      <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Friday, 13 Dec 2023</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                    </div>

                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-700 dark:text-white"> $49 - Express Delivery </label>
                      <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it today</p>
                    </div>
                  </div>
                </div>
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
              <button type="submit" className="bg-gray-800 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700">Proceed to Payment</button>

              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}