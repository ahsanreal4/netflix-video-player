import { useCallback } from "react";
import { useVideoContext } from "../../../context/VideoContextProvider";
import { VideoEventListeners } from "../../../VideoPlayer.types";

const useVideoEndedEventListener = (togglePlayPause: () => void) => {
  const { videoRef, setPaused, videoPlayerProps } = useVideoContext();
  const { loopVideo } = videoPlayerProps;

  const onVideoEnded = useCallback(() => {
    if (!videoRef.current) return;

    setPaused(true);

    // If loop video true we automatically start video
    if (!loopVideo) return;

    videoRef.current.currentTime = 0;
    setTimeout(() => {
      togglePlayPause();
    }, 500);
  }, [loopVideo]);

  const addVideoEndedEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener(VideoEventListeners.Ended, onVideoEnded);
  };

  const removeVideoEndedEventListener = () => {
    if (!videoRef.current) return;

    videoRef.current.removeEventListener(
      VideoEventListeners.Ended,
      onVideoEnded
    );
  };

  return { addVideoEndedEventListener, removeVideoEndedEventListener };
};

export default useVideoEndedEventListener;
