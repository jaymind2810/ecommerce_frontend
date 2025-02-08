import React, { useEffect, useState } from "react";
import StatusTag from "../../../components/StatusTag/StatusTag";
import { useSelector } from "react-redux";
import { format } from 'date-fns'
import { State } from "../../../store";
import { OrdersType } from "../../../store/order/reducer/reducer";
import { useNavigate } from "react-router";


const UserOrders = () => {

    const navigate = useNavigate()

    const order = useSelector((state: State) => state.order)

    const [isLoading, setIsLoading] = useState<any>(false)
    const [oderDatas, setOrderDatas] = useState<OrdersType[]>([])

    console.log(oderDatas, "-------oderDatas--------")

    useEffect(() => {
        if (order?.user_orders) {
            console.log("-------Or")
            setOrderDatas(order?.user_orders)
        }
    }, [order])

    return (
        <>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-xl">MY ORDERS</h2>

                        <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                        <div>
                            <label className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                            <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                            <option selected>All orders</option>
                            <option value="pre-order">Pre-order</option>
                            <option value="transit">In transit</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>

                        <div>
                            <label className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
                            <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                            <option selected>this week</option>
                            <option value="this month">this month</option>
                            <option value="last 3 months">the last 3 months</option>
                            <option value="lats 6 months">the last 6 months</option>
                            <option value="this year">this year</option>
                            </select>
                        </div>
                        </div>
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="flex flex-wrap items-center gap-y-4 py-6">
                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                            </dl>

                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                            </dl>

                            <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center content-center  lg:justify-center gap-4">
                            <dt className="text-base text-center font-medium text-gray-500 dark:text-gray-400">Actions </dt>
                            </div>
                        </div>

                        {oderDatas && oderDatas.map((data, index) => {
                            return (
                                <>
                                <div className="flex flex-wrap items-center gap-y-4 py-6">
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dd className="dark:text-white font-semibold mt-1.5 text-gray-900 text-md">
                                        <a 
                                            className="hover:underline cursor-pointer"
                                            onClick={() => {navigate(`/order/${data['id']}`)}}
                                        >#{data?.id}</a>
                                    </dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dd className="dark:text-white font-semibold mt-1.5 text-gray-900 text-sm">{format(new Date(data.created_at), 'dd MMM yyyy')}</dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dd className="dark:text-white font-semibold mt-1.5 text-gray-900 text-sm">${data?.amount_pay}</dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dd>
                                        <StatusTag
                                            type={data?.status}
                                        />
                                    </dd>
                                    </dl>

                                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                        {data?.status === 'confirm' ? (
                                            <>
                                                <button type="button" className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto">Order again</button>
                                            </>
                                        ): data?.status === 'cancelled' ? (
                                            <>
                                            
                                            </>
                                        ): (
                                            <>
                                                <button type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>                                            
                                            </>
                                        )}
                                    <a 
                                        className="w-full inline-flex justify-center rounded-lg cursor-pointer border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                                        onClick={() => {navigate(`/order/${data['id']}`)}}
                                    >View details</a>
                                    </div>
                                </div>                                
                                </>
                            )
                        })}

                        </div>
                    </div>

                    {/* {currentPageData.length !== 0 && totalPages && (  
                      <Paginator 
                        currentPages={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                      />
                    )} */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserOrders