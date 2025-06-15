import React, { useEffect, useRef } from "react";
import { useWebSocket } from "../../../components/WebSocket";


export const VideoCall = () => {
  const { localStream, remoteStream } = useWebSocket();
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localRef.current && localStream) {
      localRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteRef.current && remoteStream) {
      remoteRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="flex gap-4 mt-8 p-4">
      <video ref={localRef} autoPlay muted className="w-1/2" />
      <video ref={remoteRef} autoPlay className="w-1/2" />
    </div>
  );
};