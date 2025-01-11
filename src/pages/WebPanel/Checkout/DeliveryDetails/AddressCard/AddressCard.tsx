import React from "react";
import { deleteUserAddress } from "../../../../../requests/WebPanel/CheckoutRequests";
import { loaderActionEnd, loaderActionStart } from "../../../../../store/loader/actions-creations";
import { successToast, warningToast } from "../../../../../store/toast/actions-creation";
import { useDispatch } from "react-redux";
import { AddressFormType } from "../../../../../store/address/reducer/reducer";
import { deleteAddress } from "../../../../../store/address/action-Creation";

interface AddressCardProps {
    address: AddressFormType;
    setIntialValue: (value: AddressFormType) => void;
    setAddNewAddress: (flag: boolean) => void;
    setCurrentSelectedAdd?: ((value: number) => void) | any;
    currentSelectedAdd?: number | any;
}

const AddressCard:React.FC<AddressCardProps> = ({
    address,
    setIntialValue,
    setAddNewAddress,
    setCurrentSelectedAdd,
    currentSelectedAdd
}) => {

    const dispatch = useDispatch();

    const handleDeleteAddress = (address: AddressFormType) =>{
        try {
            dispatch(loaderActionStart())
            deleteUserAddress(address?.id)
            .then((res) => {
                if (res.data.status === 204) {
                    dispatch(
                        successToast({
                        toast: true,
                        message: "Address deleted Successfully...!!",
                        })
                    );
                    dispatch(deleteAddress(address));
                } else {
                    dispatch(
                        warningToast({
                        toast: true,
                        message: "Something Went Wrong",
                        })
                    );
                }
            })
            dispatch(loaderActionEnd())
        } catch(error) {
            console.log(error)
            dispatch(loaderActionEnd())
        } finally {
            dispatch(loaderActionEnd())
        }
        
    }

    const handleOnClick = (address: AddressFormType) => {
        address && setCurrentSelectedAdd(address?.id)
    }

    return (
        address && (
            <>
                <div 
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                    onClick={() => handleOnClick(address)}
                >
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" 
                                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" 
                                checked={currentSelectedAdd && address?.id == currentSelectedAdd ? true : false}
                            />
                        </div>

                        <div className="ms-4 text-sm">
                            <label className="font-medium leading-none text-gray-700 dark:text-white"> {address?.name} </label>
                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">{address?.email},{address?.phone_number}</p>
                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">{address?.street},</p>
                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">{address?.city}-{address?.postal_code},</p>
                            <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">{address?.state},{address?.country}.</p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <button 
                            type="button" 
                            className="text-sm font-medium text-red-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                            onClick={() => handleDeleteAddress(address)}    
                        >Delete</button>

                        <div className="h-3 w-px shrink-0 bg-gray-500 dark:bg-gray-700"></div>

                        <button 
                            type="button" 
                            className="text-sm font-medium text-indigo-700 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                            onClick={() => {
                                setIntialValue(address)
                                setAddNewAddress(true)
                            }}
                        >Edit</button>
                    </div>
                </div>
            </>
        )
    )
}

export default AddressCard