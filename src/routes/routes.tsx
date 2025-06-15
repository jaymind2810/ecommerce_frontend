import React, { lazy } from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import ContactUs from "../pages/WebPanel/ContactUs/ContactUs";
import Loader from "../components/Loader";
import { WebSocketProvider } from "../components/WebSocket";

// ============== For AdminPanel ==================
const Layout = lazy(() => import("../pages/AdminPanel/components/shared/Layout"));
const Dashboard = lazy(() => import("../pages/AdminPanel/Dashboard"));
const AllProducts = lazy(() => import("../pages/AdminPanel/Products/Products"));
const Allorders = lazy(() => import("../pages/AdminPanel/Orders/Orders"));
const AllUsers = lazy(() => import("../pages/AdminPanel/Users/Users"));

// ============== For Authentication ==================
const SignIn = lazy(() => import("../pages/Auth/Login"));
const SignUp = lazy(() => import("../pages/Auth/Register"));
const WebLayout = lazy(() => import("../pages/WebPanel/components/Layout/WebLayout"));
const WebPageLayout = lazy(() => import("../pages/WebPanel/components/Layout/WebPage"));

// ============== For WebSite ==================\
const Home = lazy(() => import("../pages/WebPanel/Home"));
const UserProfile = lazy(() => import("../pages/WebPanel/Profile/Profile"));
const UserOrders = lazy(() => import("../pages/WebPanel/Orders/UserOrders"));
const Message = lazy(() => import("../pages/WebPanel/Message/Message"));
const UserListsPage = lazy(() => import("../pages/WebPanel/UsersLists"));

const ProductDetail = lazy(() => import("../pages/WebPanel/Products/ProductDetails"));
const Checkout = lazy(() => import("../pages/WebPanel/Checkout/Checkout"));
const Cart = lazy(() => import("../pages/WebPanel/Cart/Cart"));

const Payment = lazy(() => import("../pages/WebPanel/Payment/Payment"));
const PaymentSuccess = lazy(() => import("../pages/WebPanel/Checkout/SuccessPayment"));
const PaymentFail = lazy(() => import("../pages/WebPanel/Checkout/FailPayment"));
const PageNotFound = lazy(() => import("../components/ErrorBoundary/PageNotFound"));
const ProductsCatalogs = lazy(() => import("../pages/WebPanel/ProductCatalogs/ProductsCatalogs"));
const OrderDetail = lazy(() => import("../pages/WebPanel/OrderDetail/OrderDetail"));


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

    const token:any = localStorage.getItem("token");

    return (
        <WebSocketProvider token={token}>
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
                            <React.Suspense fallback={<><Loader/></>}>
                                <WebLayout />
                            </React.Suspense>
                        }
                        errorElement={<ErrorBoundary/>}
                    >
                        <Route 
                            index 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <Home />
                                </React.Suspense>
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/user/profile" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <UserProfile />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/user/orders" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <UserOrders />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/contact-us" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <ContactUs />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/product-detail/:productID" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <ProductDetail />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                        <Route  
                            path="/products" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <ProductsCatalogs />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.CART} />}
                        />
                        <Route  
                            path="/product/cart" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <Cart />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.CART} />}
                        />
                        <Route  
                            path="/product/checkout" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <Checkout />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.CHECKOUT} />}
                        />
                        <Route  
                            path="/payment" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <Payment />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary source={ErrorType.PAYMENT} />}
                        />
                        <Route  
                            path="/order/:orderID" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <OrderDetail />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary />}
                        />
                        <Route  
                            path="/paymentSuccess/" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <PaymentSuccess />
                                </React.Suspense>           
                            }
                            errorElement={<ErrorBoundary/>}
                        />

                        <Route  
                            path="/paymentError/" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
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

                    <Route path="/" 
                        element={
                            <React.Suspense fallback={<><Loader/></>}>
                                <WebPageLayout />
                            </React.Suspense>
                        }
                        errorElement={<ErrorBoundary/>}
                    >
                        {/* ---------Message Page---------- */}
                        <Route  
                            path="/user/message/:userID" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <Message />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />

                        {/* ----------User List Page---------- */}
                        <Route  
                            path="/users" 
                            element={
                                <React.Suspense fallback={<><Loader/></>}>
                                    <UserListsPage />
                                </React.Suspense>           
                            } 
                            errorElement={<ErrorBoundary/>}
                        />
                    </Route>

                   


                </Routes>
        </BrowserRouter>
         </WebSocketProvider>

    )
}
