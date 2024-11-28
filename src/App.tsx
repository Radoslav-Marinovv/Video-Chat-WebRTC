import React, { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import useWebRTC from "./hooks/useWebRTC";

const App: React.FC = () => {
  const { localStream, remoteStream, getLocalStream } = useWebRTC();
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    getLocalStream();
  }, [getLocalStream]);

  const startCall = () => {
    setIsCallActive(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">WebRTC Video Chat</h1>
      <div className="flex space-x-4 mb-4">
        {localStream.current && <VideoPlayer stream={localStream.current} isLocal />}
        {remoteStream.current && <VideoPlayer stream={remoteStream.current} />}
      </div>
      {!isCallActive && (
        <button
          onClick={startCall}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition duration-200"
        >
          Start Call
        </button>
      )}
    </div>
  );
};

export default App;
