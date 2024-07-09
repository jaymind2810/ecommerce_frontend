import React from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'

// ============== For AdminPanel ==================
import Layout from '../pages/AdminPanel/components/shared/Layout'
import Dashboard from '../pages/AdminPanel/Dashboard'
import AllProducts from "../pages/AdminPanel/Products/Products"
import Allorders from "../pages/AdminPanel/Orders/Orders"
import AllUsers from "../pages/AdminPanel/Users/Users"

// ============== For Authentication ==================
import SignIn from "../pages/Auth/Login"
import SignUp from "../pages/Auth/Register"
import WebLayout from "../pages/WebPanel/components/WebLayout"

// ============== For WebSite ==================\
import Home from "../pages/WebPanel/Home"
import ProductDetail from "../pages/WebPanel/Products/ProductDetails"
import Checkout from "../pages/WebPanel/Checkout/Checkout"
import Cart from "../pages/WebPanel/Cart/Cart"

import PaymentSuccess from "../pages/WebPanel/Checkout/SuccessPayment"
import PaymentFail from "../pages/WebPanel/Checkout/FailPayment"


export default function RouterList () {
    return (
        <BrowserRouter>
                <Routes>
                    {/* ============== Admin Panel ================== */}
                    <Route path="/panel" element={<Layout />}>
                        <Route 
                            index 
                            element={
                                <Dashboard />
                            } 
                        />
                        <Route 
                            path="products" 
                            // path="/panel/products" 
                            element={
                                <AllProducts />
                            } 
                        />
                        <Route  
                            path="/panel/orders" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Allorders />
                                </React.Suspense>           
                            } 
                        />
                        <Route  
                            path="/panel/users" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <AllUsers />
                                </React.Suspense>           
                            } 
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
                            <SignIn />
                        } 
                    />
                    <Route 
                        path="/register" 
                        element={
                            <SignUp />
                        } 
                    />

                    {/* ================= Web Panel ========================= */}
                    <Route path="/" element={<WebLayout />}>
                        <Route 
                            index 
                            element={
                                <Home />
                            } 
                        />
                        <Route  
                            path="/product-detail/" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <ProductDetail />
                                </React.Suspense>           
                            } 
                        />
                        <Route  
                            path="/product/cart" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Cart />
                                </React.Suspense>           
                            } 
                        />
                        <Route  
                            path="/product/checkout" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Checkout />
                                </React.Suspense>           
                            } 
                        />
                        <Route  
                            path="/product/paymentSuccess/" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <PaymentSuccess />
                                </React.Suspense>           
                            } 
                        />

                        <Route  
                            path="/product/paymentError/" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <PaymentFail />
                                </React.Suspense>           
                            } 
                        />

                    </Route>
                </Routes>
        </BrowserRouter>
    )
}
