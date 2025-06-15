import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";
import { State } from "../../../store";
import { getAllMessagesData } from "../../../requests/WebPanel/MessageRequesrs";
import { errorToast } from "../../../store/toast/actions-creation";
import { useWebSocket } from "../../../components/WebSocket";
import { useParams } from "react-router";
import { MessagesDataType, MessagesUserDataType } from "../Type/MessageType";
import { VideoCall } from "../VideoCall";

const SOCKET_URL: string | URL | any = process.env.REACT_APP_SOCKET_URL;



function Message() {

  const dispatch = useDispatch()
  const params = useParams()

  const messagesAreaRef = useRef<HTMLElement | any>();
  const { chatMessages, sendMessage } = useWebSocket();
  const user = useSelector((state: State) => state.user)

  const [isVideoCall, setIsisVideoCall] = useState(false);

  const [messages, setMessages] = useState<MessagesDataType[]>([]);
  const [recieverUser, setRecieverUser] = useState<MessagesUserDataType>();
  const [senderUser, setSenderUser] = useState<MessagesUserDataType>();
  const [newMessageValue, setNewMessageValue] = useState<string>("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (chatMessages) {
      setMessages((prevMessages) => [...prevMessages, chatMessages['messageData']]);
    }
  }, [chatMessages])

  const sendPrivateMessage = () => {
    sendMessage({
      type: "chat",
      receiver_id: params.userID,
      message: newMessageValue,
      sender_id: user?.id
    });
    setNewMessageValue("")
  };

  const sendGlobalNotification = () => {
    sendMessage({
      type: "notification",
      message: "This is a broadcast notification",
    });
  };


  const fetchMessages = async (pageNum: number) => {
    try {
        if (isLoading || !hasMore) return;
        dispatch(loaderActionStart())
        setIsLoading(true);
        if (user && user.id && params.userID) {
            getAllMessagesData({
              sender : user ? user.id : 0,
              receiver : params.userID,
              page : page,
              page_size: 5,
            }).then((res) => {
                if (res.data.success == true) {
                  // setMessages(res.data.data['messages'])
                  setMessages(prev => [...res.data.data['messages'], ...prev])
                  setHasMore(res.data.data['has_more'])

                  if (page === 1) {
                    setRecieverUser(res.data.data['receiver_user'])
                    setSenderUser(res.data.data['sender_user'])
                  }
                } else {
                    errorToast({
                        toast: true,
                        message: res.data.message,
                    })
                }
            })
            setIsLoading(false);
        }
    } catch(error) {
        console.log(error)
    } finally {
        setIsLoading(false);
        dispatch(loaderActionEnd())
    }


  };

  useEffect(() => {
    fetchMessages(page);
  }, [page]);
  


  const handleScroll = () => {
    const container = messagesAreaRef.current;
    if (!container) return;

    // If scrolled to top
    if (container.scrollTop === 0 && hasMore && !isLoading) {
      const prevHeight = container.scrollHeight;

      setPage(prev => prev + 1); // trigger next fetch

      // Maintain scroll position after data loads
      setTimeout(() => {
        const newHeight = container.scrollHeight;
        container.scrollTop = newHeight - prevHeight;
      }, 100);
    }
  }


  // const bottomRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);


  return (
    <>
    <section className="bg-white py-4 mx-auto antialiased md:py-4 mx-auto max-w-7xl">
      <div>

    <div className="flex flex-col w-full bg-white h-full">
      <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow bg-gray-100">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
          {recieverUser?.first_name ? recieverUser?.first_name[0] : "A"} 
        </div>
        <div className="flex flex-col ml-3">
          <div className="font-semibold text-sm">{(recieverUser && recieverUser?.first_name && recieverUser?.last_name) ? recieverUser?.first_name + " " + recieverUser?.last_name : recieverUser?.first_name}</div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
        <div className="ml-auto">
          <ul className="flex flex-row items-center space-x-2">
            {/* <li>
              <a href="#"
                 className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full">
                <span>
                  <svg className="w-5 h-5"
                       fill="currentColor"
                       stroke="none"
                       viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </span>
              </a>
            </li> */}
            <li>
              <a href="#"
                 className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
                 onClick={() => setIsisVideoCall(true)}
                 >
                <span>
                  <svg className="w-5 h-5"
                       fill="currentColor"
                       stroke="none"
                       viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full">
                <span>
                  <svg className="w-5 h-5"
                       fill="none"
                       stroke="currentColor"
                       viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {isVideoCall ? (
       <>
        <VideoCall/>
       </> 
      ) : (
        <>
      <div 
        className="h-[70vh] py-4 overflow-y-auto mt-4"
        ref={messagesAreaRef}
        onScroll={handleScroll}
        >
          <div className="grid grid-cols-12 gap-y-2">
            {messages && senderUser && messages?.map((item:MessagesDataType, index:(Number | any)) => {
              return (
                <>
                  {(item?.sender?.id == String(senderUser.id)) ? (
                    <>
                      <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div
                              className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            {user && user?.first_name ? user.first_name[0] : "A"}
                          </div>
                          <div
                              className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                          >
                            <div>
                              {item?.message_text}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div
                              className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            {recieverUser?.first_name ? recieverUser?.first_name[0] : "A"} 
                          </div>
                          <div
                              className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                          >
                            <div>{item?.message_text}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )
            })}
            {/* <div ref={bottomRef} /> */}
          </div>
      </div>
      <div className="flex flex-row items-center bottom-1 stick pt-4">
        <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
          <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
            <svg className="w-5 h-5"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
          </button>
          <div className="w-full">
            <input 
              type="text"
              value={newMessageValue}
              onChange={(e) => {
                setNewMessageValue(e.target.value);
              }}
              className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" 
              placeholder="Type your message...."/>
          </div>
          <div className="flex flex-row">
            <button className="flex items-center justify-center h-10 w-8 text-gray-400">
              <svg className="w-5 h-5"
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
              </svg>
            </button>
            <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
              <svg className="w-5 h-5"
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="ml-6">
          <button 
            // className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white"
            className={`flex items-center justify-center h-10 w-10 rounded-full text-indigo-800 text-white ${newMessageValue === "" ? "bg-gray-600" : "bg-gray-800 cursor-pointer"}`}
            onClick={() => {(newMessageValue !== "") ? sendPrivateMessage() : alert("Add Some Message")}}
            disabled={newMessageValue === ""}
          >
            <svg className="w-5 h-5 transform rotate-90 -mr-px"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
      </>
      )}
    </div>

        {/* <div className="flex">
          <button 
            className={`items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-white 
              border dark:border-gray-600 hover:bg-indigo-700
              focus:outline-none focus:ring-4 focus:ring-primary-300 
              dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
              ${newMessageValue === "" ? "bg-gray-600" : "bg-gray-800 cursor-pointer"}`}
            onClick={() => {(newMessageValue !== "") ? sendGlobalNotification() : alert("Add Some Message")}}
            disabled={newMessageValue === ""}
            >
              Send BroadCast Message
          </button>
        </div> */}
      </div>
    </section>
    </>
  );
}

export default Message;