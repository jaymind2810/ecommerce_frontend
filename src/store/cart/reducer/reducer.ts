import { Action } from "../action/action";
import { ActionType } from "../action-Types/index";
// import { MapType } from "../../../pages/getabox/types/BoxSignupType";

// const CartContext = createContext();

// export interface CartItem {
//   id?: number;
//   product?: string;
//   quantity?: number;
// }

export interface CartItem {
  id?: any;
  product?: any;
  quantity?: any;
}

export interface CartState {
  cart: CartItem[];
}


export const initialCartState: CartState = {
  cart: [],
};

const cartReducer = (state:CartState = initialCartState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CART:
      return { 
        ...state, 
        cart: action.payload 
      };
    case ActionType.ADD_TO_CART:
      return { 
        ...state, 
        cart: [...state.cart, action.payload] 
      };
    case ActionType.UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        )
      };
    case ActionType.REMOVE_FROM_CART:
      return { 
        ...state, 
        cart: state.cart.filter(item => item.id !== action.payload.id) 
      };
    case ActionType.CLEAR_CART:
      return { 
        ...state, 
        cart: [] 
      };
    default:
      return state;
  }
};

export default cartReducer


