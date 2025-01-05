import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createCardToken } from "../../../../../requests/WebPanel/PaymentRequests";
import { useDispatch } from "react-redux";
import { errorToast, successToast, warningToast } from "../../../../../store/toast/actions-creation";


const StripeForm = () => {

    const stripe: any = useStripe();
    const elements: any = useElements();
    const dispatch = useDispatch()

    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentData, setPaymentIntentData] = useState("");
    const [nameFieldValue, setNameFieldValue] = useState<any>("");
    const [isLoading, setIsLoading] = useState(false);

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

            } catch (error) {

            }
        }


    }


    const cardOptions: any = {
        style: {
            // base: {
            //     margin: '5px',
            //     fontSize: '16px',
            //     color: '#424770',
            //     '::placeholder': {
            //         color: '#aab7c4',
            //     },
            // },
            // invalid: {
            //   color: '#9e2146',
            // },
        },
        classes: {
            base: "p-3 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-700 rounded-lg focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
            invalid: "text-red focus:border-red-500"
        },
        hidePostalCode: true,
    }


    const onAddCardSubmitHandler = async (e: any) => {
        if (!!cardInfo && !!nameFieldValue) {
            try {
            setIsLoading(true);
            const cardElement = elements.getElement("card");
            // user &&
            //     stripe
            //     .createPaymentMethod({
            //         type: "card",
            //         card: cardElement,
            //         billing_details: {
            //         name: nameFieldValue != null ? nameFieldValue : user.name,
            //         },
            //     })
            //     .then((result: any) => {
            //         if (result.paymentMethod) {
            //         setPaymentMethod(result);
            //         cardElement.clear();
            //         setNameFieldValue("");
            //         createStripeCustomer({
            //             user_id: user?.id,
            //             paymentMethod: result?.paymentMethod,
            //         }).then((res: any) => {
            //             if (res.data.message === "Payment Method added") {
            //             setCustomerId(res.data.data.customer_id);
            //             setIsLoading(false);
            //             dispatch(
            //                 successToast({
            //                 toast: true,
            //                 message: "Card was added.",
            //                 })
            //             );
            //             } else if (res.data.message === "Card is already added.") {
            //             setIsLoading(false);
            //             dispatch(
            //                 errorToast({
            //                 toast: true,
            //                 message: res.data.message,
            //                 })
            //             );
            //             } else if (res.data.error) {
            //             setIsLoading(false);
            //             dispatch(
            //             warningToast({
            //                 toast: true,
            //                 message: "Oops, something went wrong",
            //             })
            //             );
            //             } else if (
            //             res.data.message === "User retrieved successfully"
            //             ) {
            //             dispatch(updateCurrentUser(res.data.data));
            //             setCustomerId(res.data.data.customer_id);
            //             setIsLoading(false);
            //             dispatch(
            //                 successToast({
            //                 toast: true,
            //                 message: "User data retrieved successfully.",
            //                 })
            //             );
            //             } else {
            //             setIsLoading(false);
            //             dispatch(
            //                 warningToast({
            //                 toast: true,
            //                 message: "Oops, something went wrong",
            //                 })
            //             );
            //             }
            //         });
            //         } else if (result.error) {
            //         setIsLoading(false);
            //         const errorCode = result.error.code;
            //         const formattedCode = errorCode.split('_').join(' ');
            //         dispatch(
            //             errorToast({
            //             toast: true,
            //             message: formattedCode,
            //             })
            //         );
            //         }
            //     });
            } catch (error) {
            setIsLoading(false);
            }
        }
    };



    return (
        <>
            {/* <div className="mx-auto my-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full border border-gray-200 p-6 rounded-lg justify-center"> */}
                <div className="p-4 overflow-auto">
                    <div className="space-y-6">
                        <div className="text-md text-semibold dark:text-white text-gray-700">
                            ADD CARD
                        </div>
                        <div
                            className="rounded-lg space-y-4"
                            // style={paymentCard && { pointerEvents: "none" }}
                        >
                            <div className="border mt-2 rounded-lg">
                                <input
                                type="text"
                                value={nameFieldValue}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700  focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                onChange={(e) => {
                                    setNameFieldValue(e.target.value);
                                }}
                                placeholder="Enter Name"
                                />
                            </div>
                            <div className="border mt-2 rounded-lg">
                                <CardElement
                                onChange={(cardDetails) => {
                                    fetchCardDetail(cardDetails);
                                }}
                                options={cardOptions}
                                />
                            </div>

                        </div>
                        <div className="text-right">
                            <button
                                onClick={(e) => {
                                    onAddCardSubmitHandler(e);
                                }}
                                className={`bg-gray-800 items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white border dark:border-gray-600 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700`}
                                disabled={!cardInfo}
                            >
                                Add Card
                            </button>
                        </div>
                    </div>
                    {/* {customerPaymentMethods && (
                    <div className="mt-4 p-2">
                        <div className="font-semibold">
                        <p className="text-[#273459]">Your Available Cards :</p>
                        </div>
                        <div className="mt-2 max-h-[100px] overflow-y-auto">
                        {customerPaymentMethods.map((card: any) => {
                            return (
                            <>
                                <div
                                key={card?.id}
                                className="border flex p-1.5 rounded-md mr-2 my-2 items-center overflow-x-auto"
                                >
                                <div className="mx-2 text-[#273459]">
                                    <input
                                    type="checkbox"
                                    checked={paymentCard && paymentCard.id === card.id}
                                    onClick={() => {
                                        if (paymentCard) {
                                        setPaymentCard(null);
                                        } else {
                                        setPaymentCard(card);
                                        }
                                    }}
                                    />
                                </div>
                                <div className="mx-2 text-[#273459]">
                                    <svg
                                    width="256px"
                                    height="256px"
                                    viewBox="0 0 24.00 24.00"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-7 h-7"
                                    >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                        d="M5 16C5 15.4477 5.44772 15 6 15H8C8.55229 15 9 15.4477 9 16C9 16.5523 8.55229 17 8 17H6C5.44772 17 5 16.5523 5 16Z"
                                        fill="#0F1729"
                                        ></path>
                                        <path
                                        d="M11 15C10.4477 15 10 15.4477 10 16C10 16.5523 10.4477 17 11 17H12C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15H11Z"
                                        fill="#0F1729"
                                        ></path>
                                        <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6.788 3C5.96948 2.99999 5.29393 2.99998 4.74393 3.04565C4.17258 3.0931 3.64774 3.19496 3.1561 3.45035C2.42553 3.82985 1.82985 4.42553 1.45035 5.1561C1.19496 5.64774 1.0931 6.17258 1.04565 6.74393C0.999977 7.29393 0.999988 7.96946 1 8.78798V15.212C0.999988 16.0305 0.999977 16.7061 1.04565 17.2561C1.0931 17.8274 1.19496 18.3523 1.45035 18.8439C1.82985 19.5745 2.42553 20.1702 3.1561 20.5497C3.64774 20.805 4.17258 20.9069 4.74393 20.9544C5.29394 21 5.96949 21 6.78803 21H17.212C18.0305 21 18.7061 21 19.2561 20.9544C19.8274 20.9069 20.3523 20.805 20.8439 20.5497C21.5745 20.1702 22.1702 19.5745 22.5497 18.8439C22.805 18.3523 22.9069 17.8274 22.9544 17.2561C23 16.7061 23 16.0305 23 15.212V8.78802C23 7.96949 23 7.29394 22.9544 6.74393C22.9069 6.17258 22.805 5.64774 22.5497 5.1561C22.1702 4.42553 21.5745 3.82985 20.8439 3.45035C20.3523 3.19496 19.8274 3.0931 19.2561 3.04565C18.7061 2.99998 18.0305 2.99999 17.212 3H6.788ZM4.07805 5.22517C4.23663 5.1428 4.46402 5.07578 4.90945 5.03879C5.36686 5.00081 5.95898 5 6.83 5H17.17C18.041 5 18.6331 5.00081 19.0906 5.03879C19.536 5.07578 19.7634 5.1428 19.922 5.22517C20.2872 5.41493 20.5851 5.71277 20.7748 6.07805C20.8572 6.23663 20.9242 6.46402 20.9612 6.90945C20.9857 7.20418 20.9947 7.55484 20.9981 8H3.00194C3.00528 7.55484 3.01431 7.20418 3.03879 6.90945C3.07578 6.46402 3.1428 6.23663 3.22517 6.07805C3.41493 5.71277 3.71277 5.41493 4.07805 5.22517ZM3 10V15.17C3 16.041 3.00081 16.6331 3.03879 17.0906C3.07578 17.536 3.1428 17.7634 3.22517 17.922C3.41493 18.2872 3.71277 18.5851 4.07805 18.7748C4.23663 18.8572 4.46402 18.9242 4.90945 18.9612C5.36686 18.9992 5.95898 19 6.83 19H17.17C18.041 19 18.6331 18.9992 19.0906 18.9612C19.536 18.9242 19.7634 18.8572 19.922 18.7748C20.2872 18.5851 20.5851 18.2872 20.7748 17.922C20.8572 17.7634 20.9242 17.536 20.9612 17.0906C20.9992 16.6331 21 16.041 21 15.17V10H3Z"
                                        fill="#0F1729"
                                        ></path>
                                    </g>
                                    </svg>
                                </div>
                                <div className="mx-2 text-[#273459] text-md">
                                    {card?.billing_details?.name}
                                </div>
                                <div className="mx-2 text-[#273459] text-md">
                                    {card?.card?.brand}
                                </div>
                                <div className="mx-2 text-[#273459] text-md">
                                    ***{card?.card?.last4}
                                </div>
                                </div>
                            </>
                            );
                        })}
                        </div>
                        <button
                        onClick={(e) => {
                            onPaymentSubmitHandler(e);
                        }}
                        className={`mt-4 text-white text-sm  p-2 px-4  font-bold rounded-lg 
                            ${paymentCard ? "bg-red_color cursor-pointer" : "bg-gray-600"} 
                            rounded-lg`}
                        disabled={!paymentCard && isLoading}
                        >
                        Pay Now
                        </button>
                        <div>{message}</div>
                    </div>
                    )} */}
                </div>
            {/* </div> */}
        </>
    )

    
    // return (
    //     <>
    //         <h2> This is Stripe Form</h2>
    //         {/* {stripePromise &&  */}
    //         {/* // <Elements stripe={stripePromise}> */}
    //         <CardElement
    //             // onReady={onReadyHandler} 
    //             onChange={(cardDetails) => {
    //                 fetchCardDetail(cardDetails)
    //             }}
    //             options={cardOptions}
    //         />
    //         {/* <CardNumberElement 
    //                     onReady={onReadyHandler} 
    //                     onChange={onChangeHandler}
    //                     options={cardOptions}
    //                     // style={cardStyle}
    //                 />
    //                 <CardExpiryElement 
    //                     onReady={onReadyHandler} 
    //                     onChange={onChangeHandler}
    //                     options={cardOptions}/>
    //                 <CardCvcElement
    //                     onReady={onReadyHandler} 
    //                     onChange={onChangeHandler}
    //                     options={cardOptions}
    //                     /> */}
    //         {/* // </Elements> */}
    //         {/* } */}
    //         <button
    //             onClick={(e) => onSubmitHandler(e)}
    //             className={`mt-4 p-2 border-rounded-lg ${cardInfo ? "bg-indigo-600" : "bg-gray-600"
    //                 } rounded-lg`}
    //         >
    //             Pay now
    //         </button>
    //     </>
    // )
}

export default StripeForm