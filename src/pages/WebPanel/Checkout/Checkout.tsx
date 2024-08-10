
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// const stripePromise = loadStripe("pk_test_51POKT1P2KIYLyQddR05bnqupTv8qwyFRH8T36VSCBhoarWNOwxVwH1OePtNfK2yLNeSshtRF1TmC9YFjUmoCDwWg00biGjjnBL");

export default function Checkout() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

      <CheckoutProgressBar/>

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0"> 
      
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mt-6 sm:mt-8 mb-4">CHECKOUT</h2>
        <div className="lg:flex lg:items-start md:gap-6 mt-6 sm:mt-8 xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-8">
            <DeliveryDetails/>
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
                onClick={() => navigate('/payment') }
              >Proceed to Payment</button>

              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}