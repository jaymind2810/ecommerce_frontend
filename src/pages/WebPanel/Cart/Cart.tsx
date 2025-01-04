import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CheckoutProgressBar from "../components/CheckoutProgressBar/CheckoutProgressBar";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store";
import { getCartItemsDetails } from "../../../requests/WebPanel/CartRequests";
import { ActionType } from "../../../store/cart/action-Types";
import OrderSummarySideBar from "../components/OrderSummary/OrderSummary";

interface CartProps {

}

const Cart: React.FC<CartProps> = ({

}) => {

  const navigate = useNavigate()
  const user = useSelector((state: State) => state.user)
  const cart = useSelector((state: State) => state.cart)
  const [subTotal, setSubTotal] = useState<any>()
  const [currentActive, setCurrentActive] = useState<any>('Cart')

  console.log(cart, "----------cart------------")

  const dispatch = useDispatch()

  useEffect(() => {
    user &&
      getCartItemsDetails({
        user_id: user.id
      }).then((res) => {
        if (res.data.status === 200) {
          dispatch({ type: ActionType.SET_CART, payload: res.data.data })
        }
      })
  }, []);

  const calculateSubtotal = (items: any) => {
    return items.reduce((total: any, item: any) => total + item?.product?.unit_price * item?.quantity, 0);
  };

  useEffect(() => {
    setSubTotal(calculateSubtotal(cart.cart))
  }, [cart])

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <CheckoutProgressBar />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 py-8">
        <h2 className="text-2xl font-semibold text-gray-700  dark:text-white sm:text-xl">SHOPPING CART</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cart?.cart?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}  
            {cart?.cart.length === 0 && (
              <>
                <p className="text-gray-700">Your Cart Is Empty.</p>
              </>
            )}
          </div>

          <OrderSummarySideBar/>
          
          {/* <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-700  dark:text-white">ORDER SUMMARY</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-indigo-600 dark:text-white">$ {(subTotal + 45).toFixed(2)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                    <dd className="text-base font-medium text-green-600">-$299.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-700  dark:text-white">$99</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-700  dark:text-white">$799</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-700  dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-indigo-600 dark:text-white">$ {(subTotal + 99 + 799 - 299).toFixed(2)}</dd>
                </dl>
              </div>

              <a href="#"
                className="rounded-lg w-full py-2 text-center text-sm justify-center items-center bg-gray-800 font-semibold text-white flex transition-all duration-500 hover:bg-indigo-700"
                onClick={
                  () => { navigate('/product/checkout') }
                }>Proceed to Checkout</a>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                  Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700  dark:text-white"> Do you have a voucher or gift card? </label>
                  <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700  focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                </div>
                <button type="submit" className="rounded-lg w-full py-2 text-sm text-center justify-center items-center bg-gray-800 font-semibold text-white flex transition-all duration-500 hover:bg-indigo-700">Apply Code</button>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Cart