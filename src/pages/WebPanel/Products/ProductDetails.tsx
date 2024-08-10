import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router";
import CustomerReview from "./CustomerReview/CustomerReview";
import TrendingProducts from "./TrendingProducts/TrendingProducts";
import { getProductDetail, getAllProducts } from "../../../requests/WebPanel/ProductsRequests";
import { ProductsDataType, ProductImagesType } from "../Type/ProductTypes";
import AddToCartButton from "./AddToCart/AddToCart";

interface ProductDetailProps {
    currentProduct: any,
    setCurrentProduct: boolean
}


const ProductDetail = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [productQuantity, setProductQuantity] = useState(1);
    const [currentProduct, setCurrentProduct] = useState<ProductsDataType>();

    const handleOnBuyNow = () => {
        navigate('/product/checkout')
    }

    useEffect(()=> {
        getProductDetail({
            'product_id' : params.productID
        }).then((res)=> {
            if (res.data.status === "success") {
                setCurrentProduct(res.data.data)
            }
        })
    }, [params.productID])


    return (
        <>

    <section className="py-10 ">
        <nav className="flex mx-auto max-w-7xl px-4 p-2" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    {/* <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg> */}
                    Home
                </a>
                </li>
                <li>
                <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <a href="#" className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
                </div>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ms-1 text-md font-medium text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
                </div>
                </li>
            </ol>
        </nav>


        <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="">
                    {/* <div style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" */}
                    <div 
                        className="swiper product-prev mb-6">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                            { currentProduct && 
                                <img src={process.env.REACT_APP_API_URL + currentProduct?.product_photo}
                                    alt={currentProduct?.name} className="mx-auto"/>
                            }
                            </div>
                            {/* <div className="swiper-slide">
                                <img src="https://pagedone.io/asset/uploads/1711514857.png"
                                    alt="Yellow Travel Bag image" className="mx-auto"/>
                            </div> */}
                        </div>

                    </div>
                    <div className="swiper product-thumb max-w-[608px] mx-auto">
                        <div className="flex swiper-wrapper">
                            {currentProduct && currentProduct?.product_images && currentProduct?.product_images.map((product_image: ProductImagesType) => (
                                <div className="swiper-slide m-2" key={product_image?.id}>
                                    <img src={process.env.REACT_APP_API_URL + product_image?.image} alt=""
                                        className=" w-24 h-24 cursor-pointer border-2 border-gray-50 transition-all duration-500 hover:border-indigo-600 slide:border-indigo-600"/>
                                </div>        
                            ))}
                            
                        </div>
                    </div>
                </div>
                <div className="pro-detail w-full flex flex-col order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
                    {/* <p className="font-medium text-lg text-indigo-600 mb-4">Travel &nbsp; / &nbsp; Menswear</p> */}
                    <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-700 ">{currentProduct?.name}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                        <h6
                            className="font-manrope font-semibold text-2xl leading-9 text-gray-700  pr-5 sm:border-r border-gray-200 mr-5">
                            $ {currentProduct?.unit_price}</h6>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_12029_1640)">
                                        <path
                                            d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                            fill="#FBBF24" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_12029_1640">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_12029_1640)">
                                        <path
                                            d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                            fill="#FBBF24" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_12029_1640">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_12029_1640)">
                                        <path
                                            d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                            fill="#FBBF24" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_12029_1640">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_12029_1640)">
                                        <path
                                            d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                            fill="#FBBF24" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_12029_1640">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_8480_66029)">
                                        <path
                                            d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                            fill="#F3F4F6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8480_66029">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                            <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">1624 review</span>
                        </div>

                    </div>
                    <p className="text-gray-500 text-base font-normal mb-8 ">
                        {currentProduct?.short_text}
                    </p>
                    <div className="block w-full">
                        <p className="font-medium text-lg leading-8 text-gray-700  mb-4">Bag Color</p>
                        <div className="text">
                            <div className="flex items-center justify-start gap-3 md:gap-6 relative mb-6 ">
                                <button data-ui=" active"
                                    className="p-2.5 border border-gray-200 rounded-full transition-all duration-300 hover:border-emerald-500 :border-emerald-500">
                                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="#10B981" />
                                    </svg>
                                </button>
                                <button
                                    className="p-2.5 border border-gray-200 rounded-full transition-all duration-300 hover:border-amber-400 focus-within:border-amber-400">
                                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="#FBBF24" />
                                    </svg>

                                </button>
                                <button
                                    className="p-2.5 border border-gray-200 rounded-full transition-all duration-300 hover:border-red-500 focus-within:border-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 40 40"
                                        fill="none">
                                        <circle cx="20" cy="20" r="20" fill="#F43F5E" />
                                    </svg>
                                </button>
                                <button
                                    className="p-2.5 border border-gray-200 rounded-full  transition-all duration-300 hover:border-blue-400 focus-within:border-blue-400">
                                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="#2563EB" />
                                    </svg>
                                </button>

                            </div>
                            <div className="block w-full mb-6">
                                <p className="font-medium text-lg leading-8 text-gray-700  mb-4">Bag size</p>
                                <div className="grid grid-cols-2 min-[100px]:grid-cols-4 gap-3">
                                    <button
                                        className="border border-gray-200 text-gray-700 py-2 rounded-md px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">56
                                        cm (S)</button>
                                    <button
                                        className="border border-gray-200 text-gray-700 py-2 rounded-md px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">67
                                        cm (M)</button>
                                    <button
                                        className="border border-gray-200 text-gray-700 py-2 rounded-md px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">77
                                        cm (L)</button>
                                </div>
                            </div>
                            <div className="flex flex-row mb-8">
                                <div className="flex items-center mr-8">
                                    <button
                                        className="group p-1 border border-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
                                        onClick={
                                            () => setProductQuantity(productQuantity >= 2 ? productQuantity - 1 : 1)
                                        }>
                                        <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                                            width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                strokeLinecap="round" />
                                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                strokeLinecap="round" />
                                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                strokeLinecap="round" />
                                        </svg>
                                    </button>
                                    <p className="px-2 w-10 font-semibold text-gray-700  text-lg lg:max-w-[50px] border-gray-400 bg-transparent placeholder:text-gray-700  text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0">
                                        {productQuantity}
                                    </p>
                                    <button
                                        className="group p-1 border border-gray-400 rounded-md bg-gray-100 hover:bg-gray-200 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                                        <svg 
                                            className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                                            width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={
                                                () => setProductQuantity(productQuantity + 1)
                                            }
                                            >
                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                strokeLinecap="round" />
                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                strokeWidth="1.6" strokeLinecap="round" />
                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                                <AddToCartButton currentProduct={currentProduct}/>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    className="text-center w-56 px-5 py-2.5 rounded-md bg-gray-800 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-800 hover:shadow-indigo-400"
                                    onClick={handleOnBuyNow}
                                    >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    </section>
    <CustomerReview />
    <TrendingProducts/>

{/* <script>
        var swiper = new Swiper(".product-thumb", {
            loop: true,
            spaceBetween: 12,
            slidesPerView: 4,
            
            freeMode: true,
            watchSlidesProgress: true,
           
        });
        var swiper2 = new Swiper(".product-prev", {
            loop: true,
            spaceBetween: 32,
            effect: "fade",
           
            thumbs: {
                swiper: swiper,
            },
            
        });
    </script> */}
                                            
        </>
    )
}

export default ProductDetail