import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryDataType, ProductsDataType } from "../Type/ProductTypes";
import { getAllCategoriesData, getAllProducts } from "../../../requests/WebPanel/ProductsRequests";
import { useDispatch } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";
import Paginator from "../components/Paginator/Paginator";
import MobileHeaderFilters from "./Filters/MobileHeaderFilters";
import HeaderFilters from "./Filters/HeaderFilters";
import SidebarFilters from "./Filters/SidebarFilters";
import AddToCartButton from "../Products/AddToCart/AddToCart";


const ProductsCatalogs = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<ProductsDataType[]>([]);
  const [currentPageData, setCurrentPageData] = useState<ProductsDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [categoriesData, setCategoriesData] = useState<CategoryDataType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  // const [filterData, setFiltersData] = useState<CategoryDataType[]>([]);
  const [headerFilters, setHeaderFilters] = useState<any>([]);

  const dispatch = useDispatch()


  const fetchAllCatalogPageData = async (query : any) => {
    try {
      dispatch(loaderActionStart())

      // if (!query.trim()) {
      //   // setCurrentPageData([]);
      //     return;
      // }

      const data = {
        'page' : currentPage,
        'page_size': 8,
        'categories': selectedCategories ? selectedCategories : [],
        'sort': headerFilters ? headerFilters : [],
        'q': query.trim()
      }
      const res = await getAllProducts(data);
      if (res.data.success === true) {
        const { data, pagination } = res.data;
        setProducts((prevProducts) =>
          currentPage === 1 ? data : [...prevProducts, ...data]
        );
        setCurrentPageData(data)
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
  };

  useEffect(() => {
    const query = '' 
    fetchAllCatalogPageData(query);
  }, [currentPage, selectedCategories, headerFilters]);


  const handleSearch = async (query: any) => {
    try {
        const data: any = {
          'q' : query,
        }
        fetchAllCatalogPageData(query);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const fetchAllCategoriesData = async () => {
        try {
            dispatch(loaderActionStart())
            const res = await getAllCategoriesData();
            if (res.data.success === true) {
                setCategoriesData(res.data.data)
            } else {
                console.error(`Unexpected response status: ${res.data.status}`);
            }
        } catch (error) {
        console.error("An error occurred while fetching Categories DATA:", error);
        } finally {
        dispatch(loaderActionEnd())
        }
    };
    fetchAllCategoriesData();
    }, []);


  return (
    <>
      <div className="bg-white">
        <div>
          <MobileHeaderFilters/>

          <main className="mx-auto max-w-7xl px-4 ">
            {/* ======== Headers Filters ==============  */}
            <HeaderFilters
              headerFilters={headerFilters}
              setHeaderFilters={setHeaderFilters}
              setCurrentPageData={setCurrentPageData}
              handleSearch={handleSearch}
            />

            <section aria-labelledby="products-heading" className="pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* ======== Category Filters ==============  */}
                <SidebarFilters
                  categoriesData={categoriesData}
                  // setCategoriesData={setCategoriesData}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  setHeaderFilters = {setHeaderFilters}
                />
                {/* ======== Products ================ */}
                <div className="lg:col-span-3">
                  <div>
                    <div className="grid grid-cols-1 grid-rows-2 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                      {currentPageData && currentPageData?.map((product:any, index: number) => (
                        <div key={index} className="group relative">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 cursor-pointer">
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
                                <Link to={`/product-detail/${product?.id}`}>$ {product?.unit_price}</Link>
                              </p>
                            </div>
                            <AddToCartButton
                              currentProduct={product}
                            />
                            {/* <p className="text-sm font-medium text-gray-900">
                              $ {product?.unit_price}
                            </p> */}
                          </div>
                        </div>
                      ))}
                    </div>
                    {currentPageData.length !== 0 && totalPages && (  
                      <Paginator 
                        currentPages={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                      />
                    )}
                  </div>
                  <div>
                    {currentPageData.length === 0 && (
                      <>
                        <div className="text-center text-gray-600 text-xl">
                          NO PRODUCTS FOUND
                        </div>
                      </>
                    )}
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
