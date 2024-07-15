import { ActionType } from "../action-Types";
import { CartState } from "../reducer/reducer";

export const setCartData = (cart: CartState) => {
  return {
    type: ActionType.SET_CART,
    payload: cart,
  };
};

export const addToCart = (cart: CartState) => {
  return {
    type: ActionType.ADD_TO_CART,
    payload: cart,
  };
};

export const updateQuantity = (cart: CartState) => {
  return {
    type: ActionType.UPDATE_QUANTITY,
    payload: cart,
  };
};

export const removeFromCart = (cart: CartState) => {
  return {
    type: ActionType.REMOVE_FROM_CART,
    payload: cart,
  };
};

export const clearCart = () => {
  return {
    type: ActionType.CLEAR_CART,
  };
};
