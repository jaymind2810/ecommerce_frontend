import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard/AddressCard";
import AddressForm from "./AddressForm/AddressForm";
import { getUserAllAddress } from "../../../../requests/WebPanel/CheckoutRequests";
import { State } from "../../../../store";
import { useSelector } from "react-redux";
import { UserAddressDataType } from "../../Type/CheckoutType";


const DeliveryDetails = () => {

    const user = useSelector((state: State) => state.user)

    const [userAllAddress, setUserAllAddress] = useState<UserAddressDataType[]>([]);
    const [addNewAddress, setAddNewAddress] = useState(false);

    useEffect(() => {
        getUserAllAddress({
            user_id :user?.id
        }).then((res) => {
            if (res.status == 200) {
                setUserAllAddress(res.data)
            }
        })
    }, [])


    return (
        <>
            <div className="space-y-4 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-white">SHIPPING ADDRESS</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                { userAllAddress && userAllAddress.map((address:UserAddressDataType) => {
                    return (
                            <AddressCard address={address}/>
                        )
                    })
                }
                
              </div>

              <div className="sm:col-span-2">
                 <button 
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    onClick={()=> setAddNewAddress(true)}
                >
                   <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                   </svg>
                   Add new address
                 </button>
               </div>
               {addNewAddress && <AddressForm/>}
            </div>
            
        </>
    )
}

export default DeliveryDetails