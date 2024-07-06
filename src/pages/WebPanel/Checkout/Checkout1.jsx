import { successToast, errorToast } from "../../../store/toast/actions-creation";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../../requests/WebPanel/PaymentRequests";

import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51POKT1P2KIYLyQddR05bnqupTv8qwyFRH8T36VSCBhoarWNOwxVwH1OePtNfK2yLNeSshtRF1TmC9YFjUmoCDwWg00biGjjnBL");

export default function Checkout1() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent({
        items: [{ id: "xl-tshirt" }] 
    })
      .then((res) => {
        console.log(res, "-------res---------")
        setClientSecret(res.data.clientSecret)
      })
      // .then((data) => setClientSecret(data.clientSecret));
  }, []);


  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </section>
  );
}