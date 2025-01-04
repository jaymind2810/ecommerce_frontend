import { Action } from "../action/action";
import { ActionType } from "../action-Types/index";

export interface AddressFormType {
  user_id?: number | any,
  id?: number | any,
  name?: string
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone_number?: string;
  email?: string;
} 

export interface AddressState {
  address_details: AddressFormType[];
}

export const initialAddressDataState: AddressState = {
  address_details: [],
};

const addressReducer = (state:AddressState = initialAddressDataState, action: Action) => {
  switch (action.type) {
    
    // ====== Address ========
    case ActionType.SET_USER_All_ADDRESS:
      return {
        ...state,
        address_details : action.payload,
      };
    case ActionType.ADD_NEW_ADDRESS:
      return {
        ...state,
        address_details: [...state.address_details, action.payload]
      };
    case ActionType.UPDATE_ADDRESS:
      return {
        ...state,
        ...action.payload,
        address_details: state.address_details.map(add => {
          return add.id === action.payload.id ? action.payload : add;
        }) 
      };
    case ActionType.DELETE_ADDRESS:
      return {
        ...state,
        ...action.payload,
        address_details: state.address_details.filter(add => add.id !== action.payload.id) 
      };

    default:
      return state;
  }
};

export default addressReducer


