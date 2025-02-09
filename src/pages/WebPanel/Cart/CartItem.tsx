import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store";
import { removeItemsFromCart, updateCartItemsDetails } from "../../../requests/WebPanel/CartRequests";
import { ActionType } from "../../../store/cart/action-Types";

import { CartItem as CartItemType } from "../../../store/cart/reducer/reducer";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";
import ProductQtyIncDecButton from "./ProductQtyIncDecButton/ProductQtyIncDecButton";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}


const CartItem: React.FC<CartItemProps> = ({
  item
}) => {

  const user = useSelector((state: State) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeProductFromCart = (item: CartItemType) => {
    try {
        dispatch(loaderActionStart())
        removeItemsFromCart({
          user_id: user?.id,
          id: item.id,
          quantity: item.quantity - 1
        }).then((res) => {
          if (res.data.status === 200) {
              dispatch({ type: ActionType.REMOVE_FROM_CART, payload: item });
              // dispatch(removeFromCart(res.data.data))
          }
        })
        dispatch(loaderActionEnd())
    } catch(error) {
        console.log(error)
        dispatch(loaderActionEnd())
    } finally {
        dispatch(loaderActionEnd())
    }
  };


  return (
    <>
      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 mb-4">
          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
            <a href="#" className="shrink-0 md:order-1">
              <img 
                className="h-20 w-20 dark:hidden" 
                src={process.env.REACT_APP_API_URL + item?.product?.product_photo} alt="imac image" 
                onClick={() => navigate(`/product-detail/${item?.product?.id}`)}
              />
              <img 
                className="hidden h-20 w-20 dark:block" 
                src={process.env.REACT_APP_API_URL + item?.product?.product_photo} alt="imac image" 
                onClick={() => navigate(`/product-detail/${item?.product?.id}`)}
              />
            </a>

            <label className="sr-only">Choose quantity:</label>
            <div className="flex items-center justify-between md:order-3 md:justify-end">
              <div className="flex items-center">
                <ProductQtyIncDecButton
                  item={item}
                />
              </div>
              <div className="text-end md:order-4 md:w-32">
                <p className="text-base font-bold text-indigo-600 dark:text-white">$ {item?.product?.unit_price * item.quantity}</p>
              </div>
            </div>

            <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
              <a href="#" className="text-sm font-medium text-gray-700  hover:underline dark:text-white">
                {/* {item?.product?.name}, {item?.product?.short_text} */}
                <Link to={`/product-detail/${item?.product?.id}`}>{item?.product?.name}, {item?.product?.short_text}</Link>
              </a>
              <div className="text-sm font-medium text-indigo-600  hover:underline dark:text-white">
                <Link to={`/product-detail/${item?.product?.id}`}>$ {item?.product?.unit_price}</Link>
              </div>

              <div className="flex items-center gap-4">
                <button type="button" className="border border-gray-400 dark:hover:text-white dark:text-gray-400 font-medium bg-gray-100 hover:bg-gray-200 hover:text-gray-700 inline-flex items-center px-1 py-1 rounded-lg text-gray-500 text-sm">
                  <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                  </svg>
                  Add to Favorites
                </button>

                <button type="button"
                  className="bg-gray-100 border border-gray-400 dark:text-red-500 font-medium hover:bg-gray-200 inline-flex items-center px-2 py-1 rounded-lg text-red-600 text-sm"
                  onClick={() => removeProductFromCart(item)}>
                  <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
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