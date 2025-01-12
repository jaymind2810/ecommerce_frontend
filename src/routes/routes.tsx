import React, { lazy } from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import ContactUs from "../pages/WebPanel/ContactUs/ContactUs";

// ============== For AdminPanel ==================
const Layout = lazy(() => import("../pages/AdminPanel/components/shared/Layout"));
const Dashboard = lazy(() => import("../pages/AdminPanel/Dashboard"));
const AllProducts = lazy(() => import("../pages/AdminPanel/Products/Products"));
const Allorders = lazy(() => import("../pages/AdminPanel/Orders/Orders"));
const AllUsers = lazy(() => import("../pages/AdminPanel/Users/Users"));

// ============== For Authentication ==================
const SignIn = lazy(() => import("../pages/Auth/Login"));
const SignUp = lazy(() => import("../pages/Auth/Register"));
const WebLayout = lazy(() => import("../pages/WebPanel/components/WebLayout"));

// ============== For WebSite ==================\
const Home = lazy(() => import("../pages/WebPanel/Home"));
const ProductDetail = lazy(() => import("../pages/WebPanel/Products/ProductDetails"));
const Checkout = lazy(() => import("../pages/WebPanel/Checkout/Checkout"));
const Cart = lazy(() => import("../pages/WebPanel/Cart/Cart"));

const Payment = lazy(() => import("../pages/WebPanel/Payment/Payment"));
const PaymentSuccess = lazy(() => import("../pages/WebPanel/Checkout/SuccessPayment"));
const PaymentFail = lazy(() => import("../pages/WebPanel/Checkout/FailPayment"));
const PageNotFound = lazy(() => import("../components/ErrorBoundary/PageNotFound"));
const ProductsCatalogs = lazy(() => import("../pages/WebPanel/ProductCatalogs/ProductsCatalogs"));


enum ErrorType {
    CART = "CART",
    CHECKOUT = "CHECKOUT",
    PAYMENT = "PAYMENT",
  }


const ErrorBoundary = (source: any) => {
    // Uncaught ReferenceError: path is not defined
    switch (source.source) {
      case ErrorType.CART:
        return <div>Cart Page Issue..!</div>;
      case ErrorType.CHECKOUT:
        return <div>Checkout Page Issue..!!</div>;
      case ErrorType.PAYMENT:
        return <div>Payment Issue..!!.</div>;
      default:
        return <PageNotFound />;
    }
  };

export default function RouterList () {
    return (
        <BrowserRouter>
                <Routes>
                    {/* ============== Admin Panel ================== */}
                    <Route 
                        path="/panel" 
                        element={
                            <React.Suspense fallback={<></>}>
                                <Layout />
                            </React.Suspense>
                        }
                        errorElement={<ErrorBoundary/>}
                    >
                        <Route 
                            index 
                            element={
                                <Dashboard />
                            }
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route 
                            path="products" 
                            // path="/panel/products" 
                            element={
                                <AllProducts />
                            }
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/panel/orders" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Allorders />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/panel/users" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <AllUsers />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary/>}
                        />
                        {/* <Route  
                            path="/panel/orders" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Allorders />
                                </React.Suspense>           
                            } 
                        /> */}

                    </Route>

                    {/* ==============AuthetiCation Page ================ */}
                    <Route 
                        path="/login"
                        element={
                            <React.Suspense fallback={<></>}>
                                <SignIn />
                            </React.Suspense>
                        }
                        errorElement={<ErrorBoundary/>}
                    />
                    <Route 
                        path="/register" 
                        element={
                            <React.Suspense fallback={<></>}>
                                <SignUp />
                            </React.Suspense>
                        }
                        errorElement={<ErrorBoundary/>}
                    />

                    {/* ================= Web Panel ========================= */}
                    <Route path="/" 
                        element={
                            <React.Suspense fallback={<></>}>
                                <WebLayout />
                            </React.Suspense>
                        }
                        errorElement={<ErrorBoundary/>}
                    >
                        <Route 
                            index 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Home />
                                </React.Suspense>
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/contact-us" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <ContactUs />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/product-detail/:productID" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <ProductDetail />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/products" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <ProductsCatalogs />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.CART} />}
                        />
                        <Route  
                            path="/product/cart" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Cart />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.CART} />}
                        />
                        <Route  
                            path="/product/checkout" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Checkout />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.CHECKOUT} />}
                        />
                        <Route  
                            path="/payment" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Payment />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.PAYMENT} />}
                        />
                        <Route  
                            path="/paymentSuccess/" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <PaymentSuccess />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary/>}
                        />

                        <Route  
                            path="/paymentError/" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <PaymentFail />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary/>}
                        />

                    </Route>

                    <Route
                        path="*"
                        element={<PageNotFound />}
                    />
                </Routes>
        </BrowserRouter>
    )
}
