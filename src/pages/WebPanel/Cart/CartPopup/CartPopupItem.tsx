// src/CartItem.tsx
import React, { useContext, useState } from 'react';
import { CartItem as CartItemType } from '../../../../store/cart/reducer/reducer';
import { updateCartItemsDetails, removeItemsFromCart } from '../../../../requests/WebPanel/CartRequests';
import { useSelector, useDispatch } from 'react-redux';
import { ActionType } from '../../../../store/cart/action-Types';
import { State } from '../../../../store';
import { removeFromCart, updateQuantity } from '../../../../store/cart/action-Creation';
import Loader from '../../../../components/Loader';
import { loaderActionEnd, loaderActionStart } from '../../../../store/loader/actions-creations';
import ProductQtyIncDecButton from '../ProductQtyIncDecButton/ProductQtyIncDecButton';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

interface CartPopupItemProps {
    item: CartItemType;
}

const CartPopupItem: React.FC<CartPopupItemProps> = ({ item }) => {

    const user = useSelector((state: State) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removeProductFromCart = (item: CartItemType) => {
        try {
            dispatch(loaderActionStart())
            removeItemsFromCart({
                user_id: user?.id,
                id: item.id,
                quantity: item.quantity - 1
            }).then((res) => {
                if (res.data.status === 200) {
                    dispatch({ type: ActionType.REMOVE_FROM_CART, payload: item });
                    // dispatch(removeFromCart(item))
                }
            })
            dispatch(loaderActionEnd())
        } catch(error) {
            console.log(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
    };

    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-4">
            <div
                className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box">
                    <img 
                        src={process.env.REACT_APP_API_URL + item?.product?.product_photo} 
                        alt="perfume bottle image" 
                        className="xl:w-[140px]"
                        onClick={() => navigate(`/product-detail/${item?.product?.id}`)} 
                    />
                </div>
                <div className="pro-data w-full max-w-sm ">
                    <h5 className="font-semibold text-md leading-8 text-gray-700  max-[550px]:text-center">
                        {/* {item?.product?.name} */}
                        <Link to={`/product-detail/${item?.product?.id}`}>{item?.product?.name}</Link>
                    </h5>
                    <p
                        className="font-normal text-gray-500 max-[550px]:text-center">
                        {item?.product?.category}</p>
                    {/* <h6 className="font-medium leading-8 text-indigo-600 text-sm max-[550px]:text-center">$ {item?.product?.unit_price}</h6> */}
                    <h6 className="font-medium leading-8 text-indigo-600 text-sm max-[550px]:text-center">
                        <Link to={`/product-detail/${item?.product?.id}`}>$ {item?.product?.unit_price}</Link>
                    </h6>
                </div>
            </div>
            <div
                className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                <ProductQtyIncDecButton
                    item={item}
                />
                <h6
                    className="text-indigo-600 font-manrope font-bold text-md leading-9 w-full max-w-[176px] text-center"
                >
                    $ {item?.product?.unit_price * item.quantity}</h6>
                <div
                    className="text-indigo-600 font-manrope font-bold text-lg leading-9 px-4 text-center cursor-pointer"
                    onClick={() => removeProductFromCart(item)}
                >
                    <svg fill="#ff1919"
                        version="1.1" className="h-5 w-5" viewBox="0 0 482.43 482.43" stroke="#ff1919"
                        strokeWidth="0.00482428">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <g>
                            <g>
                                <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path>
                                <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path>
                                <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path>
                                <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z">
                                </path>
                            </g> </g> </g></svg>
                </div>
            </div>
        </div>
        </>
    );
};

export default CartPopupItem;
