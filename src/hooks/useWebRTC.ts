import { useEffect, useRef } from 'react';

const useWebRTC = () => {
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ICE Candidate:', event.candidate);
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (!remoteStream.current) {
        remoteStream.current = new MediaStream();
      }
      remoteStream.current.addTrack(event.track);
    };

    return () => {
      peerConnection.current?.close();
    };
  }, []);

  const getLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream.current = stream;

    stream.getTracks().forEach((track) => {
      peerConnection.current?.addTrack(track, stream);
    });

    return stream;
  };

  return {
    localStream,
    remoteStream,
    peerConnection,
    getLocalStream,
  };
};

export default useWebRTC;
