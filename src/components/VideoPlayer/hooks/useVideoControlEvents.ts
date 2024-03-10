import { RefObject } from "react";
import { Volume } from "../VideoPlayer.types";

interface UseVideoControlEventsProps {
  videoRef: RefObject<HTMLVideoElement>;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const useVideoControlEvents = ({
  setPaused,
  videoRef,
}: UseVideoControlEventsProps) => {
  const playVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.play();
    setPaused(false);
  };

  const pauseVideo = () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setPaused(true);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current?.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const forwardVideo = (time: number = 10) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime += time;
  };

  const rewindVideo = (time: number = 10) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime -= time;
  };

  const toggleVolume = (volume: number = Volume.Full) => {
    if (!videoRef.current) return;

    videoRef.current.volume = volume;
  };

  const mute = () => {
    toggleVolume(Volume.Mute);
  };

  const unmute = () => toggleVolume();

  return {
    togglePlayPause,
    playVideo,
    pauseVideo,
    forwardVideo,
    rewindVideo,
    toggleVolume,
    mute,
    unmute,
  };
};

export default useVideoControlEvents;
