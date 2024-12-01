import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createCardToken } from "../../../../../requests/WebPanel/PaymentRequests";


const StripeForm = () => {

    const stripe: any = useStripe();
    const elements: any = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentData, setPaymentIntentData] = useState("");

    const [cardInfo, setCardInfo] = useState<any>(null);


    const fetchCardDetail = (data: any) => {
        if (data.complete) {
            setCardInfo(data)
        } else {
            setCardInfo(null)
        }
    }

    const onSubmitHandler = async (e: any) => {
        console.log(cardInfo, "------On onSubmitHandler--------")
        if (!!cardInfo) {
            try {
                const cardElement = elements.getElement("card");

                console.log(cardElement, "----CardElement---")
                console.log(cardInfo, "----cardInfo---")

                stripe.customers.create({
                    name: 'Jenny Rosen',
                    email: 'jennyrosen@example.com',
                }).then((res: any) => {

                    console.log(res, "---------Customer-----Created-------")

                    stripe.createPaymentMethod({
                        type: 'card',
                        card: cardElement,
                        customer: res?.id,
                        billing_details: {
                            name: 'Jenny Rosen',
                        },
                    })
                        .then((result: any) => {
                            console.log('--------result-------', result)
                            // Handle result.error or result.paymentMethod
                        });
                });





                // stripe.createToken(cardElement)
                // .then((payload:any) => {
                //     console.log('[token]', payload)
                // });

            } catch (error) {

            }
        }


    }

    const cardStyle = {
        marginTop: '15px',
    };

    const cardOptions: any = {
        style: {
            base: {
                margin: '5px',
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            // invalid: {
            //   color: '#9e2146',
            // },
        },
        classes: {
            base: "mt-4",
            invalid: "text-red"
        }
    }




    return (
        <>
            <h2> This is Stripe Form</h2>
            {/* {stripePromise &&  */}
            {/* // <Elements stripe={stripePromise}> */}
            <CardElement
                // onReady={onReadyHandler} 
                onChange={(cardDetails) => {
                    fetchCardDetail(cardDetails)
                }}
                options={cardOptions}
            />
            {/* <CardNumberElement 
                        onReady={onReadyHandler} 
                        onChange={onChangeHandler}
                        options={cardOptions}
                        // style={cardStyle}
                    />
                    <CardExpiryElement 
                        onReady={onReadyHandler} 
                        onChange={onChangeHandler}
                        options={cardOptions}/>
                    <CardCvcElement
                        onReady={onReadyHandler} 
                        onChange={onChangeHandler}
                        options={cardOptions}
                        /> */}
            {/* // </Elements> */}
            {/* } */}
            <button
                onClick={(e) => onSubmitHandler(e)}
                className={`mt-4 p-2 border-rounded-lg ${cardInfo ? "bg-indigo-600" : "bg-gray-600"
                    } rounded-lg`}
            >
                Pay now
            </button>
        </>
    )
}

export default StripeForm