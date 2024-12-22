import React, { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { State } from "../../store";
import cancelIcon from "../../images/cancel-white.webp";

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
//   displaySidebar,
}) => {
  const params = useParams();
//   const { isDefaultModal } = useSelector((state: State) => state.modalReducer);

  // useEffect(() => {
  //   document.body.classList.remove(
  //     "open-default-modal",
  //     "opne-full-modal-without-sidebar"
  //   );
  //   // displaySidebar &&
  //   //   document.body.classList.add("opne-full-modal-with-sidebar");
  //   // !displaySidebar &&
  //   //   ("postID" in params || "photoID" in params || "messageID" in params) &&
  //   //   document.body.classList.add("opne-full-modal-without-sidebar");
  // }, []);

  return (
    <div
      className={`${className} full-screen-modal left-0 backdrop-blur-[4px] top-0 bottom-0 mt-[-20px] fixed z-[1200] w-full overflow-auto no-scrollbar`}
    >
      <div className="h-[100vh] md-overflow-inherit">
        <div
          // className="close-btn absolute flex flex-row items-center text-sm cursor-pointer text-white z-[2] top-5 right-8"
          className="absolute close-btn cursor-pointer fixed flex flex-row items-center justify-end right-8 text-sm z-[2]"
          onClick={() => {
            // document.body.classList.remove("opne-full-modal-with-sidebar");
            // document.body.classList.remove("opne-full-modal-without-sidebar");
            // isDefaultModal && document.body.classList.add("open-default-modal");
            closeHandler(false);
          }}
        >
          <span 
            // className="text-sm text-black/60 px-4 py-2 roundend "
            className="bg-gray-300 duration-500 flex hover:bg-indigo-100 items-center text-black/60 px-5 py-2 rounded-full text-sm font-medium transition-all"
            onClick={() => {
                closeHandler(false);
              }}
          >Close</span>
          {/* <span className="flex justify-center items-center text-[24px] close-arrow more-info-btn">
            <img loading="lazy"
              className="ml-2 w-4"
              src={cancelIcon}
              alt="Cancel"
              title="Cancel"
              onClick={() => {
                closeHandler(false);
              }}
            ></img>
          </span> */}
        </div>
        {children}
      </div>
    </div>
  );
};

export default FullScreenModal;
