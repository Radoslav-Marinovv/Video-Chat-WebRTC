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
        console.log('ICE Candidate:', JSON.stringify(event.candidate));
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

  const createOffer = async () => {
    const offer = await peerConnection.current?.createOffer();
    if (offer) {
      await peerConnection.current?.setLocalDescription(offer);
      console.log('Offer SDP:', JSON.stringify(offer));
    }
  };

  const createAnswer = async () => {
    const answer = await peerConnection.current?.createAnswer();
    if (answer) {
      await peerConnection.current?.setLocalDescription(answer);
      console.log('Answer SDP:', JSON.stringify(answer));
    }
  };

  const setRemoteDescription = async (sdp: RTCSessionDescriptionInit) => {
    await peerConnection.current?.setRemoteDescription(
      new RTCSessionDescription(sdp)
    );
  };

  const addIceCandidate = async (candidate: RTCIceCandidateInit) => {
    await peerConnection.current?.addIceCandidate(
      new RTCIceCandidate(candidate)
    );
  };

  return {
    localStream,
    remoteStream,
    getLocalStream,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
  };
};

export default useWebRTC;
