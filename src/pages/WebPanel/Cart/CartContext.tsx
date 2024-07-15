// src/CartContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { CartState, CartItem } from '../../../store/cart/reducer/reducer';
import { initialCartState } from '../../../store/cart/reducer/reducer';
import { ActionType } from '../../../store/cart/action-Types';
import cartReducer from '../../../store/cart/reducer/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../../store';



export interface CartContextProps {
    cart: CartState;
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (item: CartItem) => void;
    clearCart: () => void;
  }

export const CartContext = createContext<CartContextProps | undefined>(undefined);


export const CartProvider = ({ children }: { children: any }) => {

    const cart = useSelector((state: State) => state.cart);
    const dispatch = useDispatch();
  
    useEffect(() => {
      axios.get('/api/cart/')
        .then(response => {
          dispatch({ type: ActionType.SET_CART, payload: response.data });
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    }, []);
  
    const addToCart = (item: CartItem) => {
      axios.post('/api/cart/', item)
        .then(response => {
          dispatch({ type: ActionType.ADD_TO_CART, payload: response.data });
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
        });
    };
  
    const updateQuantity = (id: number, quantity: number) => {
      axios.patch(`/api/cart/${id}/`, { quantity })
        .then(response => {
          dispatch({ type: ActionType.UPDATE_QUANTITY, payload: response.data });
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
        });
    };
  
    const removeFromCart = (item: CartItem) => {
      axios.delete(`/api/cart/${item.id}/`)
        .then(() => {
          dispatch({ type: ActionType.REMOVE_FROM_CART, payload: item });
        })
        .catch(error => {
          console.error('Error removing from cart:', error);
        });
    };
  
    const clearCart = () => {
      axios.delete('/api/cart/clear/')
        .then(() => {
          dispatch({ type: ActionType.CLEAR_CART });
        })
        .catch(error => {
          console.error('Error clearing cart:', error);
        });
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
        {children}
      </CartContext.Provider>
    );
  };