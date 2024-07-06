import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const RelatedProducts = () => {

    const navigate = useNavigate()

    const products = [
        {
          id: 1,
          name: "Earthen Bottle",
          href: "#",
          price: "$48",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
          imageAlt:
            "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
          color: "Black",
        },
        {
          id: 2,
          name: "Nomad Tumbler",
          href: "#",
          price: "$35",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
          imageAlt:
            "Olive drab green insulated bottle with flared screw lid and flat top.",
          color: "green",
        },
        {
          id: 3,
          name: "Focus Paper Refill",
          href: "#",
          price: "$89",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
          imageAlt:
            "Person using a pen to cross a task off a productivity paper card.",
          color: "Black",
        },
        {
          id: 4,
          name: "Machined Mechanical Pencil",
          href: "#",
          price: "$35",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
          imageAlt:
            "Hand holding black machined steel mechanical pencil with brass tip and top.",
          color: "Black",
        },
        // More products...
      ];

    return (
        <section className="py-8 pb-16">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-8 lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-left">
            Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      // src={product.imageSrc}
                      src={product.imageSrc}
                      // alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      onClick={() => navigate('/product-detail/')}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href="">
                          <span
                            aria-hidden="true"
                            className="inset-0"
                          />
                          <Link to={"/product-detail/"}>{product.name}</Link>
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        <Link to={"/product-detail/"}>{product.color}</Link>
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
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