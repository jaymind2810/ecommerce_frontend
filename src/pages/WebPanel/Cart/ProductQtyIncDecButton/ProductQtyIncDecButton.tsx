import React from "react";
import { CartItem } from "../../../../store/cart/reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../../store/loader/actions-creations";
import { updateCartItemsDetails } from "../../../../requests/WebPanel/CartRequests";
import { updateQuantity } from "../../../../store/cart/action-Creation";
import { State } from "../../../../store";

interface ProductQtyIncDecButtonProps {
    item: CartItem;
}


const ProductQtyIncDecButton:React.FC<ProductQtyIncDecButtonProps> = ({
    item
}) => {

    const user = useSelector((state: State) => state.user)
    const dispatch = useDispatch()

    const incrementQuantity = () => {
        try {
            dispatch(loaderActionStart())
            updateCartItemsDetails({
                user_id: user?.id,
                id: item.id,
                quantity: item.quantity + 1
            }).then((res) => {
                if (res.data.status === 200) {
                    dispatch(updateQuantity(res.data.data))
                }
            })
        } catch(error) {
            console.log(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
        
    };


    const decrementQuantity = () => {
        try {
            dispatch(loaderActionStart())
            if (item.quantity > 1) {
                updateCartItemsDetails({
                    user_id: user?.id,
                    id: item.id,
                    quantity: item.quantity - 1
                }).then((res) => {
                    if (res.data.status === 200) {
                        dispatch(updateQuantity(res.data.data))
                    }
                })
            }
        } catch(error) {
            console.log(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
        
    };

    return (
        <>
            <div className="flex items-center w-full mx-auto justify-center">
                    <button
                        className="group rounded-md border border-gray-200 flex bg-gray-100 hover:bg-gray-200 items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        onClick={decrementQuantity}>
                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                            fill="none">
                            <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                        </svg>
                    </button>
                    <p className="px-2 w-10 font-semibold text-gray-700 text-md lg:max-w-[50px] border-gray-400 bg-transparent placeholder:text-gray-700  text-center focus-within:bg-gray-50 outline-0">
                        {item?.quantity}
                    </p>
                    <button
                        className="group rounded-md border border-gray-200 flex bg-gray-100 hover:bg-gray-200 items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        onClick={incrementQuantity}>
                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                            fill="none">
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                strokeLinecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
        </>
    )
}

export default ProductQtyIncDecButton