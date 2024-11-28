import React, { useRef, useEffect } from "react";

interface VideoPlayerProps {
  stream: MediaStream | null;
  isLocal?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream, isLocal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted={isLocal}
      className="w-64 h-48 bg-black rounded-lg shadow-lg"
    />
  );
};

export default VideoPlayer;
