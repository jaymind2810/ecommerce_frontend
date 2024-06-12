import React from "react"
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import WebLayout from "../pages/WebPanel/components/Shared/WebLayout"
import Home from "../pages/WebPanel/Home"


export default function WebRouterList () {
    return (
        <BrowserRouter>
            <Routes>
                {/* ================= Web Panel ========================= */}
                <Route path="/" element={<WebLayout />}>
                    <Route 
                        index 
                        element={
                            <Home />
                        } 
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
