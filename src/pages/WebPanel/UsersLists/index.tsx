import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";
import { State } from "../../../store";
import { getAllMessagesData } from "../../../requests/WebPanel/MessageRequesrs";
import { errorToast } from "../../../store/toast/actions-creation";
import { useWebSocket } from "../../../components/WebSocket";
import { getUsersListData } from "../../../requests/WebPanel/UserRequest";
import UserIcon from "./../../../images/user.png";
import { useNavigate } from "react-router";


const UserListsPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: State) => state.user)

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    try {
        dispatch(loaderActionStart())
        if (user && user.id) {
            getUsersListData().then((res) => {
                if (res.data.success === true) {
                  setUsersList(res.data.data)
                } else {
                    errorToast({
                        toast: true,
                        message: res.data.message,
                    })
                }
            })
        }
    } catch(error) {
        console.log(error)
    } finally {
        dispatch(loaderActionEnd())
    }
  }, [user.id])


  return (
    <>
    <section className="bg-white py-8 mx-auto antialiased md:py-16 mx-auto max-w-7xl px-4 ">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {usersList && usersList.map((user, index) => (
            <>
            <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        <span className="sr-only">Open dropdown</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>
                    {/* <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                        <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                        </li>
                        </ul>
                    </div> */}
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={UserIcon} alt="Bonnie image"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{user['first_name'] ? user['first_name'] : user['username']}</h5>
                    <span className="text-sm text-gray-500">{user['first_name'] ? user['first_name'] : user['username']}</span>
                    <div className="flex mt-4 md:mt-6">
                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                        <a 
                          className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          onClick={() => navigate(`/user/message/${user['id']}`)}
                        >Message</a>
                    </div>
                </div>
            </div>
            </>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

export default UserListsPage;