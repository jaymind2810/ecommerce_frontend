import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CheckoutProgressBar from "../components/CheckoutProgressBar/CheckoutProgressBar";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../store";
import { getCartItemsDetails } from "../../../requests/WebPanel/CartRequests";
import { ActionType } from "../../../store/cart/action-Types";
import OrderSummarySideBar from "../components/OrderSummary/OrderSummary";
import Loader from "../../../components/Loader";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";

interface CartProps {

}

const Cart: React.FC<CartProps> = ({

}) => {

  const navigate = useNavigate()
  const user = useSelector((state: State) => state.user)
  const cart = useSelector((state: State) => state.cart)  
  const [subTotal, setSubTotal] = useState<any>()
  const [currentActive, setCurrentActive] = useState<any>('Cart')

  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(loaderActionStart())
      user &&
        getCartItemsDetails({
          user_id: user.id
        }).then((res) => {
          if (res.data.status === 200) {
            dispatch({ type: ActionType.SET_CART, payload: res.data.data })
          }
        })
      dispatch(loaderActionEnd())
    } catch(error) {
        console.log(error)
        dispatch(loaderActionEnd())
    } finally {
        dispatch(loaderActionEnd())
    }
    
  }, []);

  const calculateSubtotal = (items: any) => {
    return items.reduce((total: any, item: any) => total + item?.product?.unit_price * item?.quantity, 0);
  };

  useEffect(() => {
    setSubTotal(calculateSubtotal(cart.cart))
  }, [cart])

  return (
    <>
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
        </div>
      </div>
    </section>
    </>
  )
}

export default Cart