import React from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import Register from '../pages/AdminPanel/Register'
import Dashboard from '../pages/AdminPanel/Dashboard'
import Products from '../pages/AdminPanel/Products'

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
                            // path="products" 
                            path="/panel/:products" 
                            element={
                                <Products />
                            } 
                        />
                    </Route>
                    <Route path="/register" element={<Register />} />
                </Routes>
        </BrowserRouter>
    )
}
