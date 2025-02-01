import { AddressFormType } from "../../address/reducer/reducer";
import { ActionType } from "../action-Types";
import { OrdersType } from "../reducer/reducer";

export const setOrderAddressData = (address: AddressFormType) => {
  return {
    type: ActionType.SET_ORDER_ADDRESS,
    payload: address,
  };
};
export const removeOrderAddress = () => {
  return {
    type: ActionType.REMOVE_ORDER_ADDRESS,
  };
};

export const setOrderAmout = (amount: number) => {
  return {
    type: ActionType.SET_ORDER_AMOUNT,
    payload: amount,
  };
};

export const setUserAllOrders = (orders: OrdersType[]) => {
  return {
    type: ActionType.SET_USER_ALL_ORDERS,
    payload: orders,
  };
};

export const addNewUserOrders = (orders: OrdersType) => {
  return {
    type: ActionType.ADD_NEW_USER_ORDERS,
    payload: orders,
  };
};

export const clearUserAllOrders = () => {
  return {
    type: ActionType.CLEAR_USER_ALL_ORDERS,
  };
};