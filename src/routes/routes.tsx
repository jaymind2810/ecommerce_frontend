import React from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import Layout from '../pages/AdminPanel/components/shared/Layout'
import Dashboard from '../pages/AdminPanel/Dashboard'
import AllProducts from "../pages/AdminPanel/Products/Products"
import Allorders from "../pages/AdminPanel/Orders/Orders"
import AllUsers from "../pages/AdminPanel/Users/Users"
import SignIn from "../pages/Auth/Login"
import SignUp from "../pages/Auth/Register"

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
                </Routes>
        </BrowserRouter>
    )
}
