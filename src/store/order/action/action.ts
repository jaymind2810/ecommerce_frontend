import { AddressFormType } from "../../address/reducer/reducer";
import { ActionType } from "../action-Types/index";
import { OrdersType } from "../reducer/reducer";

interface SetOrderAddressDataAction {
  type: ActionType.SET_ORDER_ADDRESS;
  payload: AddressFormType;
}

interface RemoveOrderAddressAction {
  type: ActionType.REMOVE_ORDER_ADDRESS;
}

interface SetOrderAmountAction {
  type: ActionType.SET_ORDER_AMOUNT;
  payload: Number;
}

interface SetUserAllOrdersAction {
  type: ActionType.SET_USER_ALL_ORDERS;
  payload: OrdersType[];
}

interface AddNewUserOrdersAction {
  type: ActionType.ADD_NEW_USER_ORDERS;
  payload: OrdersType;
}

interface ClearUserAllOrdersAction {
  type: ActionType.CLEAR_USER_ALL_ORDERS;
}

export type Action =
  | SetOrderAddressDataAction
  | RemoveOrderAddressAction
  | SetOrderAmountAction
  | SetUserAllOrdersAction
  | AddNewUserOrdersAction
  | ClearUserAllOrdersAction