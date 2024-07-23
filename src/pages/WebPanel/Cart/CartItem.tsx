import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store";
import { removeItemsFromCart, updateCartItemsDetails } from "../../../requests/WebPanel/CartRequests";
import { ActionType } from "../../../store/cart/action-Types";

import { CartItem as CartItemType } from "../../../store/cart/reducer/reducer";

interface CartItemProps {
    item:CartItemType;
}


const CartItem: React.FC<CartItemProps> = ({
    item
}) => {


    const user = useSelector((state: State) => state.user)
    const cart = useSelector((state: State) => state.cart)
    const dispatch = useDispatch()

    const incrementQuantity = () => {
        updateCartItemsDetails({
            user_id: user?.id,
            id: item.id,
            quantity: item.quantity + 1
        }).then((res) => {
            dispatch({ type: ActionType.UPDATE_QUANTITY, payload: res.data })
        })
    };


    const decrementQuantity = () => {
        updateCartItemsDetails({
            user_id: user?.id,
            id: item.id,
            quantity: item.quantity - 1
        }).then((res) => {
            dispatch({ type: ActionType.UPDATE_QUANTITY, payload: res.data })
        })
    };


    const removeFromCart = (item: CartItemType) => {
        removeItemsFromCart({
            user_id: user?.id,
            id: item.id,
            quantity: item.quantity - 1
        }).then((res) => {
            if (res.status === 204) {
                dispatch({ type: ActionType.REMOVE_FROM_CART, payload: item });
            }
        })
    };



    return (
        <>
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 mb-4">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" className="shrink-0 md:order-1">
                    <img className="h-20 w-20 dark:hidden"  src={process.env.REACT_APP_API_URL + item?.product?.product_photo} alt="imac image" />
                    <img className="hidden h-20 w-20 dark:block" src={process.env.REACT_APP_API_URL + item?.product?.product_photo} alt="imac image" />
                  </a>

                  <label className="sr-only">Choose quantity:</label>
                  <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center">
                      <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" 
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          onClick={decrementQuantity}>
                        <svg className="h-2.5 w-2.5 text-gray-700  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-700  focus:outline-none focus:ring-0 dark:text-white">
                        {item?.quantity}
                      </p>
                      <button type="button" id="increment-button" data-input-counter-increment="counter-input" 
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          onClick={incrementQuantity}>
                        <svg className="h-2.5 w-2.5 text-gray-700  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-indigo-600 dark:text-white">$ {item?.product?.unit_price * item.quantity}</p>
                    </div>
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                    <a href="#" className="text-sm font-medium text-gray-700  hover:underline dark:text-white">{item?.product?.name}, {item?.product?.short_text}</a>
                    <div className="text-sm font-medium text-indigo-600  hover:underline dark:text-white">$ {item?.product?.unit_price}</div>

                    <div className="flex items-center gap-4">
                      <button type="button" className="border border-gray-400 dark:hover:text-white dark:text-gray-400 font-medium bg-gray-100 hover:bg-gray-200 hover:text-gray-700 inline-flex items-center px-1 py-1 rounded-lg text-gray-500 text-sm">
                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                        </svg>
                        Add to Favorites
                      </button>

                      <button type="button" 
                            className="bg-gray-100 border border-gray-400 dark:text-red-500 font-medium hover:bg-gray-200 inline-flex items-center px-2 py-1 rounded-lg text-red-600 text-sm"
                            onClick={() => removeFromCart(item)}>
                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default CartItem