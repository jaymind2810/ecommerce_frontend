import React, { useEffect, useState } from "react";
import CheckoutProgressBar from "../components/CheckoutProgressBar/CheckoutProgressBar";
import OrderSummarySideBar from "../components/OrderSummary/OrderSummary";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store";
import { OrdersType } from "../../../store/order/reducer/reducer";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";
import { getOrderData } from "../../../requests/WebPanel/OrderRequests";
import { errorToast } from "../../../store/toast/actions-creation";
import moment from "moment";
import { capitalize } from "lodash";


// interface OrderDetailProps {

// }


// const OrderDetail:React.FC<OrderDetailProps> = ({

// }) => {
const OrderDetail = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const user = useSelector((state: State) => state.user);
    const order = useSelector((state: State) => state.order);

    const [currentOrder, setCurrentOrder] = useState<OrdersType>()


    useEffect(() => {
        try {
            dispatch(loaderActionStart())
            if (params.orderID && user) {
                const order_id = params.orderID
                getOrderData({
                    // user_id : user ? user.id : 0,
                    order_id : order_id,
                }).then((res) => {
                    if (res.data.success == true) {
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
    //     if (order.user_orders.length >= 1 && params.orderID) {
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
                                            {/* <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{currentOrder?.created_at}</dd> */}
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{moment(new Date(currentOrder.created_at)).format("Do MMMM YYYY, h:mm A")}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Payment Method</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{capitalize(currentOrder?.payment_method)}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Name</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{capitalize(currentOrder?.status)}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Address</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{currentOrder?.address?.street}, {currentOrder?.address?.city}, {currentOrder?.address?.state}, {currentOrder?.address?.country}, {currentOrder?.address?.postal_code}</dd>
                                        </dl>
                                        <dl className="sm:flex items-center justify-between gap-4">
                                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Phone</dt>
                                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">+{currentOrder?.address?.phone_number}</dd>
                                        </dl>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <a 
                                            href="#" 
                                            className="py-2 px-5 rounded-md flex items-center bg-gray-300 justify-center transition-all text-sm font-medium text-gray-800 duration-500 hover:bg-indigo-100">
                                                Track your order
                                        </a>
                                        <a  
                                            className="py-2 px-5 bg-gray-800 flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700"
                                            onClick={() => navigate("/products")}
                                        >
                                            Return to shopping
                                        </a>
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