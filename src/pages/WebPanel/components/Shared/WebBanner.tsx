import { XMarkIcon } from "@heroicons/react/20/solid";
import React, {useState} from "react";
import { Link } from 'react-router-dom'

interface WebBannerProps {
  setWebBanner: Boolean 
}


const WebBanner = () => {

  const [webBanner, setWebBanner] = useState(true);

  return (
    <>
    { webBanner &&
    
      <div className="relative isolate flex gap-x-6 overflow-hidden bg-gray-900 px-6 py-1 sm:px-3.5">
        <div className="mx-64 flex max-w-7xl w-full" aria-label="Global">
          <div className="flex justify-between grid grid-cols-3 w-full">
            <div className="flex flex-1 justify-start col-start-1">
              <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white inline-block align-middle font-normal rounded-lg px-2 text-center inline-flex items-center" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
            </div>
            <div className="flex flex-1 justify-center text-white">
              <div className="inline-block content-center font-normal">Get free delivery on orders over $100</div>
            </div>
            <div className="flex flex-1 justify-end">
              <a href="#" className="inline-block text-white border-1 px-2 py-1 text-center font-medium content-center">
                <Link to={"/login"}>Sign in</Link>
              </a>
              <p className="inline-block text-white py-1 text-center font-medium content-center mx-2">{"|"}</p>
              <a href="#" className="inline-block text-white border-1 px-2 py-1 text-center font-medium content-center">
                <Link to={"/register"}>Sign up</Link>
              </a>
            </div>
          </div>    
        </div>
      </div>
    }
    </>
  );
};

export default WebBanner;
