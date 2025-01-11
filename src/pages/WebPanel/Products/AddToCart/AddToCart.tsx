import React from 'react';
import { ProductsDataType } from '../../Type/ProductTypes';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItems } from '../../../../requests/WebPanel/CartRequests';
import { State } from '../../../../store';
import { successToast, errorToast } from '../../../../store/toast/actions-creation';
import { ActionType } from '../../../../store/cart/action-Types';
import { addToCart } from '../../../../store/cart/action-Creation';
import { loaderActionEnd, loaderActionStart } from '../../../../store/loader/actions-creations';

interface AddToCartButtonProps {
  currentProduct: ProductsDataType | any;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ currentProduct }) => {
  const user = useSelector((state: State) => state.user)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    try {
        dispatch(loaderActionStart())
        addCartItems({
            user: user?.id,
            product: currentProduct.id,
            quantity: 1
        }).then((res) => {
          console.log(res, "------res-------------")
          if (res.data.success === true) {
            // dispatch({ type: ActionType.ADD_TO_CART, payload: res.data.data })
            dispatch(addToCart(res.data.data))
            dispatch(
              successToast({
              toast: true,
              message: "Item Added to Cart..!!",
              })
          );
          } else if (res.data.data.non_field_errors[0] === "The fields product, user must make a unique set.") {
            dispatch(
              successToast({
              toast: true,
              message: "Item already Added to Cart..!!",
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
    
    <button
      className="group py-2 border border-gray-400 rounded-md bg-gray-100 text-gray-600 font-semibold text-lg w-56 flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-200 hover:shadow-indigo-200"
      onClick={handleAddToCart}>
      <svg className="stroke-indigo-600 transition-all duration-500" width="22" height="22"
          viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
              stroke="#4b5563" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      Add to cart</button>
  );
};

export default AddToCartButton;