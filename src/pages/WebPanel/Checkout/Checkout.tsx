
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
import { AddressFormType } from "../../../store/address/reducer/reducer";
import OrderSummarySideBar from "../components/OrderSummary/OrderSummary";

// import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// const stripePromise = loadStripe("pk_test_51POKT1P2KIYLyQddR05bnqupTv8qwyFRH8T36VSCBhoarWNOwxVwH1OePtNfK2yLNeSshtRF1TmC9YFjUmoCDwWg00biGjjnBL");

export default function Checkout() {

  const [currentSelectedAdd, setCurrentSelectedAdd] = useState<Number | null>(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

      <CheckoutProgressBar />

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">

        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mt-6 sm:mt-8 mb-4">CHECKOUT</h2>
        <div className="lg:flex lg:items-start md:gap-6 mt-6 sm:mt-8 xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-8">
            <DeliveryDetails 
              currentSelectedAdd={currentSelectedAdd}
              setCurrentSelectedAdd={setCurrentSelectedAdd}
            />
          </div>

          <OrderSummarySideBar 
            currentSelectedAdd={currentSelectedAdd}
          />
        </div>
      </div>
    </section>
  );
}