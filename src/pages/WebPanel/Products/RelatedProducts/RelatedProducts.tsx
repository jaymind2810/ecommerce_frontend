import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProductsDataType } from "../../Type/ProductTypes";
import { getRelatedProducts } from "../../../../requests/WebPanel/ProductsRequests";
import { useDispatch } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../../store/loader/actions-creations";
import AddToCartButton from "../AddToCart/AddToCart";

interface RelatedProductsTypeProps {
  product?: ProductsDataType | undefined;
}

const RelatedProducts: React.FC<RelatedProductsTypeProps> = ({ 
  product
}) => {
    const navigate = useNavigate()
    const [relatedProductsData, setRelatedProductsData] = useState<ProductsDataType[]>([]);

    const dispatch = useDispatch()

    useEffect(() => {
    const fetchRelatedProductsDatas = async () => {
        try {
            dispatch(loaderActionStart())
            const res = await getRelatedProducts();
            if (res.data.status === 200) {
                setRelatedProductsData(res.data.data);
            } else {
                console.error(`Unexpected response status: ${res.data.status}`);
            }
        } catch (error) {
            console.error("An error occurred while fetching related products:", error);
        } finally {
          dispatch(loaderActionEnd())
        }
    };
    fetchRelatedProductsDatas();
    }, []);

    return (
      <section className="py-8">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
              PEOPLE ALSO BUY
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProductsData && relatedProductsData?.map((product:ProductsDataType, index: number) => (
                <div key={index} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 cursor-pointer">
                    <img
                     
                      src={process.env.REACT_APP_API_URL + product?.product_photo}
                     
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
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
          </div>
        </div>
    </section>
    )
}

export default RelatedProducts