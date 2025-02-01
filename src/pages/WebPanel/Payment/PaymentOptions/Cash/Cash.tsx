import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../../store";
import { CartItem } from "../../../../../store/cart/reducer/reducer";
import { createOrder } from "../../../../../requests/WebPanel/OrderRequests";
import { errorToast, successToast } from "../../../../../store/toast/actions-creation";
import { addNewUserOrders } from "../../../../../store/order/action-Creation";
import { OrdersType } from "../../../../../store/order/reducer/reducer";
import { useNavigate } from "react-router";


interface CashProps {
    amountToPay: number;
    cartItems: CartItem[];
}


const Cash:React.FC<CashProps> = ({
    amountToPay,
    cartItems
}) => {
    const user = useSelector((state: State) => state.user)
    const order = useSelector((state: State) => state.order)

    const [currentOrder, setCurrentOrder] = useState<OrdersType>()

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onConfirmOrder = () => {
        if (amountToPay && cartItems && order.order_address) {
            console.log("--------onConfirmPayment--------")
            createOrder({
                user: user ? user?.id : 0,
                order_items: cartItems,
                amount: amountToPay,
                address: order && order?.order_address,
                payment_method: "Cash"
            }).then((res) => {
                console.log(res, "-------res00---000--------")
                if (res?.data?.success === true) {
                    dispatch(addNewUserOrders(res?.data?.data))
                    setCurrentOrder(res?.data?.data)
                    navigate(`/order/${res?.data?.data?.id}`)
                    dispatch(
                    successToast({
                        toast: true,
                        message: "Ordered Successfully.",
                    })

                    );
                } else {
                    dispatch(
                    errorToast({
                    toast: true,
                    message: "Something went wrong..!!",
                    })
                    );
                }
            }
        )
        
        }
    } 


    return (
        <>
            <div className="p-4">
                <div className="text-md text-semibold dark:text-white text-gray-700 text-center">
                    You have to ready cash on your product delivery day.
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={(e) => {
                          // onAddCardHandler(e);
                          onConfirmOrder()
                        }}
                        title="Confirm Order."
                        className={`bg-gray-800 items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white border dark:border-gray-600 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700`}
                        // disabled={!cardInfo}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cash