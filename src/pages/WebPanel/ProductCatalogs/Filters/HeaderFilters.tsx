import React, { useState } from "react";
import { ProductsDataType } from "../../Type/ProductTypes";
import SearchBar from "./ProductSearch";
import { useDispatch } from "react-redux";


interface HeaderFiltersProps {
  // headerFilters: CategoryDataType[]
  // setCategoriesData: (value: CategoryDataType[]) => void;
  headerFilters: string
  setHeaderFilters: (value: string) => void;
  setCurrentPageData?: ((value: ProductsDataType[]) => void) | undefined | any;
  handleSearch?: any
}

const HeaderFilters: React.FC<HeaderFiltersProps> = ({
  // headerFilters,
  // setCategoriesData,
  headerFilters,
  setHeaderFilters,
  setCurrentPageData,
  handleSearch
}) => {

    const dispatch = useDispatch()
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    


    return (
        <>
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-4 pt-16">
              <h3 className="text-2xl font-semibold tracking-tight text-gray-700">
                PRODUCTS
              </h3>

              <div className="flex items-center">
                <div className="px-2">
                  <SearchBar 
                    onSearch={handleSearch}
                  />
                </div>
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      id="menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setIsOpenFilter(!isOpenFilter)}
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

                  {isOpenFilter && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div className="py-1" role="none">
                        <a
                          // href="#"
                          // className="block px-4 py-2 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                          className={`block px-4 py-2 text-sm ${headerFilters === 'Most Popular' ? 'font-medium text-gray-900 bg-gray-200' : 'text-gray-500'} text-gray-900 cursor-pointer hover:bg-gray-100`}
                          role="menuitem"
                          id="menu-item-0"
                          onClick={() => setHeaderFilters('Most Popular')}
                        >
                          Most Popular
                        </a>
                        <a
                          // href="#"
                          // className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100"
                          className={`block px-4 py-2 text-sm ${headerFilters === 'Best Rating' ? 'font-medium text-gray-900 bg-gray-200' : 'text-gray-500'} text-gray-900 cursor-pointer hover:bg-gray-100`}
                          role="menuitem"
                          id="menu-item-1"
                          onClick={() => setHeaderFilters('Best Rating')}
                        >
                          Best Rating
                        </a>
                        <a
                          // href="#"
                          // className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100"
                          className={`block px-4 py-2 text-sm ${headerFilters === 'Newest' ? 'font-medium text-gray-900 bg-gray-200' : 'text-gray-500'} text-gray-900 cursor-pointer hover:bg-gray-100`}

                          role="menuitem"
                          id="menu-item-2"
                          onClick={() => setHeaderFilters('Newest')}
                        >
                          Newest
                        </a>
                        <a
                          // href="#"
                          // className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100"
                          className={`block px-4 py-2 text-sm ${headerFilters === '-unit_price' ? 'font-medium text-gray-900 bg-gray-200' : 'text-gray-500'} text-gray-900 cursor-pointer hover:bg-gray-100`}

                          role="menuitem"
                          id="menu-item-3"
                          onClick={() => setHeaderFilters('-unit_price')}
                        >
                          Price: Low to High
                        </a>
                        <a
                          // href="#"
                          // className="block px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100"
                          className={`block px-4 py-2 text-sm ${headerFilters === 'unit_price' ? 'font-medium text-gray-900 bg-gray-200' : 'text-gray-500'} text-gray-900 cursor-pointer hover:bg-gray-100`}

                          role="menuitem"
                          id="menu-item-4"
                          onClick={() => setHeaderFilters('unit_price')}
                        >
                          Price: High to Low
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="hover:text-gray-500 p-2 text-gray-400"
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
                {/* <button
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
                </button> */}
              </div>
            </div>
        </>
    )
}

export default HeaderFilters