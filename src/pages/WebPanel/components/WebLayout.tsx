import React from 'react'
import { Outlet } from 'react-router-dom'
import WebBanner from './Shared/WebBanner'
import WebHeader from './Shared/WebHeader'
import WebFooter from './Shared/WebFooter'

export default function WebLayout() {
	return (
		<div className="">
			<WebBanner />
			<WebHeader />
                <Outlet />
			<WebFooter/>
		</div>
	)
}
