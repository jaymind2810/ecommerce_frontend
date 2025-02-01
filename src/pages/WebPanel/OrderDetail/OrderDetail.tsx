import React, { useEffect, useState } from "react";
import CheckoutProgressBar from "../components/CheckoutProgressBar/CheckoutProgressBar";
import OrderSummarySideBar from "../components/OrderSummary/OrderSummary";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store";
import { OrdersType } from "../../../store/order/reducer/reducer";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";
import { getOrderData } from "../../../requests/WebPanel/OrderRequests";
import { errorToast } from "../../../store/toast/actions-creation";


// interface OrderDetailProps {

// }


// const OrderDetail:React.FC<OrderDetailProps> = ({

// }) => {
const OrderDetail = () => {
    const params = useParams()
    const dispatch = useDispatch();
    
    const user = useSelector((state: State) => state.user);

    console.log(user, "-----User00000000000000-----")
    const order = useSelector((state: State) => state.order);

    const [currentOrder, setCurrentOrder] = useState<OrdersType>()


    useEffect(() => {
        try {
            dispatch(loaderActionStart())
            console.log(params.orderID, "-------params.orderID--------")
            console.log(user.id, "-------params.user--------")
            if (params.orderID && user) {
                const order_id = params.orderID
                console.log(order_id, "-------order_id=-------")
                getOrderData({
                    user_id : user ? user.id : 0,
                    order_id : order_id,
                }).then((res) => {
                    console.log(res, "-------res=---")
                    if (res.data.status == true) {
                        setCurrentOrder(res.data.data)
                    } else {
                        errorToast({
                            toast: true,
                            message: res.data.message,
                        })
                    }
                })
            }
        } catch(error) {
            console.log(error)
        } finally {
            dispatch(loaderActionEnd())
        }
        
    }, [user])

    // useEffect(() => {
    //     console.log(params, "-----Prameter------", order)
    //     if (order.user_orders) {
    //         const current_order:any = order?.user_orders.filter((data) => {
    //             data.id == params.orderID
    //             console.log(data.id, "dsfsd")
    //         })
    //         console.log( order?.user_orders, "------current Ordes-------")
    //         setCurrentOrder(current_order)
    //     }
    // }, [order])

    return (
        <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <CheckoutProgressBar />
                {currentOrder ? (
                        <>
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 py-8">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">Thanks for your order!</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">Your order <a href="#" className="font-medium text-gray-900 dark:text-white hover:underline">#{currentOrder?.id}</a> will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
                            <div className="lg:flex lg:items-start md:gap-6 mt-6 sm:mt-8 xl:gap-8">
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-8">
                                    <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Date</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{currentOrder?.created_at}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Payment Method</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{currentOrder?.payment_method}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{currentOrder?.status}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Address</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{currentOrder?.address?.street}, {currentOrder?.address?.city}, {currentOrder?.address?.state}, {currentOrder?.address?.country}, {currentOrder?.address?.postal_code}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phone</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">+ {currentOrder?.address?.phone_number}</dd>
                                        </dl>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Track your order</a>
                                        <a href="#" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Return to shopping</a>
                                    </div>
                                </div>
                                <OrderSummarySideBar/>
                            </div>
                        </div>
                        </>
                    ) : (
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 py-8">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">Not found any order!</h4>
                        </div>
                    )
                }
            </section>
        </>
    )
}

export default OrderDetail