import React from "react";


const Cash = () => {
    return (
        <>
            <div className="p-4">
                <div className="text-md text-semibold dark:text-white text-gray-700 text-center">
                    You have to ready cash on your product delivery day.
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={(e) => {
                            // onAddCardHandler(e);
                        }}
                        title="Confirm Order."
                        className={`bg-gray-800 items-center justify-center rounded-lg bg-primary-700 px-5 py-2 text-sm font-medium text-white border dark:border-gray-600 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-indigo-700`}
                        // disabled={!cardInfo}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cash