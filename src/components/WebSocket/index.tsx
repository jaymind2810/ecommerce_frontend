// useWebSocket.ts
import { useEffect, useRef } from "react";

export const useWebSocket = (
  url: string,
  onMessage: (type: string, data: any) => void
) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socketUrl = `${url}?token=${token}`;
    ws.current = new WebSocket(socketUrl);
    // ws.current = new WebSocket(`${url} + "?token=${token}"`);
    // ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      onMessage(msg.type, msg);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const socketDataSend = (data: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };

  return { socketDataSend };
};
