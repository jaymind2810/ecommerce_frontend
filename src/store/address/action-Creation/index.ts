import { ActionType } from "../action-Types";
import { AddressFormType } from "../reducer/reducer";


// ====== Address Functionality ============

export const setUserAllAddress = (address: AddressFormType) => {
  return {
    type: ActionType.SET_USER_All_ADDRESS,
    payload: address,
  };
};

export const addNewAddress = (address: AddressFormType) => {
  return {
    type: ActionType.ADD_NEW_ADDRESS,
    payload: address,
  };
};

export const updateAddress = (address: AddressFormType) => {
  return {
    type: ActionType.UPDATE_ADDRESS,
    payload: address,
  };
};

export const deleteAddress = (address: AddressFormType) => {
  return {
    type: ActionType.DELETE_ADDRESS,
    payload: address,
  };
};

export const clearAddress = () => {
  return {
    type: ActionType.CLEAR_ADDRESS,
    // payload: address,
  };
};
