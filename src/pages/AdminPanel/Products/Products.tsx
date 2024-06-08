import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../requests/AdminRequest'
import { ProductsDataType } from '../type/products'
// import { getOrderStatus } from '../lib/helpers'

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
	{
		id: '7',
		product_id: '7453',
		customer_id: '96453',
		customer_name: 'Ryan Carroll',
		order_date: '2022-05-14T05:24:00',
		order_total: '$96.35',
		current_order_status: 'CONFIRMED',
		shipment_address: 'Los Angeles, CA 90017'
	},
	{
		id: '2',
		product_id: '5434',
		customer_id: '65345',
		customer_name: 'Mason Nash',
		order_date: '2022-05-17T07:14:00',
		order_total: '$836.44',
		current_order_status: 'SHIPPED',
		shipment_address: 'Westminster, CA 92683'
	},
]

const ProductColumnData = [
	{
		name: 'Product ID'
	},
	{
		name: 'Product'
	},
	{
		name: 'Amount'
	},
	{
		name: 'Created Date'
	},
	{
		name: 'Manufacturer Name'
	},
	{
		name: 'Product Stock'
	},
	{
		name: 'Publish Status'
	}
]

 
const AllProducts = () => {

	const [productsData, setProductsData] = useState<ProductsDataType[]>([]);
	
	useEffect(() => {
		getAllProducts().then((res) => {
			console.log(res, "-----------res-------")
			if (res.status === 200) {
				setProductsData(res.data.data)
			} 
		});
	}, [])

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<div className="p-4 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
				<div>
					<button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
						<span className="sr-only">Action button</span>
						Action
						<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
						</svg>
					</button>
					{/* <!-- Dropdown menu --> */}
					<div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
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
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
						</svg>
					</div>
					<input type="text" id="table-search-users" className="block pt-2 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
				</div>
			</div>
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="p-4">
							<div className="flex items-center">
								<input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
									<label className="sr-only">checkbox</label>
							</div>
						</th>
						{ProductColumnData.map((productColumn) => (
							<th scope="col" className="px-6 py-3" key={productColumn.name}>
								{productColumn.name}
							</th>
						))}
						{/* <th scope="col" className="px-6 py-3">
							Order Status
						</th> */}
					</tr>
				</thead>
				<tbody>
					{productsData.map((product) => (
					<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={product?.id}>
						<td className="w-4 p-4">
							<div className="flex items-center">
								<input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
									<label className="sr-only">checkbox</label>
							</div>
						</td>
						<td className="px-6 py-4">
							<Link to={`/product/${product.id}`}>#{product.id}</Link>
						</td>
						<th scope="row" className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white">
							<img 
								className="w-10 h-10 rounded-full" 
								src={`${
									process.env.REACT_APP_API_URL +
									product.product_photo
								}`} 
								alt="Product Image"/>
								<div className="ps-3">
									<div className="text-base font-semibold">{product.name}</div>
									<div className="font-normal text-gray-500">{product.short_text}</div>
								</div>
						</th>
						<td className="px-6 py-4">
							{product.amount}
						</td>
						<td className="px-6 py-4">
							{format(new Date(product.create_date), 'dd MMM yyyy')}
						</td>
						<td className="px-6 py-4">
							{product.manufacturer_name}
						</td>
						<td className="px-6 py-4">
							{product.product_stock}
						</td>
						<td className="px-6 py-4">
							{product.publish_status}
						</td>
						{/* <td className="px-6 py-4">
							{getOrderStatus(product.current_order_status)}
						</td> */}
						{/* <td className="px-6 py-4">
							<div className="flex items-center">
								<div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
							</div>
						</td>
						<td className="px-6 py-4">
							<a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
						</td> */}
					</tr>
					))}
				</tbody>
			</table>
		</div>

	)
}

export default AllProducts