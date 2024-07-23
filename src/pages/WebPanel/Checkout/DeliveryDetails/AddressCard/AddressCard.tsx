import React from "react";

interface AddressCardProps {
    address: any
}


const AddressCard:React.FC<AddressCardProps> = ({
    address,
}) => {
    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
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
                <button type="button" className="text-sm font-medium text-red-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Delete</button>

                <div className="h-3 w-px shrink-0 bg-gray-500 dark:bg-gray-700"></div>

                <button type="button" className="text-sm font-medium text-indigo-700 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Edit</button>
            </div>
        </div>
    )
}

export default AddressCard