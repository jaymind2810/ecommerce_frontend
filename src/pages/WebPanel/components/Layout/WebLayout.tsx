import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import WebBanner from '../Shared/WebBanner'
import WebHeader from '../Shared/WebHeader'
import WebFooter from '../Shared/WebFooter'
import WebNewsLetterPanel from '../Shared/WebNewsLetter';


export default function WebLayout() {
	
	return (
		<div className="">
			<WebBanner/>
			<WebHeader />
                <Outlet />
			<WebNewsLetterPanel/>
			<WebFooter/>
		</div>
	)
}
