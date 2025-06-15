import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ColumnName from "../components/PageComponent/Columns";
import { getAdminAllOrders } from "../../../requests/AdminPanel/AdminRequest";
import { OrdersType } from "../../../store/order/reducer/reducer";
import { useDispatch } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";


const ProductData = [
	{
		id: '1',
		product_id: '4324',
		customer_id: '23143',
		customer_name: 'Shirley A. Lape',
		order_date: '2022-05-17T03:24:00',
		order_total: '$435.50',
		current_order_status: 'PLACED',
		shipment_address: 'Cottage Grove, OR 97424'
	},
]


// const OrderClolumanData = [ 'Order ID', 'Product ID', 'Customer Name', 'Order Date', 'Order Total', 'Shipping Address']
const OrderClolumanData = [
	{
		name: 'Order ID'
	},
	{
		name: 'Customer Name'
	},
	{
		name: 'Order Date'
	},
	{
		name: 'Payment Method'
	},
	{
		name: 'Order Total'
	},
	{
		name: 'Shipping Address'
	},
	{
		name: 'Order Status'
	}
]

function Allorders() {

	const dispatch = useDispatch()

	const [ordersData, setOrdersData] = useState<OrdersType[]>([]);
	const [currentPageData, setCurrentPageData] = useState<OrdersType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [hasMore, setHasMore] = useState(false);

	const tableBodyAreaRef = useRef<HTMLElement | any>();
	

	const getAllAdminOrders = async (query:string) => {
		try {
			dispatch(loaderActionStart())
	
			const data:any = {
				'page' : currentPage,
				'page_size': 15,
				// 'categories': selectedCategories ? selectedCategories : [],
				// 'sort': headerFilters ? headerFilters : [],
				'q': query.trim()
			}
			const res = await getAdminAllOrders(data);
			if (res.data.success === true) {
				const { data, pagination } = res.data;
				setOrdersData((prevOrders) =>
					currentPage === 1 ? data : [...prevOrders, ...data]
				);
				// setCurrentPageData(data)
				pagination && pagination?.current_page && setCurrentPage(pagination.current_page);
				pagination && pagination?.has_more && setHasMore(pagination.has_more);
				pagination && pagination?.total_pages && setTotalPages(pagination.total_pages);
	
			} else {
			console.error(`Unexpected response status: ${res.data.status}`);
			}
		} catch (error) {
			console.error("An error occurred while fetching trending products:", error);
		} finally {
			dispatch(loaderActionEnd())
		}
	}

	useEffect(() => {
		const query = '' 
		getAllAdminOrders(query)

	}, [currentPage])

	const handleScroll = () => {
		const container = tableBodyAreaRef.current;
		if (!container || !hasMore) return;

		const scrollThreshold = 50; // px from bottom

		const isBottom = container.scrollHeight - container.scrollTop - container.clientHeight < scrollThreshold;

		if (isBottom && (Number(totalPages) >= Number(currentPage))) {
			setCurrentPage(prev => prev + 1); // trigger next fetch
		}
	};


	


    return (
        <>
            <div className="relative shadow-md sm:rounded-lg">
			<div className="p-4 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white text-gray-900">
				<div>
					<button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
						<span className="sr-only">Action button</span>
						Action
						<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
						</svg>
					</button>
					{/* <!-- Dropdown menu --> */}
					<div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-gray-700">
						<ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
							<li>
								<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
							</li>
							<li>
								<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
							</li>
							<li>
								<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
							</li>
						</ul>
						<div className="py-1">
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
						</div>
					</div>
				</div>
				<label className="sr-only">Search</label>
				<div className="relative">
					<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
						</svg>
					</div>
					<input type="text" id="table-search-users" className="block pt-2 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
				</div>
			</div>
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-800">
				<thead className="text-xs font-semibold text-gray-800 uppercase bg-gray-200">
					<tr>
					<th scope="col" className="p-4">	
						<div className="flex items-center">
						<input id="checkbox-all-search" type="checkbox" className="w-4 h-4" />
						</div>
					</th>
					{OrderClolumanData.map((colum) => (
						<ColumnName key={colum.name} props={colum} />
					))}
					</tr>
				</thead>

				{/* Scrollable tbody wrapper */}
				<tbody>
					<tr>
					<td colSpan={OrderClolumanData.length + 1} className="p-0">
						<div 
							className="max-h-[700px] overflow-y-auto block"
							onScroll={handleScroll}
							ref={tableBodyAreaRef}
						>
						<table className="w-full text-sm text-gray-600">
							<tbody>
							{ordersData && ordersData.map((order) => (
								<tr key={order?.id} className="bg-white border-b">
								<td className="w-4 p-4">
									<div className="flex items-center">
									<input type="checkbox" className="w-4 h-4" />
									</div>
								</td>
								<td className="px-6 py-4">
									<Link to={`/order/${order?.id}`}>#{order?.id}</Link>
								</td>
								<td className="px-6 py-4">
									<Link to={`/order/${order?.id}`}>
									{order?.customer?.first_name} {order?.customer?.last_name}
									</Link>
								</td>
								<td className="px-6 py-4">
									{format(new Date(order?.created_at), 'dd MMM yyyy')}
								</td>
								<td className="px-6 py-4">
									{order?.payment_method}
								</td>
								<td className="px-6 py-4">
									{order?.amount_pay}
								</td>
								<td className="px-6 py-4">
									{order?.address?.city}, {order?.address?.country}
								</td>
								<td className="px-6 py-4">
									{order?.status}
								</td>
								</tr>
							))}
							</tbody>
						</table>
						</div>
					</td>
					</tr>
				</tbody>
			</table>
		</div>

        </>
    )
}


export default Allorders