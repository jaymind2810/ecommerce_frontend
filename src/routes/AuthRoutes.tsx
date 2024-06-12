import React from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import Layout from '../pages/AdminPanel/components/shared/Layout'
import Dashboard from '../pages/AdminPanel/Dashboard'
import AllProducts from "../pages/AdminPanel/Products/Products"
import Allorders from "../pages/AdminPanel/Orders/Orders"
import AllUsers from "../pages/AdminPanel/Users/Users"
import SignIn from "../pages/Auth/Login"
import SignUp from "../pages/Auth/Register"

export default function AuthRouterList () {
    return (
        <BrowserRouter>
                <Routes>
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
