import { XMarkIcon } from "@heroicons/react/20/solid";
import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { State } from "./../../../../store"
import { logout } from "../../../../store/user/action-Creation";
import { useNavigate } from "react-router-dom";
import LogOutIcon from "./../../../../images/logout.svg";
import { successToast } from "../../../../store/toast/actions-creation";

interface WebBannerProps {
  setWebBanner: Boolean 
}


const WebBanner = () => {
  const user = useSelector((state: State) => state.user)
  const [webBanner, setWebBanner] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logoutHandler = () => {
    console.log("Here---")
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    dispatch(logout())
    dispatch(
        successToast({
        toast: true,
        message: "Log out Successfully !!",
        })
    );
    navigate('/')
  }

  return (
    <>
    { webBanner &&
    
      <div className="relative isolate flex gap-x-6 overflow-hidden bg-gray-800 px-6 py-1 sm:px-3.5">
        <div className="mx-64 flex max-w-7xl w-full" aria-label="Global">
          <div className="flex justify-between grid grid-cols-3 w-full">
            <div className="flex flex-1 justify-start col-start-1">
              <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white inline-block align-middle font-normal rounded-lg px-2 text-center inline-flex items-center" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-1 justify-center text-white">
              <div className="inline-block content-center font-normal">Get free delivery on orders over $100</div>
            </div>
            <div className="flex flex-1 justify-end item-center py-1">
              { user && user?.isLoggedIn ? (
                  <>
                    <p className="px-4 font-normal py-1 text-white">Welcome, {user?.first_name}{" "}{user?.last_name} ..!!</p>
                    <a 
                      className="block cursor-pointer text-sm py-1 font-semibold" role="menuitem" id="menu-item-6"
                      onClick={logoutHandler}>
                        <svg fill="#FFFFFF" height="20px" width="20px" version="1.1" id="Capa_1"  viewBox="-18.85 -18.85 508.90 508.90" stroke="#FFFFFF" strokeWidth="23.56">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                          <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5 s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5 S235.019,444.2,227.619,444.2z"/> <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5 s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8 C455.319,239.9,455.319,231.3,450.019,226.1z"/> </g> </g> </g>
                        </svg>
                    </a>
                  </>
                ) : (
                    <>
                      <div className="inline-block text-white border-1 px-2 py-1 text-center font-medium content-center">
                        <Link to={"/login"}>Sign in</Link>
                      </div>
                      <p className="inline-block text-white py-1 text-center font-medium content-center mx-2">{"|"}</p>
                      <div className="inline-block text-white border-1 pl-2 py-1 text-center font-medium content-center">
                        <Link to={"/register"}>Sign up</Link>
                      </div>      
                    </>
                  )
              }
              
            </div>
          </div>    
        </div>
      </div>
    }
    </>
  );
};

export default WebBanner;
