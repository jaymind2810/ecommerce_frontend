import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import WebBanner from '../Shared/WebBanner'
import WebHeader from '../Shared/WebHeader'
import WebFooter from '../Shared/WebFooter'
import WebNewsLetterPanel from '../Shared/WebNewsLetter';


export default function WebPageLayout() {
	
	return (
		<div className="">
			<WebBanner/>
			<WebHeader />
            <Outlet />
		</div>
	)
}
