import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { State } from "../../store";
// import cancelIcon from ".../../images/cancel-white.webp";
import cancelIcon from "../../images/cancel-gray.webp";

interface FullScreenModalProps {
  children: ReactElement[] | ReactElement;
//   displaySidebar: boolean;
  closeHandler: (flag: boolean) => void;
  className?: string;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  children,
  closeHandler,
  className = "",
}) => {
  const params = useParams();


  return (
    <div
      className={`${className} full-screen-modal left-0 backdrop-blur-[4px] bottom-0 mt-[-20px] fixed z-[1200] w-full overflow-auto no-scrollbar flex`}
    >
      <div className="fixed flex h-[100vh] items-center justify-center relative">
        <div
          className="close-btn cursor-pointer fixed flex flex-row items-center justify-end top-0 right-0 text-sm z-[2]"
          onClick={() => {
            closeHandler(false);
          }}
        >
          {/* <span 
            className="bg-gray-300 duration-500 flex hover:bg-indigo-100 items-center text-black/60 px-5 py-2 rounded-full text-sm font-medium transition-all"
            onClick={() => {
                closeHandler(false);
              }}
          >Close</span> */}
          <span className="bg-gray-300 duration-500 flex hover:bg-indigo-100 items-center text-black/60 px-2 py-2 mt-2 mr-2 rounded-full text-sm font-medium transition-all">
            <img loading="lazy"
              className="w-3"
              src={cancelIcon}
              alt="Cancel"
              title="Cancel"
              onClick={() => {
                closeHandler(false);
              }}
            ></img>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FullScreenModal;
