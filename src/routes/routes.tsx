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

// Payment Methods 
import Alipay from "../pages/WebPanel/Checkout/PaymentMethods/Alipay"
import AcssDebit from '../pages/WebPanel/Checkout/PaymentMethods/AcssDebit'
import AfterpayClearpay from '../pages/WebPanel/Checkout/PaymentMethods/AfterpayClearpay'
import ApplePay from '../pages/WebPanel/Checkout/PaymentMethods/ApplePay'
import Bancontact from '../pages/WebPanel/Checkout/PaymentMethods/Bancontact'
import BecsDebit from '../pages/WebPanel/Checkout/PaymentMethods/BecsDebit'
import Boleto from '../pages/WebPanel/Checkout/PaymentMethods/Boleto'
import Card from '../pages/WebPanel/Checkout/PaymentMethods/Card'
import Eps from '../pages/WebPanel/Checkout/PaymentMethods/Eps'
import Fpx from '../pages/WebPanel/Checkout/PaymentMethods/Fpx'
import Giropay from '../pages/WebPanel/Checkout/PaymentMethods/Giropay'
import GooglePay from '../pages/WebPanel/Checkout/PaymentMethods/GooglePay'
import GrabPay from '../pages/WebPanel/Checkout/PaymentMethods/GrabPay'
import Ideal from '../pages/WebPanel/Checkout/PaymentMethods/Ideal'
import Klarna from '../pages/WebPanel/Checkout/PaymentMethods/Klarna'
import Oxxo from '../pages/WebPanel/Checkout/PaymentMethods/Oxxo'
import P24 from '../pages/WebPanel/Checkout/PaymentMethods/P24'
import SepaDebit from '../pages/WebPanel/Checkout/PaymentMethods/SepaDebit'
import Sofort from '../pages/WebPanel/Checkout/PaymentMethods/Sofort'
import UsBankAccountDebit from '../pages/WebPanel/Checkout/PaymentMethods/UsBankAccountDebit'
import WeChatPay from '../pages/WebPanel/Checkout/PaymentMethods/WeChatPay'
import Konbini from '../pages/WebPanel/Checkout/PaymentMethods/Konbini'
import { JPBankTransfer } from '../pages/WebPanel/Checkout/PaymentMethods/JPBankTransfer'



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
                            path="/product/checkout" 
                            element={
                                <React.Suspense fallback={<></>}>
                                    <Checkout />
                                </React.Suspense>           
                            } 
                        />

                        {/* --------- Payment ----------- */}

                        <Route path="/product/checkout/alipay" element={<Alipay />} />
                        <Route path="/product/checkout/acss-debit" element={<AcssDebit />} />
                        <Route path="/product/checkout/us-bank-account-debit" element={<UsBankAccountDebit />} />
                        <Route path="/product/checkout/apple-pay" element={<ApplePay />} />
                        <Route path="/product/checkout/afterpay-clearpay" element={<AfterpayClearpay />} />
                        <Route path="/product/checkout/bancontact" element={<Bancontact />} />
                        <Route path="/product/checkout/becs-debit" element={<BecsDebit />} />
                        <Route path="/product/checkout/boleto" element={<Boleto />} />
                        <Route path="/product/checkout/card" element={<Card />} />
                        <Route path="/product/checkout/eps" element={<Eps />} />
                        <Route path="/product/checkout/fpx" element={<Fpx />} />
                        <Route path="/product/checkout/giropay" element={<Giropay />} />
                        <Route path="/product/checkout/grabpay" element={<GrabPay />} />
                        <Route path="/product/checkout/google-pay" element={<GooglePay />} />
                        <Route path="/product/checkout/ideal" element={<Ideal />} />
                        <Route path="/product/checkout/klarna" element={<Klarna />} />
                        <Route path="/product/checkout/oxxo" element={<Oxxo />} />
                        <Route path="/product/checkout/p24" element={<P24 />} />
                        <Route path="/product/checkout/sepa-debit" element={<SepaDebit />} />
                        <Route path="/product/checkout/sofort" element={<Sofort />} />
                        <Route path="/product/checkout/wechat-pay" element={<WeChatPay />} />
                        <Route path="/product/checkout/konbini" element={<Konbini />} />
                        <Route path="/product/checkout/jp-bank-transfer" element={<JPBankTransfer />} />


                    </Route>
                </Routes>
        </BrowserRouter>
    )
}
