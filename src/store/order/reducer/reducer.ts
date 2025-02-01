import { Action } from "../action/action";
import { ActionType } from "../action-Types/index";
import { AddressFormType } from "../../address/reducer/reducer";


export interface OrdersType {
  id: number | any,
  customer?: any,
  status?: string
  address?: AddressFormType;
  payment_method?: string;
  payment_confirmed?: bigint;
  amount_pay?: number;
  updated_at?: any;
  created_at?: any;
  items?: any;
}


export interface OrderState {
    order_address: AddressFormType;
    amount: number;
    user_orders : OrdersType[]
}

export const initialOrderState: OrderState = {
  order_address: {},
  amount: 0,
  user_orders: []
};

const orderReducer = (state:OrderState = initialOrderState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_ORDER_ADDRESS:
      return { 
        ...state, 
        order_address: action.payload 
      };
    case ActionType.REMOVE_ORDER_ADDRESS:
      return { 
        ...state, 
        order_address: initialOrderState.order_address 
      };
    case ActionType.SET_ORDER_AMOUNT:
      return { 
        ...state, 
        amount: action.payload 
      };
    case ActionType.SET_USER_ALL_ORDERS:
      return {
        ...state,
        user_orders: action.payload
      };
    case ActionType.ADD_NEW_USER_ORDERS:
      return {
        ...state,
        user_orders: [...state.user_orders, action.payload]
      };
    case ActionType.CLEAR_USER_ALL_ORDERS:
      return { 
        ...state, 
        user_orders: [] 
      };
    default:
      return state;
  }
};

export default orderReducer


