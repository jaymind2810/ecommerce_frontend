import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../../store/loader/actions-creations";
import { State } from "../../../store";
import { getAllMessagesData } from "../../../requests/WebPanel/MessageRequesrs";
import { errorToast } from "../../../store/toast/actions-creation";

const SOCKET_URL: string | URL | any = process.env.REACT_APP_SOCKET_MESSAGE_URL;

function Message() {

  const dispatch = useDispatch()

  const user = useSelector((state: State) => state.user)

  const [socket, setSocket] = useState<any>();
  const [messages, setMessages] = useState([]);
  const [newMessageValue, setNewMessageValue] = useState<string>("");


  useEffect(() => {
    try {
        dispatch(loaderActionStart())
        if (user && user.id) {
            getAllMessagesData({
              sender : user ? user.id : 0,
              reciever : 2,
            }).then((res) => {
                if (res.data.success == true) {
                  setMessages(res.data.data)
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

  useEffect(() => {
    const ws:any = new WebSocket(SOCKET_URL);

    ws.onopen = () => console.log("WebSocket Connected");
    ws.onmessage = (event:any) => {
      const data = JSON.parse(event.data);
      console.log(data, "---Data----")
      // setMessages((prev) => [...messages, data.response || data.message]);
    };
    ws.onclose = () => console.log("WebSocket Disconnected");

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = (newMessageValue:string) => {
    if (socket) {
      socket.send(JSON.stringify({ message: newMessageValue }));
      setNewMessageValue("")
    }
  };

  return (
    <>
    <section className="bg-white py-8 mx-auto antialiased dark:bg-gray-900 md:py-16 mx-auto max-w-7xl px-4 ">
      <div>
        <ul>
          {messages && messages.map((msg, index) => (
            <li key={index}>{msg['message_text']}</li>
          ))}
        </ul>
        <h2>WebSocket Chat</h2>
        <div className="flex">
          <div className="border rounded-lg">
              <input
              type="text"
              value={newMessageValue}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700  focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              onChange={(e) => {
                setNewMessageValue(e.target.value);
              }}
              placeholder="Enter Message"
              />
          </div>
          <button 
            className={`items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-white 
              border dark:border-gray-600 hover:bg-indigo-700
              focus:outline-none focus:ring-4 focus:ring-primary-300 
              dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
              ${newMessageValue === "" ? "bg-gray-600" : "bg-gray-800 cursor-pointer"}`}
            onClick={() => {sendMessage(newMessageValue)}}
            disabled={newMessageValue === ""}
            >
              Send Message
            </button>
        </div>
      </div>
    </section>
    </>
  );
}

export default Message;