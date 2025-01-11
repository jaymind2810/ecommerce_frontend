import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductsDataType } from "../Type/ProductTypes";
import { getAllProducts } from "../../../requests/WebPanel/ProductsRequests";
import { useDispatch } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";


const ProductsCatalogs = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<ProductsDataType[]>([]);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllCatalogPageData = async () => {
      try {
        dispatch(loaderActionStart())
        const res = await getAllProducts();
        if (res.data.status === 200) {
          console.log(res.data.data)
          setProducts(res.data.data);
        } else {
          console.error(`Unexpected response status: ${res.data.status}`);
        }
      } catch (error) {
        console.error("An error occurred while fetching trending products:", error);
      } finally {
        dispatch(loaderActionEnd())
      }
    };
    fetchAllCatalogPageData();
  }, []);


  return (
    <>
      <div className="bg-white">
        <div>
          <div
            className="relative z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black/25" aria-hidden="true"></div>

            <div className="fixed inset-0 z-40 flex">
              <div className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Totes
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Backpacks
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Travel Bags
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Hip Bags
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Laptop Sleeves
                      </a>
                    </li>
                  </ul>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Color</span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div className="pt-6" id="filter-section-mobile-0">
                      <div className="space-y-6">
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-color-0"
                                name="color[]"
                                value="white"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            White
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-color-1"
                                name="color[]"
                                value="beige"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Beige
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-color-2"
                                name="color[]"
                                value="blue"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Blue
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-color-3"
                                name="color[]"
                                value="brown"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Brown
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-color-4"
                                name="color[]"
                                value="green"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Green
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-color-5"
                                name="color[]"
                                value="purple"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Purple
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div className="pt-6" id="filter-section-mobile-1">
                      <div className="space-y-6">
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-category-0"
                                name="category[]"
                                value="new-arrivals"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            New Arrivals
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-category-1"
                                name="category[]"
                                value="sale"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Sale
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-category-2"
                                name="category[]"
                                value="travel"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Travel
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-category-3"
                                name="category[]"
                                value="organization"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Organization
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-category-4"
                                name="category[]"
                                value="accessories"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            Accessories
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-2"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Size</span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div className="pt-6" id="filter-section-mobile-2">
                      <div className="space-y-6">
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-size-0"
                                name="size[]"
                                value="2l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            2L
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-size-1"
                                name="size[]"
                                value="6l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            6L
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-size-2"
                                name="size[]"
                                value="12l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            12L
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-size-3"
                                name="size[]"
                                value="18l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            18L
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-size-4"
                                name="size[]"
                                value="20l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            20L
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-mobile-size-5"
                                name="size[]"
                                value="40l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="min-w-0 flex-1 text-gray-500">
                            40L
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <main className="mx-auto max-w-7xl px-4 ">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-16">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>

              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      id="menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      Sort
                      <svg
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm font-medium text-gray-900"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        Most Popular
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        id="menu-item-1"
                      >
                        Best Rating
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        id="menu-item-2"
                      >
                        Newest
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        id="menu-item-3"
                      >
                        Price: Low to High
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-500"
                        role="menuitem"
                        id="menu-item-4"
                      >
                        Price: High to Low
                      </a>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <svg
                    className="size-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <svg
                    className="size-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-slot="icon"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* ======== Category Filters ==============  */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    <li>
                      <a href="#">Totes</a>
                    </li>
                    <li>
                      <a href="#">Backpacks</a>
                    </li>
                    <li>
                      <a href="#">Travel Bags</a>
                    </li>
                    <li>
                      <a href="#">Hip Bags</a>
                    </li>
                    <li>
                      <a href="#">Laptop Sleeves</a>
                    </li>
                  </ul>

                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Color</span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div className="pt-6" id="filter-section-0">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-color-0"
                                name="color[]"
                                value="white"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">White</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-color-1"
                                name="color[]"
                                value="beige"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">Beige</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-color-2"
                                name="color[]"
                                value="blue"
                                type="checkbox"
                                checked
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">Blue</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-color-3"
                                name="color[]"
                                value="brown"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">Brown</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-color-4"
                                name="color[]"
                                value="green"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">Green</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-color-5"
                                name="color[]"
                                value="purple"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">
                            Purple
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div className="pt-6" id="filter-section-1">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-category-0"
                                name="category[]"
                                value="new-arrivals"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">
                            New Arrivals
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-category-1"
                                name="category[]"
                                value="sale"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">Sale</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-category-2"
                                name="category[]"
                                value="travel"
                                type="checkbox"
                                checked
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">
                            Travel
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-category-3"
                                name="category[]"
                                value="organization"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">
                            Organization
                          </label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-category-4"
                                name="category[]"
                                value="accessories"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">
                            Accessories
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-2"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Size</span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                          </svg>
                          <svg
                            className="size-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div className="pt-6" id="filter-section-2">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-size-0"
                                name="size[]"
                                value="2l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">2L</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-size-1"
                                name="size[]"
                                value="6l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">6L</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-size-2"
                                name="size[]"
                                value="12l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">12L</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-size-3"
                                name="size[]"
                                value="18l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">18L</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-size-4"
                                name="size[]"
                                value="20l"
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">20L</label>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                id="filter-size-5"
                                name="size[]"
                                value="40l"
                                type="checkbox"
                                checked
                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  className="opacity-0 group-has-[:checked]:opacity-100"
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  d="M3 7H11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                          <label className="text-sm text-gray-600">40L</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {/* ======== Products ================ */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 grid-rows-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products?.map((product:any, index: number) => (
                      <div key={index} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={process.env.REACT_APP_API_URL + product?.product_photo}                          
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full cursor-pointer"
                            onClick={() => navigate(`/product-detail/${product?.id}`)}
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              
                                <span
                                  aria-hidden="true"
                                  className="inset-0"
                                />
                                <Link to={`/product-detail/${product?.id}`}>{product?.name}</Link>
                              
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              <Link to={`/product-detail/${product?.id}`}>Blue</Link>
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            $ {product?.unit_price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="justify-self-center">
                    <nav className="py-6">
                      <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                          <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </section>
            
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductsCatalogs
