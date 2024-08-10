import { ActionType } from "../action-Types/index";
import { AddressFormType } from "../reducer/reducer";

// ======= Address Functionality =============

interface SetUserAllAddress {
  type: ActionType.SET_USER_All_ADDRESS
  payload: AddressFormType[]
}

interface AddNewAddress {
  type: ActionType.ADD_NEW_ADDRESS
  payload: AddressFormType
}

interface UpdateAddress {
  type: ActionType.UPDATE_ADDRESS
  payload: AddressFormType
}

interface DeleteAddress {
  type: ActionType.DELETE_ADDRESS
  payload: AddressFormType
}

export type Action =
  // ====== Address =============
  | SetUserAllAddress
  | AddNewAddress
  | UpdateAddress
  | DeleteAddress