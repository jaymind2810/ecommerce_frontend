import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, createStripeCustomer, createStripePaymentRecord, deleteCustomerPaymentMethod, retriveCustomerPaymentMethods } from "../../../../../requests/WebPanel/PaymentRequests";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast, warningToast } from "../../../../../store/toast/actions-creation";
import { State } from "../../../../../store";
import { updateCurrentUser } from "../../../../../store/user/action-Creation";
import Loader from "../../../../../components/Loader";
import ModelDialog from "../../../../../components/ModelDialog/ModelDialog";
import { loaderActionEnd, loaderActionStart } from "../../../../../store/loader/actions-creations";
import { CartItem } from "../../../../../store/cart/reducer/reducer";
import { OrdersType } from "../../../../../store/order/reducer/reducer";
import { clearCart } from "../../../../../store/cart/action-Creation";
import { addNewUserOrders } from "../../../../../store/order/action-Creation";
import { useNavigate } from "react-router";


interface StripeFromProps {
    amountToPay: number
    cartItems: CartItem[]
}


const StripeForm:React.FC<StripeFromProps> = ({
    amountToPay,
    cartItems
}) => {

    const user = useSelector((state: State) => state.user);
    const order = useSelector((state: State) => state.order)

    const loading = useSelector((state: State) => state.loader.isLoading);
    // const { isLoading } = useSelector((state: State) => state.loader);
    const stripe: any = useStripe();
    const elements: any = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nameFieldValue, setNameFieldValue] = useState<any>("");
    const [isLoading, setIsLoading] = useState<any>(false)
    const [cardInfo, setCardInfo] = useState<any>(null);
    const [userStripeId, setUserStripeId] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<any>(null);
    const [customerPaymentMethods, setCustomerPaymentMethods] = useState<any>([]);
    const [paymentCard, setPaymentCard] = useState<any>(null);
    const [currentCard, setCurrentCard] = useState<any>(null);
    const [isModelOpen, setIsModelOpen] = useState<any>(false)

    const [currentOrder, setCurrentOrder] = useState<OrdersType>()

    const fetchCardDetail = (data: any) => {
        if (data.complete) {
            setCardInfo(data)
        } else {
            setCardInfo(null)
        }
    }


    useEffect(() => {
        user && user?.user_stripe_id && (
            setUserStripeId(user.user_stripe_id)
        )
    }, [user?.user_stripe_id])


    useEffect(() => {
        try {
            if (userStripeId) {
                dispatch(loaderActionStart())
                retriveCustomerPaymentMethods({
                    user_stripe_id: user?.user_stripe_id,
                }).then((res) => {
                    if (res.data.success === true) {
                        setCustomerPaymentMethods(res.data.data.data);
                    }
                    dispatch(loaderActionEnd())
                });
            }
        } catch(error) {
            console.error(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
        
    }, [userStripeId]);

    const onAddCardHandler = async (e: any) => {
        try {
            if (!!cardInfo && !!nameFieldValue) {
                try {
                    dispatch(loaderActionStart())
                    const cardElement = elements.getElement("card");
                    user &&
                        stripe
                        .createPaymentMethod({
                            type: "card",
                            card: cardElement,
                            billing_details: {
                                name: nameFieldValue != null ? nameFieldValue : user?.first_name,
                            },
                        })
                        .then((result: any) => {
                            if (result.paymentMethod) {
                                setPaymentMethod(result);
                                cardElement.clear();
                                setNameFieldValue("");
                                createStripeCustomer({
                                    user_id: user?.id,
                                    paymentMethod: result?.paymentMethod,
                                }).then((res: any) => {
                                    console.log(res, "-----Res-----")
                                    if (res.data.message === "Payment Method Added to User") {
                                        setCustomerPaymentMethods([...customerPaymentMethods, res.data.data]);
                                        dispatch(
                                            successToast({
                                            toast: true,
                                            message: "Card added successfully.",
                                            })
                                        );
                                    } else if (res.data.message === "Card is already added.") {
                                        dispatch(
                                            errorToast({
                                            toast: true,
                                            message: res.data.message,
                                            })
                                        );
                                    } else if (res.data.error) {
                                        dispatch(
                                        warningToast({
                                            toast: true,
                                            message: "Oops, something went wrong",
                                        })
                                        );
                                    } else if (res.data.message === "User data retrived successfully") {
                                        dispatch(updateCurrentUser(res.data.data));
                                        setUserStripeId(res.data.data.user_stripe_id);
                                        dispatch(
                                            successToast({
                                            toast: true,
                                            message: "Your card added and old data retrieved successfully.",
                                            })
                                        );
                                    } else {
                                        dispatch(
                                            warningToast({
                                            toast: true,
                                            message: "Oops, something went wrong",
                                            })
                                        );
                                    }
                                });
                            } else if (result.error) {
                                const errorCode = result.error.code;
                                const formattedCode = errorCode.split('_').join(' ');
                                dispatch(
                                    errorToast({
                                    toast: true,
                                    message: formattedCode,
                                    })
                                );
                            }
                        });
                } catch (error) {
                    dispatch(loaderActionEnd())
                }
            }
        } catch(error) {
            console.error(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
        
    };

    const onDeleteCardHandler = async () => {
        try {
            if (currentCard) {
                dispatch(loaderActionStart())
                deleteCustomerPaymentMethod({
                    user_stripe_id: user?.user_stripe_id,
                    card: currentCard
                }).then((res) => {
                    if (res.data.success === true) {
                        const newList = customerPaymentMethods.filter((item:any) => item.id !== res.data.data.id);
                        setCustomerPaymentMethods(newList);
                    }
                });
            }
        } catch (error) {
            console.error(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
    }


    // const onConfirmOrder = () => {
    //     if (amountToPay && cartItems && order.order_address) {
    //         createOrder({
    //             user: user ? user?.id : 0,
    //             order_items: cartItems,
    //             amount: amountToPay,
    //             address: order && order?.order_address,
    //             payment_method: "Cash"
    //         }).then((res) => {
    //             if (res?.data?.success === true) {
    //                 dispatch(addNewUserOrders(res?.data?.data))
    //                 dispatch(clearCart())
    //                 navigate(`/order/${res?.data?.data?.id}`)
    //                 dispatch(
    //                     successToast({
    //                         toast: true,
    //                         message: "Ordered Successfully.",
    //                     })
    //                 );
    //             } else {
    //                 dispatch(
    //                     errorToast({
    //                         toast: true,
    //                         message: "Something went wrong..!!",
    //                     })
    //                 );
    //             }
    //         }
    //     )
        
    //     }
    // } 


    const onPaymentSubmitHandler = async (e: any) => {
        e.preventDefault();
        e.target.disabled = true;
        if (paymentCard) {
        setIsLoading(true);
        if (paymentCard) {
            createPaymentIntent({
                amount: amountToPay,
                user_id: user?.id,
                customer_id: user?.user_stripe_id,
                payment_method_id: paymentCard.id,
                order_items: cartItems,
                address: order && order?.order_address,
            }).then(async (res) => {
            if (res.data.success === true) {
                console.log(res.data.data, "====res.data.data==========")
                if (res.data.data.intent.client_secret) {
                const clientSecret = res.data.data.intent.client_secret;
                setCurrentOrder(res.data.data.order)
                await stripe
                    .confirmCardPayment(clientSecret)
                    .then((result: any) => {
                        console.log(result, "==========result---------")
                    if (result.error) {
                        console.error(result.error);
                        createStripePaymentRecord({
                            amount: amountToPay,
                            user_id: user?.id,
                            payment_refrence_id: res?.data?.data?.id,
                            customer_id: user?.user_stripe_id,
                            payment_method_id: paymentCard.id,
                            status: "FAIL",
                            order: res.data.data.order,
                            cart_items: cartItems,
                        }).then((response: any) => {
                            console.log("Payment Error--");
                            // setMessage(result.error);
                            // setIsLoading(false);
                            // e.target.disabled = false;
                            // setAmountToPay(0);
                            // setAddBox(true);
                            // setNewFullScreen(true);
                            // setBoxMarker(true);
                            // setIsSmallBoxOverlap(false);
                            // setOverlappedSmallBox([]);
                            // setAddABoxFunction(GetABoxType.PAYMENT_FAIL);
                            // setIsLoading(false);
                        });
                    } else if (result.paymentIntent) {
                        console.log("-------In If000000")
                        createStripePaymentRecord({
                            amount: amountToPay,
                            user_id: user?.id,
                            payment_refrence_id: result?.paymentIntent?.id,
                            customer_id: user?.user_stripe_id,
                            payment_method_id: paymentCard.id,
                            status: "DONE",
                            order: res.data.data.order,
                            cart_items: cartItems,
                        }).then((response: any) => {
                        e.target.disabled = true;
                        if (response.data.success === true) {
                            console.log("Payment Success....")
                            dispatch(clearCart())
                            dispatch(addNewUserOrders(res?.data?.data?.order))
                            navigate(`/order/${res?.data?.data?.id}`)
                            dispatch(
                                successToast({
                                    toast: true,
                                    message: "Ordered Successfully.",
                                })
                            );
                        }
                        });
                    }
                    });
                } else {
                setIsLoading(false);
                e.target.disabled = false;
                dispatch(
                    warningToast({
                    toast: true,
                    message: "Oops, something went wrong",
                    })
                );
                }
            } else {
                setIsLoading(false);
                e.target.disabled = false;
                dispatch(
                warningToast({
                    toast: true,
                    message: "Oops, something went wrong",
                })
                );
            }
            });
        }
        setIsLoading(false);
        }
    };


    const cardOptions: any = {
        style: {
            // base: {
            //     margin: '5px',
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



    return (
        <>
            { loading && (
                <Loader/>
            )}
            <div className="p-4 overflow-auto">
                {/* ======= Add Card Functionality ========= */}
                <div className="space-y-6">
                    <div className="text-md text-semibold dark:text-white text-gray-700">
                        ADD CARD
                    </div>
                    <div
                        className="rounded-lg space-y-4"
                        style={paymentCard && { pointerEvents: "none" }}
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
                                onAddCardHandler(e);
                            }}
                            className={`items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-white 
                                border dark:border-gray-600 hover:bg-indigo-700
                                focus:outline-none focus:ring-4 focus:ring-primary-300 
                                dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                                ${paymentCard ? "bg-gray-600" : "bg-gray-800 cursor-pointer"}`}
                            disabled={!cardInfo}
                        >
                            Add Card
                        </button>
                    </div>
                </div>
                {/* ========= Your Card Show =============== */}
                {(customerPaymentMethods && (customerPaymentMethods.length !== 0)) ? (
                    <div className="mt-4 p-2">
                        <div className="">
                            <p className="text-md text-semibold dark:text-white text-gray-700">YOUR CARDS:</p>
                        </div>
                        <div className="mt-2 max-h-[100px] overflow-y-auto">
                        {customerPaymentMethods.map((card: any) => {
                            return (
                            <>
                                <div
                                key={card?.id}
                                className="border flex p-1.5 rounded-md mr-2 my-2 items-center overflow-x-auto"
                                >
                                <div className="mx-2 text-[#273459] content-center">
                                    <input
                                    type="checkbox"
                                    className="h-4 w-5"
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
                                    className="w-7 h-7 dark:text-white"
                                    >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M5 16C5 15.4477 5.44772 15 6 15H8C8.55229 15 9 15.4477 9 16C9 16.5523 8.55229 17 8 17H6C5.44772 17 5 16.5523 5 16Z" fill="#0F1729"></path>
                                        <path d="M11 15C10.4477 15 10 15.4477 10 16C10 16.5523 10.4477 17 11 17H12C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15H11Z" fill="#0F1729"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.788 3C5.96948 2.99999 5.29393 2.99998 4.74393 3.04565C4.17258 3.0931 3.64774 3.19496 3.1561 3.45035C2.42553 3.82985 1.82985 4.42553 1.45035 5.1561C1.19496 5.64774 1.0931 6.17258 1.04565 6.74393C0.999977 7.29393 0.999988 7.96946 1 8.78798V15.212C0.999988 16.0305 0.999977 16.7061 1.04565 17.2561C1.0931 17.8274 1.19496 18.3523 1.45035 18.8439C1.82985 19.5745 2.42553 20.1702 3.1561 20.5497C3.64774 20.805 4.17258 20.9069 4.74393 20.9544C5.29394 21 5.96949 21 6.78803 21H17.212C18.0305 21 18.7061 21 19.2561 20.9544C19.8274 20.9069 20.3523 20.805 20.8439 20.5497C21.5745 20.1702 22.1702 19.5745 22.5497 18.8439C22.805 18.3523 22.9069 17.8274 22.9544 17.2561C23 16.7061 23 16.0305 23 15.212V8.78802C23 7.96949 23 7.29394 22.9544 6.74393C22.9069 6.17258 22.805 5.64774 22.5497 5.1561C22.1702 4.42553 21.5745 3.82985 20.8439 3.45035C20.3523 3.19496 19.8274 3.0931 19.2561 3.04565C18.7061 2.99998 18.0305 2.99999 17.212 3H6.788ZM4.07805 5.22517C4.23663 5.1428 4.46402 5.07578 4.90945 5.03879C5.36686 5.00081 5.95898 5 6.83 5H17.17C18.041 5 18.6331 5.00081 19.0906 5.03879C19.536 5.07578 19.7634 5.1428 19.922 5.22517C20.2872 5.41493 20.5851 5.71277 20.7748 6.07805C20.8572 6.23663 20.9242 6.46402 20.9612 6.90945C20.9857 7.20418 20.9947 7.55484 20.9981 8H3.00194C3.00528 7.55484 3.01431 7.20418 3.03879 6.90945C3.07578 6.46402 3.1428 6.23663 3.22517 6.07805C3.41493 5.71277 3.71277 5.41493 4.07805 5.22517ZM3 10V15.17C3 16.041 3.00081 16.6331 3.03879 17.0906C3.07578 17.536 3.1428 17.7634 3.22517 17.922C3.41493 18.2872 3.71277 18.5851 4.07805 18.7748C4.23663 18.8572 4.46402 18.9242 4.90945 18.9612C5.36686 18.9992 5.95898 19 6.83 19H17.17C18.041 19 18.6331 18.9992 19.0906 18.9612C19.536 18.9242 19.7634 18.8572 19.922 18.7748C20.2872 18.5851 20.5851 18.2872 20.7748 17.922C20.8572 17.7634 20.9242 17.536 20.9612 17.0906C20.9992 16.6331 21 16.041 21 15.17V10H3Z" fill="#0F1729"></path>
                                    </g>
                                    </svg>
                                </div>
                                <div className=" mx-2 flex-none dark:text-white text-gray-700 text-sm">
                                    {card?.billing_details?.name}
                                </div>
                                <div className="mx-2 flex-none dark:text-white text-gray-700 text-sm">
                                    {card?.card?.brand}
                                </div>
                                <div className="mx-2 flex-none dark:text-white text-gray-700 text-sm">
                                    ***{card?.card?.last4}
                                </div>
                                <div 
                                    className="mx-2 dark:text-red-600 text-gray-600 text-red-600 text-sm cursor-pointer items-right"
                                    onClick={() => {
                                        setCurrentCard(card)
                                        setIsModelOpen(true)
                                    }}
                                >
                                    {/* Delete */}
                                    <svg fill="#FF0000" version="1.1" id="Capa_1" viewBox="0 0 482.428 482.429" className="w-5 h-5">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier"> <g> <g> 
                                            <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path> 
                                            <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path> 
                                            <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path> 
                                            <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"></path> 
                                        </g> </g> </g></svg>
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
                            className={`flex justify-end                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 mt-4 text-white text-sm  p-2 px-4  font-bold rounded-lg border dark:border-gray-600 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700
                                ${paymentCard ? "bg-gray-800 cursor-pointer" : "bg-gray-600"} 
                                rounded-lg`}
                            disabled={!paymentCard}
                        >
                            Pay Now
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-md text-semibold dark:text-white text-gray-700">
                            PLEASE ADD CARD FIRST.
                        </div>
                    </>
                )}
            </div> 
            {isModelOpen && (
                <>
                    <ModelDialog
                        isModelOpen={isModelOpen}
                        setIsModelOpen={setIsModelOpen}
                        dialogTitle="Delete Card"
                        dialogMessage="Are you sure you want to delete this card from your account. ?"
                        onConfirm={() => {
                            setPaymentCard(null);
                            onDeleteCardHandler();
                            setIsModelOpen(false)
                        }}
                    />
                </>
            )}
        </>
    )
}

export default StripeForm