import React, { useContext } from 'react';
import { CartContext } from '../../Cart/CartContext';
import { CartItem } from '../../../../store/cart/reducer/reducer';
import { useNavigate } from 'react-router';

interface AddToCartButtonProps {
  item: CartItem;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item }) => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate()

  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    
    <button
        className="group border border-gray-400 transition-all duration-500 p-2.5 mr-5 rounded-lg bg-gray-100 hover:bg-gray-200 hover:shadow-sm hover:shadow-indigo-300"
        onClick={handleAddToCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
            fill="none">
            <path
                d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                stroke="#4b5563" stroke-width="1.6" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </button>
  );
};

export default AddToCartButton;