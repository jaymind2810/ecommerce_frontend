import { ActionType } from "../action-Types/index";
import { CartItem } from "../reducer/reducer";

interface SetCartDataAction {
  type: ActionType.SET_CART;
  payload: CartItem[];
}

interface AddToCartAction {
  type: ActionType.ADD_TO_CART;
  payload: CartItem;
}

interface UpdateQuantityAction {
  type: ActionType.UPDATE_QUANTITY;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: ActionType.REMOVE_FROM_CART;
  payload: CartItem;
}

interface ClearCartAction {
  type: ActionType.CLEAR_CART;
}

export type Action =
  | SetCartDataAction
  | AddToCartAction
  | UpdateQuantityAction
  | RemoveFromCartAction
  | ClearCartAction