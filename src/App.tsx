import React, { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import useWebRTC from "./hooks/useWebRTC";
import HowToUse from "./components/HowToUse";

const App: React.FC = () => {
  const {
    localStream,
    remoteStream,
    getLocalStream,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
  } = useWebRTC();

  const [sdp, setSdp] = useState<string>("");
  const [candidate, setCandidate] = useState<string>("");

  useEffect(() => {
    getLocalStream();
  }, [getLocalStream]);

  const handleSetRemoteDescription = () => {
    if (sdp) {
      const parsedSDP = JSON.parse(sdp);
      setRemoteDescription(parsedSDP);
    }
  };

  const handleAddIceCandidate = () => {
    if (candidate) {
      const parsedCandidate = JSON.parse(candidate);
      addIceCandidate(parsedCandidate);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">WebRTC Video Chat</h1>
      <div className="flex space-x-4 mb-4">
        <VideoPlayer stream={localStream.current} isLocal />
        <VideoPlayer stream={remoteStream.current} />
      </div>
      <div className="space-y-4">
        <button
          onClick={createOffer}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition duration-200"
        >
          Create Offer
        </button>
        <button
          onClick={createAnswer}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg shadow transition duration-200"
        >
          Create Answer
        </button>
        <textarea
          className="w-full p-2 bg-gray-800 rounded-md text-sm"
          value={sdp}
          onChange={(e) => setSdp(e.target.value)}
          placeholder="Paste Offer/Answer SDP here"
        />
        <button
          onClick={handleSetRemoteDescription}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow transition duration-200"
        >
          Set Remote Description
        </button>
        <textarea
          className="w-full p-2 bg-gray-800 rounded-md text-sm"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          placeholder="Paste ICE Candidate here"
        />
        <button
          onClick={handleAddIceCandidate}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow transition duration-200"
        >
          Add ICE Candidate
        </button>
        <HowToUse />
      </div>
    </div>
  );
};

export default App;
