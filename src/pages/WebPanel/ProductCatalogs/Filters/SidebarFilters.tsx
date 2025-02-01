import React, { useState } from "react";
import { CategoryDataType } from "../../Type/ProductTypes";


interface SidebarFiltersProps{
    categoriesData: CategoryDataType[]
    // setCategoriesData: (value: CategoryDataType[]) => void;
    selectedCategories: string[]
    setSelectedCategories: (value: string[]) => void;
    setHeaderFilters: (value: string) => void;
}

const SidebarFilters:React.FC<SidebarFiltersProps> = ({
    categoriesData,
    // setCategoriesData,
    selectedCategories,
    setSelectedCategories,
    setHeaderFilters,
}) => {

    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const handleCheckboxChange = (category:string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((i:string) => i !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
      };


    return (
        <>
            <form className="hidden lg:block">
                <p className="font-medium text-gray-900 text-md text-sm">Categories</p>
                <ul
                role="list"
                className="space-y-3 border-b border-gray-200 pb-6 text-sm text-sm text-gray-600"
                >
                    <li className="my-3">
                        <a 
                            className="cursor-pointer"
                            onClick={() => setHeaderFilters('-unit_price')}
                            >Price : Low to High</a>
                    </li>
                    <li>
                        <a 
                            className="cursor-pointer"
                            onClick={() => setHeaderFilters('unit_price')}
                        >Price : High to Low</a>
                    </li>
                </ul>

                <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                        <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-1"
                        aria-expanded="false"
                        onClick={() => setIsOpenFilter(!isOpenFilter)}
                        >
                        <span className="font-medium text-gray-900">
                            Category
                        </span>
                        <span className="ml-6 flex items-center">
                            { !isOpenFilter && (
                                <svg
                                    className="size-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                    // onClick={() => setIsOpenFilter(true)}
                                >
                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                </svg>
                            )}
                            { isOpenFilter && (
                                <svg
                                    className="size-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                    // onClick={() => setIsOpenFilter(false)}
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            )}
                            
                        </span>
                        </button>
                    </h3>
                    <div className="" id="filter-section-1">
                        <div className="space-y-3">
                            {isOpenFilter && categoriesData && categoriesData.map((category, index) => {
                                return (
                                    <>
                                        <div className="flex gap-3 my-3">
                                            <div className="flex h-5 shrink-0 items-center">
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input
                                                    id="filter-category-2"
                                                    name="category[]"
                                                    value={category.name}
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(category.name)}
                                                    checked={selectedCategories.includes(category.name)}
                                                    className="cursor-pointer col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
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
                                                {category.name}
                                            </label>
                                        </div>
                                    </>
                                )
                            })}
                            
                        </div>
                    </div>
                </div>
                {/* <div className="border-b border-gray-200 py-6">
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
                </div> */}
            </form>
        </>
    )
}

export default SidebarFilters